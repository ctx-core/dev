import {throw__missing_argument} from 'ctx-core/error/lib'
import {accessToken__auth0__agent
      , profile__auth0__agent} from 'ctx-core/auth0/agent'
import {log,error__log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth/authenticated'
/**
 * Ensures authenticated__auth0 handler for `ctx.accessToken__auth0__agent` and `ctx.profile__auth0__agent`
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {module:ctx-core/object/lib~ctx}
 * @TODO Reference Counting?
 */
export function ensure__authenticated__auth0(ctx) {
  log(`${logPrefix}|ensure__authenticated__auth0`)
  if (!ctx.lock__auth0) throw__missing_argument(ctx, {key: 'ctx.lock__auth0'})
  accessToken__auth0__agent(ctx)
  profile__auth0__agent(ctx)
  ctx.lock__auth0.on('authenticated', on$authenticated__lock__auth0)
  ctx.authenticated__auth0 = {
    destroy
  }
  return ctx
  function destroy() {
    log(`${logPrefix}|ensure__authenticated__auth0|destroy`)
    ctx.lock__auth0.off('authenticated', on$authenticated__lock__auth0)
    delete ctx.authenticated__auth0
    return ctx
  }
  function on$authenticated__lock__auth0(authResult) {
    log(`${logPrefix}|ensure__authenticated__auth0|on$authenticated__lock__auth0`)
    const {accessToken} = authResult
    ctx.lock__auth0.getUserInfo(accessToken, (error, profile) => {
      log(`${logPrefix}|on$authenticated__lock__auth0|getUserInfo`, {profile})
      if (error) {
        error__log(`${logPrefix}|on$authenticated__lock__auth0|getUserInfo|error`, {error})
        ctx.accessToken__auth0__agent.set({accessToken__auth0: false})
        ctx.profile__auth0__agent.set({profile__auth0: false})
        return
      }
      ctx.accessToken__auth0__agent.set({accessToken__auth0: accessToken})
      ctx.profile__auth0__agent.set({profile__auth0: profile})
    })
  }
}