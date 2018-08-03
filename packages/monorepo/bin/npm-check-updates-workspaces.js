#!/usr/bin/env node
const { npm_check_updates__workspaces } = require('../lib.js')
main()
async function main() {
	const stdout__BY__name__workspace = await npm_check_updates__workspaces()
	for (let name__workspace in stdout__BY__name__workspace) {
		console.info(name__workspace)
		console.info(stdout__BY__name__workspace[name__workspace])
	}
}
