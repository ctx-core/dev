#!/usr/bin/env node
require = require('esm')(module)
const fs = require('fs')
const { basename, dirname } = require('path')
const commander = require('commander')
const esprima = require('esprima')
const escodegen = require('escodegen')
const htmlparser2 = require('htmlparser2')
const { promisify } = require('util')
const { Socket } = require('net')
const { andand } = require('@ctx-core/function')
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
	let a1__file
	try {
		a1__file = await _a1__file()
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
	const path__lib = __dirname + '/../lib.js'
	const h1__txt__fn__name__underscore = {}
	await assign__a1__existing()
	await assign__a1__file()
	const txt__lib = _txt__lib()
	await writeFile(path__lib, txt__lib)
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
				h1__txt__fn__name__underscore[name__icon__underscore] = escodegen.generate(node, opts__escodegen)
			}
		}
	}
	async function assign__a1__file() {
		for (let i = 0; i < a1__file.length; i++) {
			const file = a1__file[i]
			const name__icon = basename(file, '.svg')
			const name__type = basename(dirname(file))
			const name__icon__underscore = name__icon.replace(/-/g, '_')
			const name__dash = `${name__icon}-${name__type}`
			const name__underscore = `${name__icon__underscore}_${name__type}`
			let width, height
			let d
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
			h1__txt__fn__name__underscore[name__underscore] = _txt__fn(name__underscore, name__dash, width, height, d)
		}
	}
	function _txt__lib() {
		const a1__name__underscore = Object.keys(h1__txt__fn__name__underscore).sort()
		let txt__lib = `
import { get__icon, _has__icon, register__icon } from './lib.base'
export { get__icon, _has__icon, register__icon }
		`.trim()
		for (let i = 0; i < a1__name__underscore.length; i++) {
			const name__underscore = a1__name__underscore[i]
			const txt__fn = h1__txt__fn__name__underscore[name__underscore]
			txt__lib += `\n${txt__fn}`
		}
		return txt__lib
	}
	function _txt__fn(name__underscore, name__dash, width, height, d) {
		// should match escodegen.generate(ast, { format: { compact: false, semicolons: false } })
		return `export function register__${name__underscore}(){if(_has__icon('${name__dash}'))return;register__icon({'${name__dash}':{width:${width},height:${height},paths:[{d:'${d}'}]}})}`
	}
}
async function _a1__file() {
	return new Promise((resolve, reject) => {
		if (_is__piped()) {
			let txt__file__piped = ''
			process.stdin.on('readable', () => {
				let chunk
				while ((chunk = process.stdin.read()) !== null) {
					txt__file__piped += chunk
				}
			})
			process.stdin.on('end', () => {
				resolve(txt__file__piped.trim().split('\n'))
			})
		} else {
			commander
				.option('-f, --file <list-of-files>', 'comma-delimited list of files')
			commander.parse(process.argv)
			const a1__error__commander = _a1__error__commander()
			if (a1__error__commander) {
				reject(a1__error__commander.join('\n'))
			}
			resolve(commander.file.split('\n'))
		}
	})
}
function _is__piped() {
	return Socket === process.stdin.constructor
}
function _a1__error__commander() {
	const a1__error = []
	if (!commander.file) {
		a1__error.push('missing --file <list-of-files>')
	}
	return a1__error.length && a1__error
}