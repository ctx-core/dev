#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { basename, dirname } = require('path')
const commander = require('commander')
const htmlparser2 = require('htmlparser2')
const domutils = require('domutils')
const { promisify } = require('util')
const { assign, keys } = require('@ctx-core/object')
const { map, sort } = require('@ctx-core/array')
const glob = promisify(require('glob'))
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
main()
async function main() {
	const dir = _dir()
	const a1__path__svg = await glob(`${dir}/svgs/*/*.svg`)
	const path__root = __dirname + '/../'
	const h1__html__h0__name__component = {}
	await assign__h1__html__h0__name__component()
	await write__files()
	async function assign__h1__html__h0__name__component() {
		const a1__promise = map(a1__path__svg, async path__svg => {
			const name__icon = basename(path__svg, '.svg')
			const style = basename(dirname(path__svg))
			const name__component = `FA-${name__icon}-${style}`
			let html
			const handler = new htmlparser2.DomHandler((error, dom) => {
				if (error) {
					throw error
				} else {
					const { attribs } = dom[0]
					const { viewbox } = attribs
					const [ width, height ] = viewbox.split(/ +/g).slice(2)
					assign(attribs, { width, height })
					html = `
<Icon viewBox="${viewbox}" width="${width}" height="${height}" {...$$props}>${domutils.getInnerHTML(dom[0])}</Icon>
					`.trim()
				}
			})
			const parser = new htmlparser2.Parser(handler)
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
			writeFile(`${path__root}/ui/${name__Icon}.html`, `
<script>
	import Icon from './Icon.html'
</script>
${h1__html__h0__name__component[name__Icon]}
			`.trim())
		}))
	}
}
function _dir() {
	commander
		.option('-d, --dir <font-awesome-svg-dir>', 'font-awesome svg directory path')
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
		a1__error.push('missing --dir <font-awesome-svg-dir>')
	}
	return a1__error.length && a1__error
}