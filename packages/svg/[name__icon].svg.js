import fs from 'fs'
import { promisify } from 'util'
import { assign } from '@ctx-core/object'
import { find } from '@ctx-core/array'
const htmlparser2 = require('htmlparser2')
const { getOuterHTML } = require('domutils')
const readFile = promisify(fs.readFile)
const resolve = promisify(require('resolve'))
/**
 * @typedef Request - Express request
 */
/**
 * @typedef Response - Express response
 */
/**
 * Returns a `get` http handler that processes the svelte component whose path
 * is returned from `opts.resolve`.
 * @param opts
 * @param {function(string)} opts.resolve - Function to resolve path from string
 * @returns {function(Request,Response)} {get}
 */
export function _get(opts = {}) {
	const { fn, resolve } = opts
	if (typeof resolve !== 'function') throw 'opts.resolve must be a function'
	return async function get(req, res) {
		res.setHeader('Content-Type', 'image/svg+xml')
		const { name__icon } = req.params
		const { style } = req.query
		if (fn) await fn(req, res)
		let svg
		const handler = new htmlparser2.DomHandler((error, dom) => {
			if (error) {
				throw error
			} else {
				const node = find(dom, node => node.name === 'icon')
				node.name = 'svg'
				const { attribs } = node
				assign(attribs, {
					xmlns: 'http://www.w3.org/2000/svg',
					style,
				})
				delete attribs['{...$$props}']
				svg = domutils.getOuterHTML([node])
			}
		})
		const parser = new htmlparser2.Parser(handler)
		const path__icon = await resolve(name__icon)
		parser.write(await readFile(path__icon))
		parser.end()
		const xml = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
${svg}
		`.trim()
		res.end(svg)
	}
}
