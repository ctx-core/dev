import {fetch} from 'ctx-core/fetch/lib'
import {throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/fetch'
export function get__userinfo__auth0(ctx) {
  log(`${logPrefix}|get__userinfo__auth0`)
  const {access_token__auth0} = ctx
  if (!access_token__auth0) throw__missing_argument(ctx, {
    key: 'ctx.access_token__auth0'
  })
  return fetch('https://censible.auth0.com/userinfo', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token__auth0}`
    }
  })
}