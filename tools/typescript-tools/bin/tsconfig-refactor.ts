#!/usr/bin/env node
import fs from 'fs'
import { promisify } from 'util'
import { deep_clone, merge } from '@ctx-core/object'
import { map, _a1_present } from '@ctx-core/array'
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
import globby from 'globby'
main().then()
async function main() {
	const base_tsconfig = JSON.parse((await readFile('./tsconfig.json')).toString())
	const promise_a1 = map(
		await globby('packages/*/tsconfig.json'),
		async tsconfig_path => {
			const tsconfig_json = (await readFile(tsconfig_path)).toString()
			let tsconfig = JSON.parse(tsconfig_json)
			let update
			if (tsconfig.extends == '../../tsconfig.json') {
				update = true
				delete tsconfig.extends
				tsconfig = merge(deep_clone(base_tsconfig), tsconfig)
			}
			if (_a1_present(tsconfig.references)) {
				update = true
				tsconfig.references = []
			}
			if (update) {
				await writeFile(tsconfig_path, JSON.stringify(tsconfig, null, '\t'))
			}
		})
	await Promise.all(promise_a1)
}
