#!/usr/bin/env node
require = require('esm')(module)
const { npm_check_updates__monorepo } = require('../lib.js')
main()
async function main() {
	const stdout__BY__name__workspace = await npm_check_updates__monorepo()
	for (let name__workspace in stdout__BY__name__workspace) {
		console.info(name__workspace)
		console.info(stdout__BY__name__workspace[name__workspace])
	}
}
