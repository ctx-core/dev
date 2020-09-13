#!/usr/bin/env node
import fs from 'fs'
import { promisify } from 'util'
import { map } from '@ctx-core/array'
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
import glob__ from 'glob'
const glob = promisify(glob__)
main()
async function main() {
	const promise_a1 = map(
		await glob('packages/*/package.json'),
		async package_path => {
			const package_json = (await readFile(package_path)).toString()
			let pkg = JSON.parse(package_json)
			const { name } = pkg
			const replacement = name.replace(/^@/, '')
			let update
			if (pkg.repository && !!~pkg.repository.url.indexOf('ctx-core/ctx-core')) {
				update = true
				pkg.repository.url = `https://github.com/${replacement}.git`
			}
			if (pkg.bugs && !!~pkg.bugs.url.indexOf('ctx-core/ctx-core')) {
				update = true
				pkg.bugs.url = `https://github.com/${replacement}/issues`
			}
			if (!pkg.homepage || !!~pkg.homepage.indexOf('ctx-core/ctx-core')) {
				update = true
				pkg.homepage = `https://github.com/${replacement}#readme`
			}
			if (pkg.type) {
				update = true
				delete pkg.type
			}
			if (update) {
				console.debug(replacement, {
					repository: pkg.repository,
					bugs: pkg.bugs,
					homepage: pkg.homepage,
				})
				await writeFile(package_path, JSON.stringify(pkg, null, '\t'))
			}
		})
	await Promise.all(promise_a1)
}
