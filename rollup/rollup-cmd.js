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
  , config_file =
      argv.config
      || process.env.ROLLUP_CONFIG
      || './rollup.json'
  , target = argv.target || 'browser'
  , fs = require('fs')
  , config$json = fs.readFileSync(config_file, 'utf8')
  , config = JSON.parse(config$json)
  , cmds__target__config = config[target] || []
  , cmds = []
for (var i=0; i < cmds__target__config.length; i++) {
  var cmd__target = cmds__target__config[i]
    , cmd
  if (/^\$/.test(cmd__target)) {
    console.info(cmd__target)
    cmd = cmd__target.replace(/^\$/, '')
  } else {
    cmd = `rollup -c '${cmd__target}'`
  }
  if (suffix) {
    cmd += (' ' + suffix)
  }
  cmds.push(cmd)
}
console.info(cmds.join('\n'))