#!/usr/bin/env node
const { promisify } = require('util')
const globby = require('globby')
const fs = require('fs')
const { dirname } = require('path')
const readFile = promisify(fs.readFile)
main()
async function main() {
	const a1__path__ideaexclude = await globby('**/.ideaexclude', { gitignore: true })
	const a1__excludeFolder = []
	await Promise.all(
		a1__path__ideaexclude.map(async path__ideaexclude => {
			const dir = dirname(path__ideaexclude)
			const txt = (await readFile(path__ideaexclude)).toString().trim()
			const a1__entry = txt.split('\n').filter(v => !!v)
			a1__entry.forEach(entry => {
				a1__excludeFolder.push(
					`<excludeFolder url="file://$MODULE_DIR$/${dir}/${entry}" />`
				)
			})
		})
	)
	console.info(a1__excludeFolder.sort().join('\n'))
}
