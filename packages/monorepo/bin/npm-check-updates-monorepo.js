#!/usr/bin/env node
require = require('esm')(module)
const commander = require('commander')
const { npm_check_updates__monorepo } = require('../lib')
main()
async function main() {
	const opts = _opts()
	const h1__name__workspace__h0__stdout =
		await npm_check_updates__monorepo(opts)
	for (let name__workspace in h1__name__workspace__h0__stdout) {
		console.info(name__workspace)
		console.info(h1__name__workspace__h0__stdout[name__workspace])
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
