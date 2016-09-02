#!/usr/bin/env node
/**
 * list project rollup entries {file,script} based on ./rollup.json
 * @module ctx-core/rollup/rollup-cmd
 * @example
 * #!/bin/bash
 * rollup-cmd.js -t http
 * # http build file list
 * rollup-cmd.js -t browser
 * # browser build file list
 */
var minimist = require('minimist')
  , argv = minimist(process.argv.slice(2), {
      '--': true,
      alias: {c: 'config', t: 'target'}
    })
  , suffix = (argv['--'] || []).join(' ')
  , config_file = argv.config || './rollup.json'
  , target = argv.target || 'browser'
  , fs = require('fs')
  , config$json = fs.readFileSync(config_file, 'utf8')
  , config = JSON.parse(config$json)
  , entries = config.entries || {}
  , lines = (entries[target] || [])
      .map(
        entry => {
          var cmd
          if (/^\$/.test(entry)) {
            console.info(entry)
            cmd = entry.replace(/^\$/, '')
          } else {
            cmd = `rollup -c '${entry}'`
          }
          if (suffix) {
            cmd += (' ' + suffix)
          }
          return cmd
        }
      )
console.info((lines || []).join('\n'))