import env from 'ctx-core/auth0/env.mjs'
import {assign} from 'ctx-core/object/lib.mjs'
import {fetch} from 'ctx-core/fetch/lib.mjs'
import {_authorization__header__access_token__verify} from 'ctx-core/auth0/fetch.mjs'
import {post__token__oauth__auth0} from 'ctx-core/auth0/fetch.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth0/fetch.management.mjs'
/**
 *
 * @param store
 * @returns {Promise<*>}
 * @see {@link https://auth0.com/docs/api-auth/tutorials/client-credentials}
 * @see {@link https://auth0.com/docs/api-auth/which-oauth-flow-to-use}
 * @see {@link https://auth0.com/docs/clients/client-grant-types}
 * @see {@link https://auth0.com/docs/api-auth/grant/authorization-code}
 * @see {@link https://auth0.com/docs/protocols/oauth2}
 */
export async function patch__user__v2__auth0(store, form) {
	log(`${logPrefix}|patch__user__v2__auth0`)
	const {user_id} = store
			, AUTH0_DOMAIN =
					store.get().AUTH0_DOMAIN
					|| env.AUTH0_DOMAIN
			, token__auth0 = await _token__auth0__management(store)
			, Authorization =
					_authorization__header__access_token__verify({token__auth0})
			, url =
					`https://${AUTH0_DOMAIN}/api/v2/users/${user_id}`
			, promise =
					fetch(
						url,
						{ method: 'PATCH',
							headers:
								{ 'Content-Type': 'application/json',
									Authorization },
							body: JSON.stringify(form) })
	return promise
}
export async function get__user__v2__auth0(ctx) {
	log(`${logPrefix}|get__user__v2__auth0`)
	const { user_id } = ctx
			, AUTH0_DOMAIN =
					ctx.AUTH0_DOMAIN
					|| env.AUTH0_DOMAIN
			, token__auth0 = await _token__auth0__management(ctx)
			, Authorization =
				_authorization__header__access_token__verify({ token__auth0 })
			, url =
					`https://${AUTH0_DOMAIN}/api/v2/users/${user_id}`
			, promise =
					fetch(
						url,
						{ method: 'GET',
							headers:
								{ 'Content-Type': 'application/json',
									Authorization } })
	return promise
}
export async function get__users_by_email__v2__auth0(ctx) {
	log(`${logPrefix}|get__users_by_email__v2__auth0`)
	const { email } = ctx
			, AUTH0_DOMAIN =
					ctx.get().AUTH0_DOMAIN
					|| env.AUTH0_DOMAIN
			, token__auth0 = await _token__auth0__management(ctx)
			, Authorization =
					_authorization__header__access_token__verify({ token__auth0 })
			, url =
					`https://${AUTH0_DOMAIN}/api/v2/users-by-email?email=${encodeURIComponent(email)}`
			, promise =
					fetch(
						url,
						{ method: 'GET',
							headers:
								{ 'Content-Type': 'application/json',
									Authorization } })
	return promise
}
async function _token__auth0__management(ctx) {
	const client_credentials__management =
					assign(_body__client_credentials__management(ctx), {
						// scope: 'read:users'
					})
			, response = await post__token__oauth__auth0(ctx, client_credentials__management)
			, token__auth0 = await response.json()
	return token__auth0
}
export function _body__client_credentials__management(ctx) {
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
