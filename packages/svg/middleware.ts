import fs from 'fs'
import { join } from 'path'
import { map } from '@ctx-core/array'
import { keys, clone, _has__key } from '@ctx-core/object'
const { promisify } = require('util')
const { Parser } = require('htmlparser2')
const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
export function _get__svg({ dir }) {
	return async function get(req, res) {
		const { params, query } = req
		const { name } = params
		let path
		const path_a1 = [
			join(dir, `${name}.svg`),
			join(dir, name),
		]
		for (let i = 0; i < path_a1.length; i += 1) {
			const path__ = path_a1[i]
			if (await exists(path__)) {
				path = path__
				break
			}
		}
		if (!path) {
			res.writeHead(404)
			res.end('Not Found')
			return
		}
		const svg = '' + await readFile(path)
		if (!_has__key(query)) {
			res.writeHead(200, { 'Content-Type': 'image/svg+xml' })
			res.end(svg)
			return
		}
		let svg__opentag = ''
		let startIndex__svg__opentag = 0
		let endIndex__svg__opentag = svg.length
		const parser = new Parser({
			onopentag(name, attribs) {
				if (name === 'svg') {
					startIndex__svg__opentag = parser.startIndex
					endIndex__svg__opentag = parser.endIndex
					const attribs__ = clone(attribs, query)
					if (attribs__.viewbox) {
						attribs__.viewBox = attribs__.viewbox
						delete attribs__.viewbox
					}
					const txt__attribs__ =
						map(
							keys(attribs__),
							key=>
								`${key}=${JSON.stringify(attribs__[key])}`
						).join(' ')
					svg__opentag = `<svg ${txt__attribs__}>`
				}
			},
		}, { decodeEntities: true })
		parser.write(svg)
		parser.end()
		const svg__ = `${
			startIndex__svg__opentag
			? svg.slice(0, startIndex__svg__opentag - 1)
			: ''
		}${svg__opentag}${svg.slice(endIndex__svg__opentag + 1)}`
		res.writeHead(200, { 'Content-Type': 'image/svg+xml' })
		res.end(svg__)
	}
}
