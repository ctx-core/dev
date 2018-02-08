import env from 'ctx-core/auth0/env'
import {assign} from 'ctx-core/object/lib.mjs'
import {fetch} from 'ctx-core/fetch/lib'
import {$authorization__header__auth0__verify} from 'ctx-core/auth0/fetch'
import {post__token__oauth__auth0} from 'ctx-core/auth0/fetch'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/fetch.management.mjs'
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
export function patch__user__v2__auth0(ctx, form) {
  log(`${logPrefix}|patch__user__v2__auth0`)
  const {user_id} = ctx
      , AUTH0_DOMAIN =
          ctx.AUTH0_DOMAIN
          || env.AUTH0_DOMAIN
      , token__auth0 = $token__auth0__management(ctx)
      , authorization__header__auth0 =
          $authorization__header__auth0__verify({token__auth0})
      , url =
          `https://${AUTH0_DOMAIN}/api/v2/users/${user_id}`
      , promise =
          fetch(
            url,
            { method: 'PATCH',
              headers:
                { 'Content-Type': 'application/json',
                  'Authorization': authorization__header__auth0},
              body: JSON.stringify(form)})
  return promise
}
export async function get__user__v2__auth0(ctx) {
  log(`${logPrefix}|get__user__v2__auth0`)
  const {user_id} = ctx
      , AUTH0_DOMAIN =
          ctx.AUTH0_DOMAIN
          || env.AUTH0_DOMAIN
  const token__auth0 = await $token__auth0__management(ctx)
      , authorization__header__auth0 =
          $authorization__header__auth0__verify({token__auth0})
      , url =
          `https://${AUTH0_DOMAIN}/api/v2/users/${user_id}`
      , promise =
          fetch(
            url,
            { method: 'GET',
              headers:
                { 'Content-Type': 'application/json',
                  'Authorization': authorization__header__auth0}})
  return promise
}
async function $token__auth0__management(ctx) {
  const client_credentials__management =
          assign($client_credentials__management(ctx), {
            // scope: 'read:users'
          })
      , response =
          await post__token__oauth__auth0(
            ctx,
            client_credentials__management)
      , token__auth0 =
          await response.json()
  return token__auth0
}
export function $client_credentials__management(ctx) {
  const AUTH0_DOMAIN =
          ctx.AUTH0_DOMAIN
          || env.AUTH0_DOMAIN
      , AUTH0_MANAGEMENT_ID =
          ctx.AUTH0_MANAGEMENT_ID
          || env.AUTH0_MANAGEMENT_ID
      , AUTH0_MANAGEMENT_SECRET =
          ctx.AUTH0_MANAGEMENT_SECRET
          || env.AUTH0_MANAGEMENT_SECRET
      , client_credentials =
          { grant_type: 'client_credentials',
            client_id: AUTH0_MANAGEMENT_ID,
            client_secret: AUTH0_MANAGEMENT_SECRET,
            audience: `https://${AUTH0_DOMAIN}/api/v2/`}
  return client_credentials
}
