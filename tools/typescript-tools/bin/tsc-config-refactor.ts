#!/usr/bin/env node
const fs = require('fs')
const globby = require('globby')
main().then()
async function main() {
	const promise_a1 = (await globby('packages/*/tsconfig.json')).map(
		async tsconfig_path=>{
			const tsconfig_json = (await fs.promises.readFile(tsconfig_path)).toString()
			const tsconfig = JSON.parse(tsconfig_json)
			let update = false
			if (!tsconfig.compilerOptions) {
				update = true
				tsconfig.compilerOptions = {}
			}
			if (tsconfig.compilerOptions.importsNotUsedAsValues !== 'error') {
				update = true
				tsconfig.compilerOptions.importsNotUsedAsValues = 'error'
			}
			if (tsconfig.compilerOptions.strict !== true) {
				update = true
				tsconfig.compilerOptions.strict = true
			}
			if (update) {
				await fs.promises.writeFile(
					tsconfig_path,
					JSON.stringify(tsconfig, null, '\t')
				)
			}
		})
	await Promise.all(promise_a1)
}
