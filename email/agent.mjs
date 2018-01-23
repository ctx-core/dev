import {ensure__agent} from 'ctx-core/agent/lib'
import {valid__email} from 'ctx-core/email/lib'
import {throw__invalid_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/email/agent.mjs'
export function agent__email(ctx, ...array__opts) {
  let agent
  return ensure__agent(ctx, {
    key: 'agent__email',
    scope: ['email'],
    init,
    before__set
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__email|init`)
    agent = this
  }
  function before__set(ctx__set) {
    log(`${logPrefix}|before__set`)
    const scope__ = agent.scope[0]
        , email = ctx__set[scope__]
    if (email && !valid__email(email)) {
      throw__invalid_argument(ctx, {
        key: 'email'
      })
    }
  }
}