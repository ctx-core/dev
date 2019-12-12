#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { promisify } = require('util')
const { map } = require('@ctx-core/array')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const glob = promisify(require('glob'))
main()
async function main() {
	const promise_a1 = map(
		await glob('packages/*/package.json'),
		async package_path => {
			const package_json = (await readFile(package_path)).toString()
			let package = JSON.parse(package_json)
			const { name } = package
			const replacement = name.replace(/^@/, '')
			let update
			if (package.repository && !!~package.repository.url.indexOf('ctx-core/ctx-core')) {
				update = true
				package.repository.url = `https://github.com/${replacement}.git`
			}
			if (package.bugs && !!~package.bugs.url.indexOf('ctx-core/ctx-core')) {
				update = true
				package.bugs.url = `https://github.com/${replacement}/issues`
			}
			if (!package.homepage || !!~package.homepage.indexOf('ctx-core/ctx-core')) {
				update = true
				package.homepage = `https://github.com/${replacement}#readme`
			}
			if (update) {
				console.debug(replacement, {
					repository: package.repository,
					bugs: package.bugs,
					homepage: package.homepage,
				})
				await writeFile(package_path, JSON.stringify(package, null, '\t'))
			}
		})
	await Promise.all(promise_a1)
}
