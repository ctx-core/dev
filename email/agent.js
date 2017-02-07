import {ensure__agent} from 'ctx-core/agent/lib'
import {valid__email} from 'ctx-core/email/lib'
import {throw__invalid_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/email/agent'
export function email__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|email__agent`)
  let agent
  return ensure__agent(ctx, {
    key: 'email__agent',
    scope: ['email'],
    init,
    before__set
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|init`)
    agent = this
  }
  function before__set(set$ctx) {
    log(`${logPrefix}|before__set`)
    const {email} = set$ctx
    if (email && !valid__email(email)) {
      throw__invalid_argument(ctx, {
        key: 'email'
      })
    }
  }
}