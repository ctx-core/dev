#!/usr/bin/env node
require = require('esm')(module)
const { npm_check_updates__monorepo } = require('../lib')
main()
async function main() {
	const h1__name__workspace__h0__stdout = await npm_check_updates__monorepo()
	for (let name__workspace in h1__name__workspace__h0__stdout) {
		console.info(name__workspace)
		console.info(h1__name__workspace__h0__stdout[name__workspace])
	}
}
