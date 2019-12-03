import { assign } from '@ctx-core/object'
import { fetch } from '@ctx-core/fetch'
import { get } from 'svelte/store'
import { throw__unauthorized } from '@ctx-core/error'
import {
	_token__jwt__authorization__header,
	validate__current__jwt
} from '@ctx-core/jwt'
import {
	__AUTH0_CLIENT_ID,
	__AUTH0_DOMAIN,
	__AUTH0_URL,
	__token__auth0,
	set__error__token__auth0,
} from './store--base'
import { log, error } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0/fetch'
export async function get__jwks__json() {
	log(`${logPrefix}|get__jwks__json`)
	return fetch(`https://${get(__AUTH0_DOMAIN)}/.well-known/jwks.json`)
}
export function get__userinfo__auth0() {
	log(`${logPrefix}|get__userinfo__auth0`)
	const authorization = _authorization__header__access_token__verify(get(__token__auth0))
	return (
		fetch(
			`https://${get(__AUTH0_DOMAIN)}/userinfo`,
			{
				headers:
					{
						'Content-Type': 'application/json',
						authorization,
					}
			})
	)
}
export function post__signup__dbconnections__auth0(body) {
	log(`${logPrefix}|post__signup__dbconnections__auth0`)
	return (
		fetch(
			`https://${get(__AUTH0_DOMAIN)}/dbconnections/signup`,
			{
				method: 'POST',
				headers:
					{ 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
	)
}
export function post__start__passwordless__auth0(body) {
	log(`${logPrefix}|post__start__passwordless__auth0`)
	const {
		hostname,
		pathname
	} = window.location
	const redirect_uri = `https://${hostname}/auth?url__redirect=${pathname}`
	assign(body, { authParams: { redirect_uri } })
	return (
		fetch(
			`https://${get(__AUTH0_DOMAIN)}/passwordless/start`,
			{
				method: 'POST',
				headers:
					{ 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
	)
}
export async function post__change_password__auth(password) {
	log(`${logPrefix}|post__change_password__auth`)
	const body = { password }
	const Authorization = await _authorization__header__id_token__verify(get(__token__auth0))
	return (
		fetch(
			'/auth/change_password',
			{
				method: 'POST',
				headers:
					{
						'Content-Type': 'application/json',
						Authorization,
					},
				body: JSON.stringify(body)
			})
	)
}
export function post__change_password__dbconnections__auth0(body) {
	log(`${logPrefix}|post__change_password__dbconnections__auth0`)
	const promise =
		fetch(
			`https://${get(__AUTH0_DOMAIN)}/dbconnections/change_password`,
			{
				method: 'POST',
				headers:
					{ 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
	return promise
}
export function post__token__oauth__auth0(body) {
	log(`${logPrefix}|post__token__oauth__auth0`)
	return (
		fetch(`https://${get(__AUTH0_DOMAIN)}/oauth/token`, {
			method: 'POST',
			headers:
				{ 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		})
	)
}
export function _authorization__header__access_token__verify(token__auth0) {
	const authorization__header__access_token__auth0 =
		_authorization__header__access_token(token__auth0)
	if (!authorization__header__access_token__auth0) {
		throw__unauthorized({ token__auth0 }, {
			error_message: '_authorization__header__access_token__verify'
		})
	}
	return authorization__header__access_token__auth0
}
export function _authorization__header__access_token(token__auth0) {
	const authorization__header__access_token =
		_authorization__token__auth0__access_token()
		|| false
	return authorization__header__access_token
	function _authorization__token__auth0__access_token() {
		const token_type = token__auth0 && token__auth0.token_type
		const access_token = token__auth0 && token__auth0.access_token
		const authorization__token__auth0 =
			(token_type && access_token)
			? `${token_type} ${access_token}`
			: null
		return authorization__token__auth0
	}
}
export async function validate__current__token__auth0(token__auth0) {
	log(`${logPrefix}|validate__current__token__auth0`)
	const id_token = token__auth0 && token__auth0.id_token
	validate__current__jwt(id_token)
}
export async function _authorization__header__id_token__verify(token__auth0) {
	const authorization__header__id_token = _authorization__header__id_token(token__auth0)
	try {
		if (!authorization__header__id_token) {
			throw__unauthorized({ token__auth0 })
		}
		await validate__current__token__auth0(token__auth0)
		const token__jwt = _token__jwt__authorization__header(authorization__header__id_token)
		validate__current__jwt(token__jwt)
	} catch (err) {
		error(err)
		set__error__token__auth0(err)
		throw__unauthorized(err)
	}
	return authorization__header__id_token
}
function _authorization__header__id_token(token__auth0) {
	const token_type = token__auth0 && token__auth0.token_type
	const id_token = token__auth0 && token__auth0.id_token
	return (
		token_type && id_token
		? `${token_type} ${id_token}`
		: null
	)
}
export function _body__password_realm(...form) {
	const body__password_realm =
		_body(
			{
				grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
				realm: 'Username-Password-Authentication',
				connection: 'Username-Password-Authentication'
			},
			...form)
	return body__password_realm
}
export function _body(...form) {
	return assign({ client_id: get(__AUTH0_CLIENT_ID) }, ...form)
}
