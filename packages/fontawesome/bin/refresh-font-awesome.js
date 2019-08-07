#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { basename, dirname, join, resolve } = require('path')
const commander = require('commander')
const { DomHandler, Parser } = require('htmlparser2')
const { getInnerHTML } = require('domutils')
const { promisify } = require('util')
const { assign, keys } = require('@ctx-core/object')
const { map, sort } = require('@ctx-core/array')
const globby = require('globby')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const output_dir__default = resolve(join(__dirname, '/../'))
main()
async function main() {
	const { dir, output_dir } = _opts()
	const a1__path__svg = await globby(`${dir}/svgs/*/*.svg`)
	const h1__html__h0__name__component = {}
	await assign__h1__html__h0__name__component()
	await write__files()
	async function assign__h1__html__h0__name__component() {
		const a1__promise = map(a1__path__svg, async path__svg => {
			const name__icon = basename(path__svg, '.svg')
			const style = basename(dirname(path__svg)).replace('brands', 'brand')
			const name__component = `FA-${name__icon}-${style}`
			let html
			const handler = new DomHandler((error, dom) => {
				if (error) {
					throw error
				} else {
					const { attribs } = dom[0]
					const { viewbox } = attribs
					const [width, height] = viewbox.split(/ +/g).slice(2)
					assign(attribs, { width, height })
					html = `
<Icon bind:node viewBox="${viewbox}" width="${width}" height="${height}" {...$$props}>${getInnerHTML(dom[0])}</Icon>
					`.trim()
				}
			})
			const parser = new Parser(handler)
			const html__file = await readFile(path__svg)
			parser.write(html__file)
			parser.end()
			h1__html__h0__name__component[name__component] = html
		})
		await Promise.all(a1__promise)
	}
	async function write__files() {
		const a1__name__Icon = sort(keys(h1__html__h0__name__component))
		await Promise.all(map(a1__name__Icon, name__Icon => {
			writeFile(`${output_dir}/ui/${name__Icon}.svelte`, `
<script>
import Icon from '@ctx-core/fontawesome/ui/Icon.svelte'
export let node = null
</script>
${h1__html__h0__name__component[name__Icon]}
			`.trim())
		}))
	}
}
function _opts() {
	commander
		.option('-d, --dir <fontawesome-dir>', 'fontawesome directory path')
		.option('-o, --output-dir <library-dir> [${output_dir__default}]', 'library directory to write generated files to')
	commander.parse(process.argv)
	const a1__error__commander = _a1__error__commander()
	if (a1__error__commander) {
		throw a1__error__commander.join('\n')
	}
	return {
		dir: commander.dir,
		output_dir: commander.outputDir || output_dir__default,
	}
}
function _a1__error__commander() {
	const a1__error = []
	if (!commander.dir) {
		a1__error.push('missing --dir <fontawesome-dir>')
	}
	if (!commander.outputDir) {
		a1__error.push('missing --output-dir <library-dir>')
	}
	return a1__error.length && a1__error
}
