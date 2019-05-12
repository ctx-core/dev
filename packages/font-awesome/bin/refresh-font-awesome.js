#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const path = require('path')
const { basename, dirname } = require('path')
const commander = require('commander')
const yaml = require('js-yaml')
const esprima = require('esprima')
const escodegen = require('escodegen')
const htmlparser2 = require('htmlparser2')
const { promisify } = require('util')
const { keys } = require('@ctx-core/object')
const { map, sort, filter } = require('@ctx-core/array')
const { andand } = require('@ctx-core/function')
const { fetch } = require('@ctx-core/fetch')
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const { stdin } = process
const opts__escodegen = {
	format: {
		compact: true,
		semicolons: false,
	}
}
main()
async function main() {
	const dir = _dir()
	console.info('Fetching Free Manifest...')
	const manifest__free = await _manifest__free()
	console.info('Generating...')
	const path__lib = __dirname + '/../lib.js'
	const h1__txt__fn__name__dash = {}
	await assign__a1__existing()
	await assign__manifest__free()
	const txt__lib = _txt__lib()
	await writeFile(path__lib, txt__lib)
	async function _manifest__free() {
		const response = await fetch('https://raw.githubusercontent.com/mattkeys/FontAwesome-Pro-Manifest/master/manifest-free.yml')
		const txt__yaml = await response.text()
		return yaml.safeLoad(txt__yaml)
	}
	async function assign__a1__existing() {
		const txt__lib = (await readFile(path__lib)) + ''
		const ast__lib = esprima.parseModule(txt__lib)
		const { body } = ast__lib
		for (let i = 0; i < body.length; i++) {
			const node = body[i]
			const { declaration } = node
			const id = declaration && declaration.id
			const name = id && id.name
			const name__icon__underscore = name && andand(/^register__(.*)/.exec(name), 1)
			if (declaration && name__icon__underscore) {
				h1__txt__fn__name__dash[name__icon__underscore.replace(/_/g, '-')] = escodegen.generate(node, opts__escodegen)
			}
		}
	}
	async function assign__manifest__free() {
		const a1__key__manifest__free = keys(manifest__free)
		const a1__promise = map(a1__key__manifest__free, name__icon => {
			const node__manifest__free = manifest__free[name__icon]
			const a1__style = node__manifest__free.styles
			return Promise.all(
				map(a1__style, async style => {
					const name__dash = `${name__icon}-${style}`
					const name__icon__underscore = name__icon.replace(/-/g, '_')
					const name__underscore = `${name__icon__underscore}_${style}`
					let width, height
					let d
					const file = path.join(dir, style, `${name__icon}.svg`)
					const parser__html = new htmlparser2.Parser({
						onopentag(name, attrs) {
							if (name === 'svg') {
								const a1__viewbox = attrs.viewbox.split(/ +/)
								width = a1__viewbox[2]
								height = a1__viewbox[3]
							}
							if (name === 'path') {
								d = attrs.d
							}
						}
					}, { decodeEntities: true })
					const html__file = await readFile(file)
					parser__html.write(html__file)
					h1__txt__fn__name__dash[name__dash] =
						_txt__fn(name__underscore, name__dash, width, height, d)
				})
			)
		})
		await Promise.all(a1__promise)
	}
	function _txt__lib() {
		const a1__name__dash = sort(keys(h1__txt__fn__name__dash))
		let txt__lib = `
import { get__icon, _has__icon, register__icon } from './lib.base'
export { get__icon, _has__icon, register__icon }
		`.trim()
		for (let i = 0; i < a1__name__dash.length; i++) {
			const name__dash = a1__name__dash[i]
			const txt__fn = h1__txt__fn__name__dash[name__dash]
			txt__lib += `\n${txt__fn}`
		}
		return txt__lib
	}
}
function _txt__fn(name__underscore, name__dash, width, height, d) {
	// should match escodegen.generate(ast, { format: { compact: false, semicolons: false } })
	return `export function register__${name__underscore}(){if(_has__icon('${name__dash}'))return;register__icon({'${name__dash}':{width:${width},height:${height},paths:[{d:'${d}'}]}})}`
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