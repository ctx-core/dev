#!/usr/bin/env node
require = require('esm')(module)
const { promisify } = require('util')
const globby = require('globby')
const fs = require('fs')
const { dirname } = require('path')
const { _h__param } = require('@ctx-core/cli-args')
const readFile = promisify(fs.readFile)
main()
async function main() {
	const a1__path__ideaexclude = await globby('**/.ideaexclude', { gitignore: true })
	const a1__excludeFolder = []
	const h__param = _h__param(process.argv.slice(2), {
		indent: '-i, --indent',
	})
	const { indent = '' } = h__param
	await Promise.all(
		a1__path__ideaexclude.map(async path__ideaexclude => {
			const dir = dirname(path__ideaexclude)
			const txt = (await readFile(path__ideaexclude)).toString().trim()
			const a1__entry = txt.split('\n').filter(v => !!v)
			a1__entry.forEach(entry => {
				a1__excludeFolder.push(
					dir === '.'
					? `${indent}<excludeFolder url="file://$MODULE_DIR$/${entry}" />`
					: `${indent}<excludeFolder url="file://$MODULE_DIR$/${dir}/${entry}" />`
				)
			})
		})
	)
	console.info(a1__excludeFolder.sort().join('\n'))
}
