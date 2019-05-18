import fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'
import htmlparser2 from 'htmlparser2'
import domutils from 'domutils'
import { assign } from '@ctx-core/object'
import { find } from '@ctx-core/array'
import resolve__ from 'resolve'
const readFile = promisify(fs.readFile)
const resolve = promisify(resolve__)
export function _get(opts = {}) {
	const { fn, dir } = opts
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
				const node = find(dom, node => node.name === 'Icon')
				node.name = 'svg'
				assign(node.attribs, {
					xmlns: 'http://www.w3.org/2000/svg',
					style,
				})
				svg = domutils.getOuterHTML([node])
			}
		})
		const parser = new htmlparser2.Parser(handler)
		const path__icon = await resolve(join(dir, `${name__icon}.svg`))
		parser.write(await readFile(path__icon))
		parser.end()
		const xml = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
${svg}
		`.trim()
		res.end(svg)
	}
}
export const get = _get()
