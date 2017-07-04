const node_resolve__plugin = require('rollup-plugin-node-resolve')
    , commonjs__plugin = require('rollup-plugin-commonjs')
    , sourcemaps__plugin = require('rollup-plugin-sourcemaps')
    , alias__plugin = require('rollup-plugin-alias')
    , json__plugin = require('rollup-plugin-json')
    , buble__plugin = require('rollup-plugin-buble')
    , nodent__plugin = require('ctx-core/nodent/rollup')
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
  $external__npm,
  resolve__rollup
}
function $browser__rollup() {
  const ctx = Object.assign({
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
    ]
  }, ...arguments)
  if (!ctx.plugins) ctx.plugins = $plugins__browser()
  return $rollup(ctx)
}
function $plugins__browser(procesor__plugin, ...rest) {
  return [
    alias__plugin({
      'ctx-core/logger/chalk': 'ctx-core/logger/chalk.browser.js'
    }),
    sourcemaps__plugin(),
    commonjs__plugin({
      include: 'node_modules/**',
      extensions: [ '.js', '.coffee' ]
    }),
    json__plugin(),
    resolve__rollup({
      paths: ['.', 'ctx-core', 'node_modules'],
      extensions: ['.js', '.json', '.tag']
    }),
    node_resolve__plugin({
      jsnext: true,
      main: true,
      browser: true
    }),
    procesor__plugin(),
    nodent__plugin(),
    buble__plugin(),
    ...rest
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
    sourcemaps__plugin(),
    commonjs__plugin({
      include: 'node_modules/**',
      extensions: [ '.js', '.coffee' ]
    }),
    json__plugin(),
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
/**
 * @returns {Object}
 * @TODO: Unset watch.useChokidar = false if {@link https://github.com/rollup/rollup-watch/issues/51} is fixed
 */
function $rollup() {
  return Object.assign({
    watch: {
      useChokidar: false
    }
  }, ...arguments)
}