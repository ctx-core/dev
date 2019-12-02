#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { promisify } = require('util')
const { clone } = require('@ctx-core/object')
const { map, _present__a1 } = require('@ctx-core/array')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const glob = promisify(require('glob'))
main()
async function main() {
	const tsconfig__base = JSON.parse((await readFile('./tsconfig.json')).toString())
	const promise_a1 = map(await glob('packages/*/tsconfig.json'), async (tsconfig_path, arg2) => {
		let tsconfig = JSON.parse((await readFile(tsconfig_path)).toString())
		let update
		if (tsconfig.extends == '../../tsconfig.json') {
			update = true
			delete tsconfig.extends
			tsconfig = clone(tsconfig__base, tsconfig)
		}
		if (_present__a1(tsconfig.references)) {
			update = true
			tsconfig.references = []
		}
		if (update) {
			await writeFile(tsconfig_path, JSON.stringify(tsconfig, null, '\t'))
		}
	})
	await Promise.all(promise_a1)
}
