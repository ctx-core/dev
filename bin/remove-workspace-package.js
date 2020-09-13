#!/usr/bin/env node
import fs from 'fs'
import { promisify } from 'util'
import { reject } from '@ctx-core/array'
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
main()
async function main() {
	const package_json = (await readFile('./package.json')).toString()
	const pkg = JSON.parse(package_json)
	const packages__workspaces = reject(
		pkg.workspaces.packages,
		glob => glob === 'packages/ctx-core/packages/*')
	pkg.workspaces.packages = packages__workspaces
	await writeFile('./package.json', JSON.stringify(pkg, null, '\t'))
}
