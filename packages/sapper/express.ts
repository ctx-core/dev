import { promisify } from 'util'
import { flatten } from '@ctx-core/array'
const resolve = promisify(require('resolve'))
import fs from 'fs'
const readFile = promisify(fs.readFile)
type opts__get__asset = {
	key__asset: string,
	dir__root: string,
}
/**
 * @typedef opts__get__asset
 * @param {string}[key__asset]
 * @param {string}[dir__root]
 */
/**
 * GET asset
 * @param opts
 * @returns {get__asset}
 * @private
 */
export function _get__asset(opts:opts__get__asset) {
	const { key__asset, dir__root } = opts
	return get__asset
	async function get__asset(_, res) {
		const NODE_ENV = process.env.NODE_ENV
		const dir__build =
			(NODE_ENV === 'dev' || NODE_ENV === 'development')
			? `${dir__root}/__sapper__/dev`
			: `${dir__root}/__sapper__/build`
		const path__build = await resolve(`${dir__build}/build.json`)
		const build = JSON.parse(
			(await readFile(path__build)).toString()
		)
		const { assets } = build
		const str__path__relative = assets[key__asset]
		const a1__path__relative = flatten([str__path__relative])
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
				await resolve(`${dir__build}/client/${path__relative}`)
			return readFile(path__resolved)
		}
	}
}
