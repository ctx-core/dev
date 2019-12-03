#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { promisify } = require('util')
const { clone__deep, merge } = require('@ctx-core/object')
const { map, _present__a1 } = require('@ctx-core/array')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const glob = promisify(require('glob'))
main()
async function main() {
	const tsconfig__base = JSON.parse((await readFile('./tsconfig.json')).toString())
	const promise_a1 = map(
		await glob('packages/*/tsconfig.json'),
		async tsconfig_path => {
			const tsconfig_json = (await readFile(tsconfig_path)).toString()
			console.debug(tsconfig_path)
			let tsconfig = JSON.parse(tsconfig_json)
			let update
			if (tsconfig.extends == '../../tsconfig.json') {
				update = true
				delete tsconfig.extends
				tsconfig = merge(clone__deep(tsconfig__base), tsconfig)
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
