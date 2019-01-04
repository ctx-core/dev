import { clone } from '@ctx-core/object/lib.js'
import { ensure__agent } from '@ctx-core/agent/lib.js'
import { throw__invalid_argument } from '@ctx-core/error/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/repository/agent.js'
/**
 *
 * @param {module:ctx-core/object/lib~ctx}
 * @param opts
 * @param opts.key - agent is stored on ctx[key]
 * @param opts.scope - agent's domain is ctx[...scope]
 * @param {function} opts.fetch - Function to fetch data from the gateway resource
 * @param {function} opts.lookup - Alternative form to opts.fetch
 * @param {function<id>} opts.fetch - lookup function to get data
 * @returns {*}
 * @see {@link https://msdn.microsoft.com/en-us/library/ff649690.aspx}
 */
export function ensure__agent__repo(ctx, ...ARR__opts) {
	const opts = clone(...ARR__opts)
	const { key, query } = opts
	if (ctx[key]) return ctx[key]
	log(`${logPrefix}|ensure__agent__repo`, key)
	let agent, scope__0
	return ensure__agent(ctx, {
		init,
		reset,
		ensure,
		DO__ensure,
		ensure__ctx,
		query
	}, opts)
	function init() {
		log(`${logPrefix}|ensure__agent__repo|init`, key)
		agent = this
		scope__0 = agent.scope[0]
	}
	async function reset() {
		log(`${logPrefix}|ensure__agent__repo|reset`, key)
		const $ = {}
		$[scope__0] = { cache: {}, promises: {} }
		agent.set($)
	}
	async function ensure(ctx__query, id) {
		return agent.DO__ensure(ctx__query, id)
	}
	async function DO__ensure(ctx__query, id) {
		const {
			cache,
			promises
		} = ctx[scope__0]
		if (id == null)
			throw__invalid_argument(
				ctx,
				{
					key: 'id',
					ctx__query,
					scope__0
				})
		if (cache[id] == null) {
			if (!promises[id]) promises[id] = query(ctx__query, id)
			cache[id] = await promises[id]
		}
		return cache[id]
	}
	async function ensure__ctx(ctx__query, id) {
		log(`${logPrefix}|ensure__ctx`)
		const { scope__target } = opts
		const value = await agent.ensure(ctx__query, id)
		const __ = {}
		__[scope__target] = value
		return __
	}
}