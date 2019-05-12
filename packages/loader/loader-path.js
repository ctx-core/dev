import path from 'path'
import fs from 'fs'
import valid__url from 'valid-url'
import compiler__svelte from 'svelte/compiler/svelte.js'
const { access } = fs
const { R_OK } = fs.constants
async function _path__file(path__file__) {
	let path__file = path__file__
	if (await is__readable(path__file)) {
		return path__file
	}
	path__file = `${path__file__}.js`
	if (await is__readable(path__file)) {
		return path__file
	}
	path__file = `${path__file__}.js`
	if (await is__readable(path__file)) {
		return path__file
	}
}
export async function resolve(
	specifier,
	parentModuleURL,
	defaultResolver
) {
	if (
		!specifier
		|| specifier[0] == '.'
		|| specifier[0] == '/'
		|| valid__url.isUri(specifier)
	) {
		return based__on__extname(specifier)
	}
	const a1__NODE_PATH = _a1__NODE_PATH()
	for (let i = 0; i < a1__NODE_PATH.length; i++) {
		const NODE_PATH__ = a1__NODE_PATH[i]
		const path__file =
			await _path__file(path.join(NODE_PATH__, specifier))
		if (path__file) {
			return based__on__extname(path__file)
		}
	}
	return defaultResolver(specifier, parentModuleURL)
	function based__on__extname(path__file) {
		const extname__path = path.extname(path__file)
		if (!extname__path) {
			return {
				url:
					/^file:/.test(path__file)
					? path__file
					: `file:${path__file}`,
				format: 'cjs'
			}
		} else if (extname__path == '.js') {
			return defaultResolver(path__file, parentModuleURL)
		} else {
			return {
				url: path__file,
				format: 'dynamic'
			}
		}
	}
}
let NODE_PATH__cache
let a1__NODE_PATH__cache = []
function _a1__NODE_PATH() {
	const { NODE_PATH } = process.env
	if (NODE_PATH == NODE_PATH__cache)
		return a1__NODE_PATH__cache
	a1__NODE_PATH__cache = []
	NODE_PATH__cache = NODE_PATH
	const a1__NODE_PATH = NODE_PATH.split(':')
	for (let i = 0; i < a1__NODE_PATH.length; i++) {
		let NODE_PATH__ = a1__NODE_PATH[i].trim()
		const regexp__back = new RegExp('^\.\.')
		const regexp__current = new RegExp('^\.')
		if (regexp__back.test(NODE_PATH__)) {
			NODE_PATH__ = path.join(process.cwd(), '..', NODE_PATH__)
		} else if (regexp__current.test(NODE_PATH__)) {
			NODE_PATH__ = path.join(process.cwd(), NODE_PATH__)
		}
		a1__NODE_PATH__cache.push(NODE_PATH__)
	}
	return a1__NODE_PATH__cache
}
function is__readable(path) {
	return new Promise((resolve, reject) => {
		access(path, R_OK, err => {
			if (err) {
				resolve(false)
			} else {
				resolve(true)
			}
		})
	})
}
export async function dynamicInstantiate(url) {
	const extname__path = path.extname(url)
	if (!extname__path) {
		return {
			exports: ['default'],
			execute: exports => {
				const code = fs.readFileSync(url, 'utf-8')
				console.info(code)
				exports.default.set(
					code
				)
			}
		}
	}
	if (extname__path == '.html') {
		return {
			exports: ['default'],
			execute: exports => {
				const options =
					Object.assign({}, { store: true, parser: 'v2' }, {
						url,
						filename: url,
						name:
							capitalize(
								path.basename(url)
									.replace(
										new RegExp(`${extname__path.replace('.', '\\.')}$`),
										'')
									.replace(
										/-/g,
										'_')),
						generate: 'ssr'
					})
				const ref =
					compiler__svelte.compile(
						fs.readFileSync(url, 'utf-8'), options
					)
				const { code } = ref
				// get and set functions provided for pre-allocated export names
				exports.default.set(
					// (new Module())._compile(code, url)
					code
				)
			}
		}
	}
}
function capitalize(name) {
	return name[0].toUpperCase() + name.slice(1)
}