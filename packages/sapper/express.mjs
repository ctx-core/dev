import util from 'util'
const { promisify } = util
import resolve from 'resolve'
const _promise__resolve = promisify(resolve)
import fs from 'fs'
const { readFile } = fs
const _promise__readFile = promisify(readFile)
export function _get__asset(opts = {}) {
	const { build, key__asset, dir__root } = opts
	const { assets } = build
	const path__relative = assets[key__asset]
	return get__asset
	async function get__asset(req, res) {
		const path__resolved =
			await _promise__resolve(`${dir__root}/build/client/${path__relative}`)
		res.writeHead(200, {
			'Content-Type': 'application/javascript',
		})
		const js__Layout__Nav = (await _promise__readFile(path__resolved)).toString()
		res.end(js__Layout__Nav)
	}
}