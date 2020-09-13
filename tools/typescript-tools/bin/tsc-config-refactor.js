#!/usr/bin/env node
import fs from 'fs'
import { promisify } from 'util'
import in_glob from 'glob'
const glob = promisify(in_glob)
main().then()
async function main() {
	const promise_a1 = (await glob('packages/*/tsconfig.json')).map(
		async tsconfig_path => {
			const tsconfig_json = (await fs.promises.readFile(tsconfig_path)).toString()
			const tsconfig = JSON.parse(tsconfig_json)
			let update = false
			if (tsconfig.compilerOptions?.importsNotUsedAsValues !== 'error') {
				update = true
				tsconfig.compilerOptions.importsNotUsedAsValues = 'error'
			}
			if (update) {
				await fs.promises.writeFile(tsconfig_path, JSON.stringify(tsconfig, null, '\t'))
			}
		})
	await Promise.all(promise_a1)
}
