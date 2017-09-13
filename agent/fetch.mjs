/**
 * agents that fetches data from a service
 * @module ctx-core/agent/fetch
 */
import {clone} from 'ctx-core/object/lib'
import {fetch2} from 'ctx-core/fetch/lib'
import {
  ensure__agent,
  schedule__reset} from 'ctx-core/agent/lib'
import {debounce} from 'ctx-core/debounce/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/agent/fetch'
/**
 * agent that fetches data from a http service
 * @typedef {module:ctx-core/agent/lib~agent} fetch__agent
 * @property {module:ctx-core/agent/fetch.reset__fetch} reset
 * @property {module:ctx-core/agent/fetch.reset__fetch} reset__fetch
 * @property {module:ctx-core/agent/fetch.reset__fetch__do} reset__fetch__do
 * @property {module:ctx-core/agent/fetch.reset__fetch__set} reset__fetch__set
 */
/**
 * Ensures a {@link module:ctx-core/agent/fetch~fetch__agent}
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @param {module:ctx-core/agent/fetch.reset__fetch} ctx__agent.reset
 * @param {module:ctx-core/agent/fetch.reset__fetch} ctx__agent.reset__fetch
 * @param {module:ctx-core/agent/fetch.reset__fetch__do} ctx__agent.reset__fetch__do
 * @param {module:ctx-core/agent/fetch.reset__fetch__set} ctx__agent.reset__fetch__set
 * @returns {module:ctx-core/agent/fetch~fetch__agent}
 */
export function fetch__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|fetch__agent`)
  return ensure__agent(ctx, {
    load: schedule__reset,
    reset: reset__fetch,
    reset__fetch,
    reset__fetch__do,
    reset__fetch__set
  }, ...ctx__agent$$)
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
 *   - yes => @yield agent.{@link module:ctx-core/agent/fetch.reset__fetch__do}
 *   - no => @yield agent.{@link module:ctx-core/agent/fetch.reset__noop}
 * @returns {Promise<module:ctx-core/agent/fetch~fetch__agent>}
 */
export async function reset__fetch() {
  const agent = this
      , {key} = agent
      , ctx__reset = clone(...arguments)
  log(`${logPrefix}|reset__fetch`, key)
  let {ctx} = agent
  await debounce(ctx, {
    key: `${key}__reset__fetch`,
    no: async () => agent.reset__noop(),
    yes: async () => agent.reset__fetch__do(ctx__reset)
  })
  return agent
}
/**
 * Performs {@link module:ctx-core/fetch/lib.fetch} to request & fetch data from HTTP services
 *
 * - @yield agent.{@link module:ctx-core/agent/fetch.reset__fetch__set}
 * @param {module:ctx-core/agent/fetch~ctx__reset} ctx__reset
 * @returns {Promise<module:ctx-core/agent/fetch~fetch__agent>}
 */
export async function reset__fetch__do(ctx__reset) {
  log(`${logPrefix}|reset__fetch__do`)
  const agent = this
  return agent.reset__fetch__set(ctx__reset)
}
/**
 * fetch from HTTP service & agent.reset__set
 *
 * - @yield {@link module:ctx-core/fetch/lib.fetch}
 * - @yield agent.{@link module:ctx-core/agent/lib.reset__set}
 * @param ctx__reset
 * @returns {Promise<module:ctx-core/agent/fetch~fetch__agent>}
 */
export async function reset__fetch__set(ctx__reset) {
  log(`${logPrefix}|reset__fetch__set`)
  const agent = this
      , {ctx} = agent
      , response = await fetch2(ctx, ctx__reset)
  if (response && response.status === 404) {
    return agent.reset__clear()
  }
  return agent.reset__set(response)
}