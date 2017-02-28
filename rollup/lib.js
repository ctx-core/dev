const node_resolve__rollup = require('rollup-plugin-node-resolve')
    , commonjs__rollup = require('rollup-plugin-commonjs')
    , sourcemaps__rollup = require('rollup-plugin-sourcemaps')
    , alias__rollup = require('rollup-plugin-alias')
    , json__rollup = require('rollup-plugin-json')
    , babel__rollup = require('rollup-plugin-babel')
    , resolvePath = require('resolve-path')
    , $path = require('path')
    , fs = require('fs')
    , absolutePath = /^(?:\/|(?:[A-Za-z]:)?[\\|\/])/
    , relativePath = /^\.?\.\//
module.exports = {
  $browser__rollup,
  $node__rollup,
  $plugins__browser,
  $plugins__node,
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
    plugins: $plugins__browser()
  }, ...arguments)
}
function $plugins__browser() {
  return [
    alias__rollup({
      'js-console-color': 'ctx-core/logger/browser.js'
    }),
    sourcemaps__rollup(),
    commonjs__rollup({
      include: 'node_modules/**',
      extensions: [ '.js', '.coffee' ]
    }),
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
    babel__rollup(),
    ...arguments
  ]
}
function $node__rollup() {
  return $rollup({
    format: 'cjs',
    external: $external__npm({
      paths: ['.', 'ctx-core', 'node_modules'],
      externals: [/\/node_modules\//],
      extensions: ['.js', '.json', '.tag']
    }),
    plugins: $plugins__node()
  }, ...arguments)
}
function $plugins__node() {
  return [
    sourcemaps__rollup(),
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
    ...arguments
  ]
}
function $external__npm(options) {
  const resolveId = $resolveId(options)
  return external__npm
  function external__npm(id) {
    const $$ = resolveId(id)
        , $ = relativePath.test(id) ? false : !$$
    return $
  }
}
function resolve__rollup(options) {
  return {resolveId: $resolveId(options)}
}
function $resolveId(options) {
  const paths = options.paths || ['.', 'node_modules']
    , externals = options.externals || []
    , extensions = options.extensions || ['.js']
  return resolveId
  function resolveId(id, origin) {
    const dirname = origin && $path.dirname(origin)
    let path =
            dirname
            ? $path.join(dirname, id)
            : id
      , path__resolved = $resolvePath(path)
      , $ = check__resolveId(path__resolved)
    if ($) return $
    for (let i=0, length = paths.length; i < length; i++) {
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
    for (let i=0, length=extensions.length; i < length; i++) {
      const ext = extensions[i]
          , path__resolved__ext = path__resolved + ext
      if (fileExists(path__resolved__ext)) {
        const $ = resolveId__external(path__resolved__ext)
        return $
      }
    }
    const path__resolved__index = $path.join(path__resolved, 'index.js')
    if (fileExists(path__resolved__index)) {
      return resolveId__external(path__resolved__index)
    }
    return false
  }
  function resolveId__external(path__resolved) {
    for (let i=0; i < externals.length; i++) {
      const external = externals[i]
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
    const stat = fs.statSync(file)
    return stat.isFile()
  } catch (e) {
    return false
  }
}
function $rollup() {
  return Object.assign({
  }, ...arguments)
}