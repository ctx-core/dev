var riot__rollup = require('rollup-plugin-riot')
  , node_resolve__rollup = require('rollup-plugin-node-resolve')
  , includepaths__rollup = require('rollup-plugin-includepaths')
  , commonjs__rollup = require('rollup-plugin-commonjs')
  , sourcemaps__rollup = require('rollup-plugin-sourcemaps')
  , alias__rollup = require('rollup-plugin-alias')
  , json__rollup = require('rollup-plugin-json')
  , babel__rollup = require('rollup-plugin-babel')
module.exports = {
  new__config__rollup,
  new__browser__config__rollup,
  new__node__config__rollup
}
function new__browser__config__rollup() {
  return new__config__rollup.call(this, {
    intro: `
      var global = typeof window !== 'undefined' ? window :
        typeof global !== 'undefined' ? global :
        this`,
    format: 'iife',
    globals: {
      global: 'window',
      riot: 'riot',
      d3: 'd3'
    },
    plugins: [
      alias__rollup({
        'js-console-color': 'ctx-core/logger/browser.js'
      }),
      sourcemaps__rollup(),
      riot__rollup(),
      includepaths__rollup({
        include: {},
        paths: ['.', './ctx-core', './node_modules'],
        external: [],
        extensions: ['.js', '.json', '.html', '.tag']
      }),
      node_resolve__rollup({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs__rollup({
        include: 'node_modules/**',
        extensions: [ '.js', '.coffee' ]
      }),
      json__rollup(),
      babel__rollup({
        exclude: 'node_modules/**'
      })
    ]
  }, ...arguments)
}
function new__node__config__rollup() {
  return new__config__rollup.call(this, {
    format: 'cjs',
    plugins: [
      riot__rollup(),
      includepaths__rollup({
        include: {},
        paths: ['./', './ctx-core', './node_modules'],
        external: [
          'aws-sdk',
          'co-fs',
          'crypto',
          'debug',
          'glob',
          'fs',
          'http',
          'iconv-lite',
          'inflation',
          'inquirer',
          'inquirer-autocomplete-prompt',
          'isomorphic-fetch',
          'koa',
          'koa-generic-session',
          'koa-redirects',
          'koa-sslify',
          'koa-static',
          'methods',
          'mime-db',
          'net',
          'os-shim',
          'parseurl',
          'path',
          'pg',
          'pg-native',
          'process',
          'riot',
          'shelljs',
          'statuses',
          'stream',
          'streams',
          'temp',
          'throng',
          'try-thread-sleep',
          'tty',
          'util',
          'vorpal',
          'zlib'
        ],
        extensions: ['.js', '.json', '.html', '.tag']
      }),
      node_resolve__rollup({
        jsnext: true,
        main: true,
        preferBuiltins: true
      }),
      commonjs__rollup({
        include: 'node_modules/**',
        extensions: [ '.js', '.coffee' ]
      }),
      json__rollup(),
      babel__rollup({
        exclude: 'node_modules/**'
      })
    ]
  }, ...arguments)
}
function new__config__rollup() {
  return Object.assign({
    external: ['riot', 'fs', 'path', 'process']
  }, ...arguments)
}