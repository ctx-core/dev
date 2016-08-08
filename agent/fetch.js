/**
 * agents that fetches data from a service
 * @module ctx-core/agent/fetch
 */
import {clone} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import {fetch} from "ctx-core/fetch/lib";
import {
  ensure__agent,
  schedule__reset} from "ctx-core/agent/lib";
import debounce from "ctx-core/debounce/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/agent/fetch";
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
 * @param {...module:ctx-core/agent/lib~agent$ctx} agent$ctx
 * @param {module:ctx-core/agent/fetch.reset__fetch} agent$ctx.reset
 * @param {module:ctx-core/agent/fetch.reset__fetch} agent$ctx.reset__fetch
 * @param {module:ctx-core/agent/fetch.reset__fetch__do} agent$ctx.reset__fetch__do
 * @param {module:ctx-core/agent/fetch.reset__fetch__set} agent$ctx.reset__fetch__set
 * @returns {module:ctx-core/agent/fetch~fetch__agent}
 */
export function fetch__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|fetch__agent`);
  return ensure__agent(ctx, {
    load: schedule__reset,
    reset: reset__fetch,
    reset__fetch: reset__fetch,
    reset__fetch__do: reset__fetch__do,
    reset__fetch__set: reset__fetch__set
  }, ...agent$ctx$$);
}
/**
 * Used to supply the {@link module:ctx-core/fetch/lib~fetch$ctx} to fetch.
 * Also reserved for future expansion.
 * @typedef {module:ctx-core/fetch/lib~fetch$ctx} reset$ctx
 */
/**
 * Resets the agent by fetching data from the http service.
 *
 * - @yield debounce
 *   - yes => @yield agent.{@link module:ctx-core/agent/fetch.reset__fetch__do}
 *   - no => @yield agent.{@link module:ctx-core/agent/fetch.reset__noop}
 * @returns {Promise<module:ctx-core/agent/fetch~fetch__agent>}
 */
export function *reset__fetch() {
  log(`${logPrefix}|reset__fetch`);
  const agent = this
      , key = agent.key
      , reset$ctx = clone(...arguments);
  let ctx = agent.ctx;
  yield debounce(ctx, {
    key: `${key}__reset__fetch`,
    no: function *() { agent.reset__noop(); },
    yes: function *() {
      yield agent.reset__fetch__do(reset$ctx);
    }
  });
  return agent;
}
/**
 * Performs {@link module:ctx-core/fetch/lib.fetch} to request & fetch data from HTTP services
 *
 * - @yield agent.{@link module:ctx-core/agent/fetch.reset__fetch__set}
 * @param {module:ctx-core/agent/fetch~reset$ctx} reset$ctx
 * @returns {Promise<module:ctx-core/agent/fetch~fetch__agent>}
 */
export function *reset__fetch__do(reset$ctx) {
  log(`${logPrefix}|reset__fetch__do`);
  const agent = this;
  try {
    return yield agent.reset__fetch__set(reset$ctx);
  } catch (error$ctx) {
    if (error$ctx.response && error$ctx.response.status === 404) {
      return yield agent.reset__clear();
    } else {
      throw__error(agent.ctx, error$ctx);
    }
  }
}
/**
 * fetch from HTTP service & agent.reset__set
 *
 * - @yield {@link module:ctx-core/fetch/lib.fetch}
 * - @yield agent.{@link module:ctx-core/agent/lib.reset__set}
 * @param reset$ctx
 * @returns {Promise<module:ctx-core/agent/fetch~fetch__agent>}
 */
export function *reset__fetch__set(reset$ctx) {
  log(`${logPrefix}|reset__fetch__set`);
  const agent = this
      , ctx = agent.ctx
      , fetch$ctx = reset$ctx
      , response$ctx = yield fetch(ctx, fetch$ctx);
  return yield agent.reset__set(response$ctx);
}