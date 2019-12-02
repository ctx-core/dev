#!/usr/bin/env
import fs from 'fs'
import { promisify } from 'util'
const { clone } = require('@ctx-core/object')
const { map } = require('@ctx-core/array')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
import glob from 'glob'
main()
async function main() {
	const tsconfig__base = JSON.parse(await readFile('./tsconfig.json'))
  const promise_a1 = map(glob('packages/*/tsconfig.json', async tsconfig_path => {
		let tsconfig = JSON.parse(await readFile(tsconfig_path))
		if (tsconfig.extends == '../../tsconfig.json') {
			delete tsconfig.extends
			tsconfig = clone(tsconfig__base, tsconfig)
			await writeFile(tsconfig_path, JSON.stringify(tsconfig, null, '\t'))
		}
	}))
	await Promise.all(promise_a1)
}
