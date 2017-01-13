var riot__rollup = require('rollup-plugin-riot')
  , node_resolve__rollup = require('rollup-plugin-node-resolve')
  , commonjs__rollup = require('rollup-plugin-commonjs')
  , sourcemaps__rollup = require('rollup-plugin-sourcemaps')
  , alias__rollup = require('rollup-plugin-alias')
  , json__rollup = require('rollup-plugin-json')
  , babel__rollup = require('rollup-plugin-babel')
  , resolvePath = require('resolve-path')
  , $path = require('path')
  , fs = require('fs')
require('ctx-core/riot/ecmascript-6')
module.exports = {
  $browser__rollup,
  $node__rollup,
  resolve__rollup
}
function $browser__rollup() {
  return $rollup({
    intro: `
      var global = typeof window !== 'undefined' ? window :
        typeof global !== 'undefined' ? global :
        this`,
    format: 'iife',
    globals: {
      global: 'window',
      riot: 'riot'
    },
    external: [
      'crypto',
      'fs',
      'path',
      'process',
      'riot'
    ],
    plugins: [
      alias__rollup({
        'js-console-color': 'ctx-core/logger/browser.js'
      }),
      sourcemaps__rollup(),
      commonjs__rollup({
        include: 'node_modules/**',
        extensions: [ '.js', '.coffee' ]
      }),
      riot__rollup(),
      json__rollup(),
      resolve__rollup({
        paths: ['.', 'ctx-core', 'node_modules'],
        extensions: ['.js', '.json', '.tag']
      }),
      node_resolve__rollup({
        jsnext: true,
        main: true,
        browser: true
      }),
      babel__rollup()
    ]
  }, ...arguments)
}
function $node__rollup() {
  return $rollup({
    format: 'cjs',
    external: $external__npm({
      paths: ['.', 'ctx-core', 'node_modules'],
      externals: [/\/node_modules\//],
      extensions: ['.js', '.json', '.tag']
    }),
    plugins: [
      riot__rollup(),
      commonjs__rollup({
        include: 'node_modules/**',
        extensions: [ '.js', '.coffee' ]
      }),
      json__rollup(),
      resolve__rollup({
        paths: ['.', 'ctx-core', 'node_modules'],
        externals: [/\/node_modules\//],
        extensions: ['.js', '.json', '.tag']
      }),
      babel__rollup({
        exclude: 'node_modules/**'
      })
    ]
  }, ...arguments)
}
var absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|\/])/
  , relativePath = /^\.?\.\//
function $external__npm(options) {
  var resolveId = $resolveId(options)
  return external__npm
  function external__npm(id) {
    var $$ = resolveId(id)
      , $ = relativePath.test(id) ? false : !$$
    return $
  }
}
function resolve__rollup(options) {
  return {resolveId: $resolveId(options)}
}
function $resolveId(options) {
  var paths = options.paths || ['.', 'node_modules']
    , externals = options.externals || []
    , extensions = options.extensions || ['.js']
  return resolveId
  function resolveId(id, origin) {
    var dirname = origin && $path.dirname(origin)
      , path =
          dirname
          ? $path.join(dirname, id)
          : id
      , path__resolved = $resolvePath(path)
      , $ = check__resolveId(path__resolved)
    if ($) return $
    for (var i=0, length = paths.length; i < length; i++) {
      path = $path.join(paths[i], id)
      path__resolved = $resolvePath(path)
      $ = check__resolveId(path__resolved)
      if ($) return $
    }
    return null
  }
  function check__resolveId(path__resolved) {
    if (fileExists(path__resolved)) {
      return resolveId__external(path__resolved)
    }
    for (var i=0, length=extensions.length; i < length; i++) {
      var ext = extensions[i]
        , path__resolved__ext = path__resolved + ext
      if (fileExists(path__resolved__ext)) {
        var $ = resolveId__external(path__resolved__ext)
        return $
      }
    }
    var path__resolved__index = $path.join(path__resolved, 'index.js')
    if (fileExists(path__resolved__index)) {
      return resolveId__external(path__resolved__index)
    }
    return false
  }
  function resolveId__external(path__resolved) {
    for (var i=0; i < externals.length; i++) {
      var external = externals[i]
      if (external.exec(path__resolved)) {
        return false
      }
    }
    return path__resolved
  }
}
function $resolvePath(path) {
  if (absolutePath.test(path)) return path
  return resolvePath(path)
}
function fileExists(file) {
  try {
    var stat = fs.statSync(file);
    return stat.isFile();
  } catch (e) {
    return false;
  }
}
function $rollup() {
  return Object.assign({
  }, ...arguments)
}