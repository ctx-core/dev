import { stringify as stringify__qs } from 'querystringify'
import { fetch } from '@ctx-core/fetch'
import { get } from 'svelte/store'
import { __AUTH0_DOMAIN } from '@ctx-core/auth0/store'
import {
	_authorization__header__access_token__verify,
	post__token__oauth__auth0,
} from '@ctx-core/auth0/fetch'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0-management/fetch.js'
type Params__get__client_grants__v2__auth0 = {
	query?:string
	json?:any
}
export async function get__client_grants__v2__auth0(
	params:Params__get__client_grants__v2__auth0
) {
	log(`${logPrefix}|get__client_grants__v2__auth0`)
	const {
		query,
		json,
	} = params
	const token__auth0 = await _token__auth0__management()
	const authorization = _authorization__header__access_token__verify(token__auth0)
	const url = `https://${get(__AUTH0_DOMAIN)}/api/v2/client-grants?${query || stringify__qs(json)}`
	return fetch(url, {
		method: 'GET',
		headers:
			{
				'Content-Type': 'application/json',
				authorization,
			},
	})
}
type Params__patch__client__v2__auth0 = {
	client_id?: string
	body?: string
	json?: any
}
export async function patch__client__v2__auth0(params: Params__patch__client__v2__auth0) {
	log(`${logPrefix}|patch__client__v2__auth0`)
	const {
		client_id = process.env.AUTH0_CLIENT_ID,
		body,
		json,
	} = params
	const token__auth0 = await _token__auth0__management()
	const authorization = _authorization__header__access_token__verify(token__auth0)
	const url = `https://${get(__AUTH0_DOMAIN)}/api/v2/clients/${client_id}`
	return fetch(url, {
		method: 'PATCH',
		headers:
			{
				'Content-Type': 'application/json',
				authorization,
			},
		body: body || JSON.stringify(json),
	})
}
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
	const authorization = _authorization__header__access_token__verify(token__auth0)
	const url = `https://${get(__AUTH0_DOMAIN)}/api/v2/users/${user_id}`
	return fetch(url, {
		method: 'PATCH',
		headers:
			{
				'Content-Type': 'application/json',
				authorization,
			},
		body: JSON.stringify(form),
	})
}
export async function get__user__v2__auth0({ AUTH0_DOMAIN, user_id }) {
	log(`${logPrefix}|get__user__v2__auth0`)
	const token__auth0 = await _token__auth0__management()
	const authorization = _authorization__header__access_token__verify(token__auth0)
	const url = `https://${AUTH0_DOMAIN}/api/v2/users/${user_id}`
	return fetch(url, {
		method: 'GET',
		headers:
			{
				'Content-Type': 'application/json',
				authorization,
			},
	})
}
type Params__get__users_by_email__v2__auth0 = {
	email: string
}
export async function get__users_by_email__v2__auth0(params: Params__get__users_by_email__v2__auth0) {
	log(`${logPrefix}|get__users_by_email__v2__auth0`)
	const { email } = params
	const token__auth0 = await _token__auth0__management()
	const authorization = _authorization__header__access_token__verify(token__auth0)
	const url = `https://${get(__AUTH0_DOMAIN)}/api/v2/users-by-email?email=${encodeURIComponent(email)}`
	return fetch(url, {
		method: 'GET',
		headers:
			{
				'Content-Type': 'application/json',
				authorization,
			},
	})
}
async function _token__auth0__management() {
	const client_credentials__management = _body__client_credentials__management()
	const response = await post__token__oauth__auth0(client_credentials__management)
	return response.json()
}
export function _audience() {
	return `https://${get(__AUTH0_DOMAIN)}/api/v2/`
}
export function _body__client_credentials__management() {
	return {
		grant_type: 'client_credentials',
		client_id: process.env.AUTH0_MANAGEMENT_ID,
		client_secret: process.env.AUTH0_MANAGEMENT_SECRET,
		audience: _audience(),
	}
}
