#!/usr/bin/env node
require = require('esm')(module)
const { run_parallel__workspaces } = require('../lib')
const commander = require('commander')
const a1__cmd = process.argv.slice(2)
main()
async function main() {
	const opts = _opts()
	const stdout__name__workspace =
		await run_parallel__workspaces(a1__cmd, opts)
	for (let name__workspace in stdout__name__workspace) {
		console.info(name__workspace)
		console.info(stdout__name__workspace[name__workspace])
	}
}
function _opts() {
	commander
		.option('-t, --threads <thread-count>', 'thread count [default=20]')
	commander.parse(process.argv)
	return {
		dir: commander.threads || 20,
	}
}
