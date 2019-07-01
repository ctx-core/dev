#!/usr/bin/env node
const fs = require('fs')
const { promisify } = require('util')
const { reject } = require('@ctx-core/array')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
main()
async function main() {
	const package_json = (await readFile('./package.json')).toString()
	const package = JSON.parse(package_json)
	const packages__workspaces = reject(
		package.workspaces.packages,
		glob => glob === 'packages/ctx-core/packages/*')
	package.workspaces.packages = packages__workspaces
	await writeFile('./package.json', JSON.stringify(package, null, '\t'))
}
