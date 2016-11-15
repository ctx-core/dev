var riot__rollup = require('rollup-plugin-riot')
  , node_resolve__rollup = require('rollup-plugin-node-resolve')
  , includepaths__rollup = require('rollup-plugin-includepaths')
  , commonjs__rollup = require('rollup-plugin-commonjs')
  , sourcemaps__rollup = require('rollup-plugin-sourcemaps')
  , alias__rollup = require('rollup-plugin-alias')
  , json__rollup = require('rollup-plugin-json')
  , babel__rollup = require('rollup-plugin-babel')
module.exports = {
  $rollup,
  $browser__rollup,
  $node__rollup
}
function $browser__rollup() {
  return $rollup.call(this, {
    intro: `
      var global = typeof window !== 'undefined' ? window :
        typeof global !== 'undefined' ? global :
        this`,
    format: 'iife',
    globals: {
      global: 'window',
      riot: 'riot'
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
function $node__rollup() {
  return $rollup.call(this, {
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
          'csv-generate',
          'debug',
          'glob',
          'graceful-fs',
          'fs',
          'fs-promise',
          'http',
          'iconv-lite',
          'inflation',
          'inquirer',
          'inquirer-autocomplete-prompt',
          'isomorphic-fetch',
          'jsonfile',
          'koa',
          'koa-generic-session',
          'koa-redirects',
          'koa-route',
          'koa-sslify',
          'koa-static',
          'lutimes',
          'methods',
          'mime-db',
          'net',
          'os-shim',
          'pageres',
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
          'thenify',
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
function $rollup() {
  return Object.assign({
    external: [
      'crypto',
      'fs',
      'path',
      'process',
      'riot'
    ]
  }, ...arguments)
}