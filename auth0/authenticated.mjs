import {throw__missing_argument} from 'ctx-core/error/lib'
import {tokens__auth0__agent} from 'ctx-core/auth0/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth/authenticated'
/**
 * Ensures authenticated__lock__auth0 handler for `ctx.access_token__auth0__agent` and `ctx.profile__auth0__agent`
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {module:ctx-core/object/lib~ctx}
 * @TODO Reference Counting?
 */
export function ensure__authenticated__lock__auth0(ctx) {
  log(`${logPrefix}|ensure__authenticated__lock__auth0`)
  if (!ctx.lock__auth0) throw__missing_argument(ctx, {key: 'ctx.lock__auth0'})
  tokens__auth0__agent(ctx)
  ctx.lock__auth0.on('authenticated', on$authenticated__lock__auth0)
  ctx.authenticated__lock__auth0 = {
    destroy
  }
  return ctx
  function destroy() {
    log(`${logPrefix}|ensure__authenticated__lock__auth0|destroy`)
    ctx.lock__auth0.off('authenticated', on$authenticated__lock__auth0)
    delete ctx.authenticated__lock__auth0
    return ctx
  }
  function on$authenticated__lock__auth0(authResult) {
    log(`${logPrefix}|ensure__authenticated__lock__auth0|on$authenticated__lock__auth0`)
    ctx.tokens__auth0__agent.set({tokens__auth0: authResult})
  }
}