#!/usr/bin/env node
/**
 * list project sass entries {file,script} based on ./sass.json
 * @module ctx-core/sass/sass-cmd
 * @example
 * #!/bin/sh
 * sass-cmd.js -t build-1
 * # build-1 build file list
 * sass-cmd.js -t browser
 * # browser build file list
 */
console.info(_sass__cmd())
module.exports = _sass__cmd
function _sass__cmd() {
	const minimist = require('minimist')
	const argv =
		minimist(process.argv.slice(2), {
			'--': true,
			alias: { c: 'config', t: 'target', w: 'watch' }
		})
	const config_file =
		argv.config
		|| process.env.SASS_JSON
		|| './sass.json'
	const target =
		argv.target
		|| 'browser'
	const watch = argv.watch
	const suffix = (argv['--'] || []).join(' ')
	const fs = require('fs')
	const json__config = fs.readFileSync(config_file, 'utf8')
	const config = JSON.parse(json__config)
	const cmds = config[target] || []
	const ARR__sass__cmd = []
	for (let i = 0; i < cmds.length; i++) {
		const cmd = cmds[i]
		const params = cmd.params || ''
		const input = cmd.input
		const output = cmd.output
		if (!input) throw `input required:\n${JSON.stringify(cmd)}`
		ARR__sass__cmd.push(_cmd(params, input, output, suffix))
	}
	return ARR__sass__cmd.join('\n')
	function _cmd(params, input, output, suffix) {
		const params__ =
			watch
			? `${params} --watch`
			: params
		let cmd = `node-sass ${params__} ${input}`
		if (output) cmd = `${cmd} ${output}`
		if (suffix) {
			cmd = `${cmd} ${suffix}`
		}
		return cmd
	}
}