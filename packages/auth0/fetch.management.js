import { assign } from '@ctx-core/object/lib.js'
import { fetch } from '@ctx-core/fetch/lib.js'
import { get } from 'svelte/store.mjs'
import { __AUTH0_DOMAIN } from '@ctx-core/auth0/store.js'
import {
	_authorization__header__access_token__verify,
	post__token__oauth__auth0
} from './fetch.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/auth0/fetch.management.js'
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
export async function patch__user__v2__auth0(user_id, form) {
	log(`${logPrefix}|patch__user__v2__auth0`)
	const token__auth0 = await _token__auth0__management()
	const Authorization = _authorization__header__access_token__verify(token__auth0)
	const url = `https://${get(__AUTH0_DOMAIN)}/api/v2/users/${user_id}`
	const promise =
		fetch(
			url,
			{
				method: 'PATCH',
				headers:
					{
						'Content-Type': 'application/json',
						Authorization,
					},
				body: JSON.stringify(form)
			})
	return promise
}
export async function get__user__v2__auth0(store) {
	log(`${logPrefix}|get__user__v2__auth0`)
	const { user_id } = _ctx(store)
	const token__auth0 = await _token__auth0__management()
	const Authorization = _authorization__header__access_token__verify(token__auth0)
	const url = `https://${get(__AUTH0_DOMAIN)}/api/v2/users/${user_id}`
	const promise =
		fetch(
			url,
			{
				method: 'GET',
				headers:
					{
						'Content-Type': 'application/json',
						Authorization,
					}
			})
	return promise
}
export async function get__users_by_email__v2__auth0(store) {
	log(`${logPrefix}|get__users_by_email__v2__auth0`)
	const { email } = _ctx(store)
	const token__auth0 = await _token__auth0__management()
	const Authorization = _authorization__header__access_token__verify(token__auth0)
	const url = `https://${get(__AUTH0_DOMAIN)}/api/v2/users-by-email?email=${encodeURIComponent(email)}`
	const promise =
		fetch(
			url,
			{
				method: 'GET',
				headers:
					{
						'Content-Type': 'application/json',
						Authorization,
					}
			})
	return promise
}
async function _token__auth0__management() {
	const client_credentials__management =
		assign(_body__client_credentials__management(), {
			// scope: 'read:users'
		})
	const response = await post__token__oauth__auth0(client_credentials__management)
	return response.json()
}
export function _body__client_credentials__management() {
	const client_credentials = {
		grant_type: 'client_credentials',
		client_id: process.env.AUTH0_MANAGEMENT_ID,
		client_secret: process.env.AUTH0_MANAGEMENT_SECRET,
		audience: `https://${get(__AUTH0_DOMAIN)}/api/v2/`
	}
	return client_credentials
}
