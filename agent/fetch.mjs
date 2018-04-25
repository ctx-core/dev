/**
 * agents that fetches data from a service
 * @module ctx-core/agent/fetch
 */
import {clone} from 'ctx-core/object/lib.mjs'
import {fetch2} from 'ctx-core/fetch/lib.mjs'
import {
	ensure__agent,
	schedule__reset} from 'ctx-core/agent/lib.mjs'
import {debounce} from 'ctx-core/debounce/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/agent/fetch.mjs'
/**
 * agent that fetches data from a http service
 * @typedef {module:ctx-core/agent/lib~agent} ensure__agent__fetch
 * @property {module:ctx-core/agent/fetch.reset__fetch} reset
 * @property {module:ctx-core/agent/fetch.reset__fetch} reset__fetch
 * @property {module:ctx-core/agent/fetch.reset__fetch__do} reset__fetch__do
 * @property {module:ctx-core/agent/fetch.reset__fetch__set} reset__fetch__set
 */
/**
 * Ensures a {@link module:ctx-core/agent/fetch~ensure__agent__fetch}
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @param {module:ctx-core/agent/fetch.reset__fetch} ctx__agent.reset
 * @param {module:ctx-core/agent/fetch.reset__fetch} ctx__agent.reset__fetch
 * @param {module:ctx-core/agent/fetch.reset__fetch__do} ctx__agent.reset__fetch__do
 * @param {module:ctx-core/agent/fetch.reset__fetch__set} ctx__agent.reset__fetch__set
 * @returns {module:ctx-core/agent/fetch~ensure__agent__fetch}
 */
export function ensure__agent__fetch(ctx, ...array__ctx__agent) {
	log(`${logPrefix}|ensure__agent__fetch`)
	return ensure__agent(ctx, {
		load: schedule__reset,
		reset: reset__fetch,
		reset__fetch,
		reset__fetch__do,
		reset__fetch__set
	}, ...array__ctx__agent)
}
/**
 * Used to supply the {@link module:ctx-core/fetch/lib~ctx__fetch} to fetch.
 * Also reserved for future expansion.
 * @typedef {module:ctx-core/fetch/lib~ctx__fetch} ctx__reset
 */
/**
 * Resets the agent by fetching data from the http service.
 *
 * - @yield debounce
 *	 - yes => @yield agent.{@link module:ctx-core/agent/fetch.reset__fetch__do}
 *	 - no => noop
 * @returns {Promise<module:ctx-core/agent/fetch~ensure__agent__fetch>}
 */
export async function reset__fetch() {
	const agent = this
			, {key} = agent
			, ctx__reset = clone(...arguments)
	log(`${logPrefix}|reset__fetch`, key)
	let {ctx} = agent
	await debounce(ctx, {
		key: `${key}__reset__fetch`,
		no: async () => {},
		yes:
			async () =>
				agent.reset__fetch__do(ctx__reset)
	})
	return agent
}
/**
 * Performs {@link module:ctx-core/fetch/lib.fetch} to request & fetch data from HTTP services
 *
 * - @yield agent.{@link module:ctx-core/agent/fetch.reset__fetch__set}
 * @param {module:ctx-core/agent/fetch~ctx__reset} ctx__reset
 * @returns {Promise<module:ctx-core/agent/fetch~ensure__agent__fetch>}
 */
export async function reset__fetch__do(ctx__reset) {
	log(`${logPrefix}|reset__fetch__do`)
	const agent = this
	return agent.reset__fetch__set(ctx__reset)
}
/**
 * fetch from HTTP service & agent.set
 *
 * - @yield {@link module:ctx-core/fetch/lib.fetch}
 * - agent.set}
 * @param ctx__reset
 * @returns {Promise<module:ctx-core/agent/fetch~ensure__agent__fetch>}
 */
export async function reset__fetch__set(ctx__reset) {
	log(`${logPrefix}|reset__fetch__set`)
	const agent = this
			, {ctx} = agent
			, response = await fetch2(ctx, ctx__reset)
	if (response && response.status === 404) {
		agent.clear()
		return
	}
	return agent.set(response)
}