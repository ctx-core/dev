import { assign } from '@ctx-core/object/lib.mjs'
import { fetch } from '@ctx-core/fetch/lib.mjs'
import { _ctx } from '@ctx-core/store/lib.mjs'
import { throw__unauthorized } from '@ctx-core/error/lib.mjs'
import {
	_token__jwt__authorization__header,
	validate__current__jwt
} from '@ctx-core/jwt/lib.mjs'
import { validate__current__token__auth0, _AUTH0_DOMAIN } from './lib.mjs'
import { log, error, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/fetch.mjs'
export async function get__jwks__json(store) {
	log(`${logPrefix}|get__jwks__json`)
	return fetch(`https://${_AUTH0_DOMAIN(store)}/.well-known/jwks.json`)
}
export function get__userinfo__auth0(store) {
	log(`${logPrefix}|get__userinfo__auth0`)
	const Authorization = _authorization__header__access_token__verify(store)
	return (
		fetch(
			`https://${_AUTH0_DOMAIN(store)}/userinfo`,
			{
				headers:
					{
						'Content-Type': 'application/json',
						Authorization
					}
			})
	)
}
export function post__signup__dbconnections__auth0(store, body) {
	log(`${logPrefix}|post__signup__dbconnections__auth0`)
	return (
		fetch(
			`https://${_AUTH0_DOMAIN(store)}/dbconnections/signup`,
			{
				method: 'POST',
				headers:
					{ 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
	)
}
export function post__start__passwordless__auth0(store, body) {
	log(`${logPrefix}|post__start__passwordless__auth0`)
	const {
		hostname,
		pathname
	} = window.location
	const redirect_uri = `https://${hostname}/auth?url__redirect=${pathname}`
	assign(body, { authParams: { redirect_uri } })
	return (
		fetch(
			`https://${_AUTH0_DOMAIN(store)}/passwordless/start`,
			{
				method: 'POST',
				headers:
					{ 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
	)
}
export async function post__change_password__auth(store, password) {
	log(`${logPrefix}|post__change_password__auth`)
	const body = { password }
	const Authorization = await _authorization__header__id_token__verify(store)
	return (
		fetch(
			'/auth/change_password',
			{
				method: 'POST',
				headers:
					{
						'Content-Type': 'application/json',
						Authorization
					},
				body: JSON.stringify(body)
			})
	)
}
export function post__change_password__dbconnections__auth0(store, body) {
	log(`${logPrefix}|post__change_password__dbconnections__auth0`)
	const promise =
		fetch(
			`https://${_AUTH0_DOMAIN(store)}/dbconnections/change_password`,
			{
				method: 'POST',
				headers:
					{ 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
	return promise
}
export function post__token__oauth__auth0(store, body) {
	log(`${logPrefix}|post__token__oauth__auth0`)
	return (
		fetch(
			`https://${_AUTH0_DOMAIN(store)}/oauth/token`,
			{
				method: 'POST',
				headers:
					{ 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})
	)
}
export function _authorization__header__access_token__verify(store) {
	const { token__auth0 } = _ctx(store)
	const authorization__header__access_token__auth0 =
		_authorization__header__access_token({ token__auth0 })
	if (!authorization__header__access_token__auth0) {
		throw__unauthorized({ token__auth0 }, {
			error_message: '_authorization__header__access_token__verify'
		})
	}
	return authorization__header__access_token__auth0
}
export function _authorization__header__access_token(store) {
	const { token__auth0 } = _ctx(store)
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
	function _authorization__koa() {
		const header = request && request.header
		const authorization__koa = header && header.authorization
		if (authorization__koa) return authorization__koa
	}
}
export async function _authorization__header__id_token__verify(store) {
	const { token__auth0 } = _ctx(store)
	const authorization__header__id_token = _authorization__header__id_token(store)
	if (!authorization__header__id_token) {
		throw__unauthorized({ token__auth0 })
	}
	await validate__current__token__auth0({ token__auth0 })
	const token__jwt = _token__jwt__authorization__header(authorization__header__id_token)
	try {
		validate__current__jwt(token__jwt)
	} catch (e) {
		error(e)
		store.logout__auth0()
		store.open__login__auth0()
		return false
	}
	return authorization__header__id_token
}
function _authorization__header__id_token(store) {
	const { token__auth0 } = _ctx(store)
	const token_type = token__auth0 && token__auth0.token_type
	const id_token = token__auth0 && token__auth0.id_token
	return (
		token_type && id_token
		? `${token_type} ${id_token}`
		: null
	)
}
export function _body__password_realm(store, ...form) {
	const body__password_realm =
		_body(
			store,
			{
				grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
				realm: 'Username-Password-Authentication',
				connection: 'Username-Password-Authentication'
			},
			...form)
	return body__password_realm
}
export function _body(store, ...form) {
	const body =
		assign(
			{ client_id: _ctx(store).AUTH0_CLIENT_ID },
			...form)
	return body
}
