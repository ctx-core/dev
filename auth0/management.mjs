import {post__token__oauth__auth0} from 'ctx-core/auth0/fetch'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/management.mjs'

/**
 *
 * @param ctx
 * @returns {Promise<*>}
 * @see {@link https://auth0.com/docs/api-auth/tutorials/client-credentials}
 * @see {@link https://auth0.com/docs/api-auth/which-oauth-flow-to-use}
 * @see {@link https://auth0.com/docs/clients/client-grant-types}
 * @see {@link https://auth0.com/docs/api-auth/grant/authorization-code}
 * @see {@link https://auth0.com/docs/protocols/oauth2}
 */
export async function $token__auth0(ctx, credentials) {
  log(`${logPrefix}|$token__auth0`)
  const response =
          await post__token__oauth__auth0(ctx, credentials)
      , token__auth0 = await response.json()
  return token__auth0
}
export function $credentials__client_credentials(ctx) {
  const { AUTH0_DOMAIN
        , AUTH0_MANAGEMENT_ID
        , AUTH0_MANAGEMENT_SECRET
        } = ctx
      , client_credentials =
          { grant_type: 'client_credentials',
            client_id: AUTH0_MANAGEMENT_ID,
            client_secret: AUTH0_MANAGEMENT_SECRET,
            audience: `https://${AUTH0_DOMAIN}/api/v2/`}
  return client_credentials
}