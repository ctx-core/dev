#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { basename, dirname, join } = require('path')
const commander = require('commander')
const { Parser } = require('htmlparser2')
const { promisify } = require('util')
const { keys } = require('@ctx-core/object')
const { map, sort } = require('@ctx-core/array')
const resolve = require('resolve')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
main()
async function main() {
	const dir = _dir()
	const path__svg = join(dir, `font/socicon.svg`)
	const path__root = join(__dirname, '/../')
	const h1__html__h0__name__component = {}
	await assign__h1__html__h0__name__component()
	await write__files()
	async function assign__h1__html__h0__name__component() {
		const name__icon = basename(path__svg, '.svg')
		const style = basename(dirname(path__svg)).replace('brands', 'brand')
		let html
		const parser = new Parser({
			onopentag(name, attribs) {
				const glyph_name = attribs && attribs['glyph-name']
				if (name === 'glyph' && glyph_name) {
					const name__component = `Socicon-${glyph_name}`
					h1__html__h0__name__component[name__component] = `
<Icon viewBox="0 0 512 512" width="512" height="512" {...$$props}><path d="${attribs.d}"></path></Icon>
						`.trim()
				}
			},
		})
		const svg__Socicon = await readFile(path__svg)
		parser.write(svg__Socicon)
		parser.end()
	}
	async function write__files() {
		const a1__name__Icon = sort(keys(h1__html__h0__name__component))
		await Promise.all(map(a1__name__Icon, name__Icon => {
			writeFile(`${path__root}/ui/${name__Icon}.svelte`, `
<script>
import Icon from './Icon.svelte'
</script>
${h1__html__h0__name__component[name__Icon]}
			`.trim())
		}))
	}
}
function _dir() {
	commander
		.option('-d, --dir <socicon-dir>', 'socicon directory path')
	commander.parse(process.argv)
	const a1__error__commander = _a1__error__commander()
	if (a1__error__commander) {
		throw a1__error__commander.join('\n')
	}
	return commander.dir
}
function _a1__error__commander() {
	const a1__error = []
	if (!commander.dir) {
		a1__error.push('missing --dir <socicon-dir>')
	}
	return a1__error.length && a1__error
}
