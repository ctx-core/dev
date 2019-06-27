#!/usr/bin/env node
require = require('esm')(module)
const { run_parallel__workspaces } = require('../lib')
const a1__cmd = process.argv.slice(2)
main()
async function main() {
	const stdout__name__workspace = await run_parallel__workspaces(...a1__cmd)
	for (let name__workspace in stdout__name__workspace) {
		console.info(name__workspace)
		console.info(stdout__name__workspace[name__workspace])
	}
}
11
