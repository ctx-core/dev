import fs from 'fs'
import { promisify } from 'util'
import in_glob from 'glob'
const glob = promisify(in_glob)
export async function package_refactor() {
	const promise_a1 = (await glob('packages/*/package.json')).map(
		async package_path=>{
			const package_json = (await fs.promises.readFile(package_path)).toString()
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
			if (pkg.gitHead) {
				update = true
				delete pkg.gitHead
			}
			if (pkg.type) {
				update = true
				delete pkg.type
			}
			if (!pkg.scripts) {
				update = true
				pkg.scripts = {}
			}
			if (!pkg.scripts.build) {
				update = true
				pkg.scripts.build = 'npm run compile'
			}
			if (!pkg.scripts.exec) {
				update = true
				pkg.scripts.exec = '$@'
			}
			if (pkg.scripts.test) {
				update = true
				delete pkg.scripts.test
			}
			if (update) {
				console.debug(replacement, {
					repository: pkg.repository,
					bugs: pkg.bugs,
					homepage: pkg.homepage,
				})
				await fs.promises.writeFile(package_path, JSON.stringify(pkg, null, '\t'))
			}
		})
	await Promise.all(promise_a1)
}
