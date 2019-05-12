import util from 'util'
const { promisify } = util
import resolve from 'resolve'
import { flatten } from '@ctx-core/array'
const _promise__resolve = promisify(resolve)
import fs from 'fs'
const { readFile } = fs
const _promise__readFile = promisify(readFile)
export function _get__asset(opts = {}) {
	const { key__asset, dir__root } = opts
	return get__asset
	async function get__asset(req, res) {
		const dir__build =
			process.env.NODE_ENV === 'development'
			? `${dir__root}/__sapper__/dev`
			: `${dir__root}/__sapper__/build`
		const path__build = await _promise__resolve(`${dir__build}/build.json`)
		const build = JSON.parse((await _promise__readFile(path__build)).toString())
		const { assets } = build
		const STR__path__relative = assets[key__asset]
		const a1__path__relative = flatten([STR__path__relative])
		res.writeHead(200, {
			'Content-Type': 'application/javascript',
		})
		const body = await _body()
		res.end(body)
		async function _body() {
			const a1__body__asset = await Promise.all(_a1__promise__body__asset())
			return a1__body__asset.join('\n')
		}
		function _a1__promise__body__asset() {
			const a1__promise = []
			for (let i = 0; i < a1__path__relative.length; i++) {
				a1__promise.push(_body__asset(a1__path__relative[i]))
			}
			return a1__promise
		}
		async function _body__asset(path__relative) {
			const path__resolved =
				await _promise__resolve(`${dir__build}/client/${path__relative}`)
			return _promise__readFile(path__resolved)
		}
	}
}