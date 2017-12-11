import {throw__missing_argument} from 'ctx-core/error/lib'
import {agent__tokens__auth0} from 'ctx-core/auth0/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth/authenticated'
/**
 * Ensures authenticated__lock__auth0 handler for `ctx.agent__access_token__auth0` and `ctx.agent__profile__auth0`
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {module:ctx-core/object/lib~ctx}
 * @TODO Reference Counting?
 */
export function ensure__authenticated__lock__auth0(ctx) {
  log(`${logPrefix}|ensure__authenticated__lock__auth0`)
  if (!ctx.lock__auth0)
    throw__missing_argument(ctx, {key: 'ctx.lock__auth0'})
  agent__tokens__auth0(ctx)
  ctx.lock__auth0.on('authenticated', onauthenticated__lock__auth0)
  ctx.authenticated__lock__auth0 = {
    destroy
  }
  return ctx
  function destroy() {
    log(`${logPrefix}|ensure__authenticated__lock__auth0|destroy`)
    ctx.lock__auth0.off('authenticated', onauthenticated__lock__auth0)
    delete ctx.authenticated__lock__auth0
    return ctx
  }
  function onauthenticated__lock__auth0(authResult) {
    log(`${logPrefix}|ensure__authenticated__lock__auth0|onauthenticated__lock__auth0`)
    ctx.agent__tokens__auth0.set({tokens__auth0: authResult})
  }
}