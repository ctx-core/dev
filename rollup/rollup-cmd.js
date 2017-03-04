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
console.info($rollup__cmd())
module.exports = $rollup__cmd
function $rollup__cmd() {
  const minimist = require('minimist')
      , argv = minimist(process.argv.slice(2), {
          '--': true,
          alias: {c: 'config', h: 'help', t: 'target'}
        })
      , {help} = argv
  if (help) return help__msg()
  const suffix = (argv['--'] || []).join(' ')
      , config_file =
          argv.config
          || process.env.ROLLUP_JSON
          || './rollup.json'
      , {target = 'browser'} = argv
      , fs = require('fs')
      , config$json = fs.readFileSync(config_file, 'utf8')
      , config = JSON.parse(config$json)
      , cmds__target__config = config[target] || []
      , cmds = []
  for (let i=0; i < cmds__target__config.length; i++) {
    const cmd__target = cmds__target__config[i]
    let cmd
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
  return cmds.join('\n')
}
function help__msg() {
    return `
Usage: rollup-cmd.js [-c <config-file>] [-t <target>]

Options:

-c, --config Use config file (defaults to './rollup.json')
-t, --target Use build target defined in config file (defaults to 'browser')
-h, --help   This help message
    `.trim()
}