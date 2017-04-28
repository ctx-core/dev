import {clone} from 'ctx-core/object/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/lookup/agent'
/**
 *
 * @param {module:ctx-core/object/lib~ctx}
 * @param opts
 * @param opts.key - agent is stored on ctx[key]
 * @param opts.scope - agent's domain is ctx[...scope]
 * @param opts.scope__target - agent's target scope. ensure__ctx returns hash with scope__target as the key
 * @param {function<id>} opts.lookup - lookup function to get data
 * @returns {*}
 */
export function ensure__lookup__agent(ctx, ...opts$$) {
  log(`${logPrefix}|ensure__lookup__agent`)
  const opts = clone(...opts$$)
      , {key, lookup} = opts
  if (ctx[key]) return ctx[key]
  let agent, scope$0
  return ensure__agent(ctx, {
    init,
    reset,
    ensure,
    ensure__ctx,
    lookup
  }, opts)
  function init() {
    log(`${logPrefix}|ensure__lookup__agent|init`, key)
    agent = this
    scope$0 = agent.scope[0]
  }
  async function reset() {
    log(`${logPrefix}|ensure__lookup__agent|reset`, key)
    const $ = {}
    $[scope$0] = {cache: {}, promises: {}}
    agent.set($)
  }
  async function ensure(id, item) {
    log(`${logPrefix}|ensure__lookup__agent|ensure`, key)
    const {cache, promises} = ctx[scope$0]
    if (cache[id] == null) {
      if (item != null) {
        cache[id] = item
      } else if (promises[id] == null) {
        promises[id] = lookup(id)
      }
      cache[id] = await promises[id]
    }
    return cache[id]
  }
  async function ensure__ctx(id) {
    log(`${logPrefix}|ensure__ctx`)
    const {scope__target} = opts
        , value = await ensure(id)
        , $ = {}
    $[scope__target] = value
    return $
  }
}