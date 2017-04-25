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
 * @param {function<id>} opts.lookup - lookup function to get data
 * @returns {*}
 */
export function ensure__lookup__agent(ctx, ...opts$$) {
  log(`${logPrefix}|ensure__lookup__agent`)
  const opts = clone(...opts$$)
      , {key, scope, lookup} = opts
  let agent
  return ensure__agent(ctx, {
    init,
    reset,
    ensure,
    lookup
  }, ...opts$$)
  function init() {
    log(`${logPrefix}|ensure__lookup__agent|init`, key)
    agent = this
  }
  async function reset() {
    log(`${logPrefix}|ensure__lookup__agent|reset`, key)
    const $ = {}
    $[scope] = {$: {}, ensure}
    agent.set($)
  }
  async function ensure(id) {
    log(`${logPrefix}|ensure__lookup__agent|ensure`, key)
    const $ = ctx[scope].$
    if (!$[id]) {
      $[id] = await lookup(id)
    }
    return $[id]
  }
}