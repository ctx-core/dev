#!/usr/bin/env node
const { run_parallel__workspaces } = require('../lib.js')
const a1__cmd = require('yargs').argv._
main()
async function main() {
	const stdout__BY__name__workspace = await run_parallel__workspaces(...a1__cmd)
	for (let name__workspace in stdout__BY__name__workspace) {
		console.info(name__workspace)
		console.info(stdout__BY__name__workspace[name__workspace])
	}
}
