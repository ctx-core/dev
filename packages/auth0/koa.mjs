import jwt from 'jsonwebtoken'
import { assign__ctx__env } from '@ctx-core/env/env.mjs'
import route__koa from 'koa-route'
import { _html__script__auth } from './html.mjs'
import { _token__jwt__authorization__header } from '@ctx-core/jwt/lib.mjs'
import {
	throw__bad_credentials,
	throw__bad_gateway
} from '@ctx-core/error/lib.mjs'
import { throw__response__fetch } from '@ctx-core/fetch/lib.mjs'
import { get__jwks__json } from './fetch.mjs'
import {
	patch__user__v2__auth0,
	get__user__v2__auth0,
	get__users_by_email__v2__auth0
} from './fetch.management.mjs'
import { info, debug, error, log } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/koa.mjs'
export default use__auth0
export function use__auth0(app) {
	log(`${logPrefix}|use__auth0`)
	app.use(route__koa.get('/auth', get__auth))
	app.use(route__koa.post('/auth/change_password',
		post__change_password__auth))
}
export async function get__auth(ctx) {
	log(`${logPrefix}|get__auth`)
	const html = _html__script__auth(ctx)
	ctx.body = html
}
/**
 * POST /auth/change_password
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {Promise<void>}
 * @see {@link https://auth0.com/docs/api-auth/tutorials/client-credentials}
 * @see {@link https://auth0.com/docs/api-auth/tutorials/client-credentials/customize-with-hooks}
 */
export async function post__change_password__auth(ctx) {
	log(`${logPrefix}|post__change_password__auth`)
	assign__ctx__env(ctx)
	const { AUTH0_DOMAIN } = ctx
	const user__password = await _user__password()
	if (!user__password) {
		validate__user(null, ctx__request)
		return
	}
	const { user_id } = user__password
	const { body } = ctx.request
	const { password } = body
	const ctx__request =
		{
			AUTH0_DOMAIN,
			user_id
		}
	const response =
		await patch__user__v2__auth0(
			ctx__request,
			{ password })
	const user = await response.json()
	validate__user(user, ctx__request)
	ctx.body = JSON.stringify({ status: 200 })
	async function _user__password() {
		const decoded__token__jwt = await _decoded__token__jwt__koa(ctx.headers.authorization)
		const user_id = _user_id(decoded__token__jwt)
		const response__user = await get__user__v2__auth0({ AUTH0_DOMAIN, user_id })
		const user__request = await response__user.json()
		const { email } = user__request
		if (!email) return
		if (is__username_password_authentication(user__request)) {
			return user__request
		}
		const response__users_by_email = await get__users_by_email__v2__auth0({ AUTH0_DOMAIN, email })
		const users = await response__users_by_email.json()
		for (let i = 0; i < users.length; i++) {
			const user = users[i]
			if (is__username_password_authentication(user)) return user
		}
	}
	function is__username_password_authentication(user) {
		return user.identities[0].connection == 'Username-Password-Authentication'
	}
}
export async function _user_id__jwt__verify(authorization) {
	const decoded__token__jwt = await _decoded__token__jwt__koa(authorization)
	const user_id = _user_id(decoded__token__jwt)
	return user_id
}
export function _user_id(decoded__token__jwt) {
	return (
		decoded__token__jwt
		&& (decoded__token__jwt.user_id
			|| decoded__token__jwt.sub)
	)
}
export async function _email__jwt__verify(authorization) {
	log(`${logPrefix}|_email__jwt__verify`)
	const decoded__token__jwt = await _decoded__token__jwt__koa(authorization)
	let email = decoded__token__jwt.email
	if (!email) {
		const user_id = _user_id(decoded__token__jwt)
		const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
		const ctx__request =
			{
				AUTH0_DOMAIN,
				user_id
			}
		const response = await get__user__v2__auth0(ctx__request)
		const user = await response.json()
		validate__user(user, ctx__request)
		email = user.email
	}
	return email
}
export function _decoded__token__jwt__koa(authorization) {
	log(`${logPrefix}|_decoded__token__jwt__koa`)
	const token__jwt = _token__jwt__authorization__header(authorization)
	if (!token__jwt) {
		throw__bad_credentials({})
	}
	return _decoded__token__jwt(token__jwt)
}
export async function _decoded__token__jwt(token__jwt) {
	log(`${logPrefix}|_decoded__token__jwt`)
	const cert__jwks = await _cert__jwks()
	const decoded__token__auth0 =
		jwt.verify(
			token__jwt,
			cert__jwks)
	return decoded__token__auth0
}
export async function _cert__jwks() {
	log(`${logPrefix}|_cert__jwks`)
	const x5c__jwks = await _x5c__jwks()
	const cert__jwks__ = x5c__jwks[0]
	const cert__jwks =
		['-----BEGIN CERTIFICATE-----',
			cert__jwks__,
			'-----END CERTIFICATE-----'
		].join('\n')
	return cert__jwks
}
export async function _x5c__jwks() {
	log(`${logPrefix}|_x5c__jwks`)
	const response = await get__jwks__json()
	if (!response.ok) {
		throw__response__fetch({}, response)
	}
	const jwks__json = await response.json()
	const { keys } = jwks__json
	const key = keys[0]
	const { x5c } = key
	return x5c
}
function validate__user(user, ctx__request) {
	if (user.error) {
		error(`${logPrefix}|validate__user`)
		error(`${user.statusCode} ${user.error}`)
		error(user.message)
		error(JSON.stringify(ctx__request, null, 2))
	}
	if (!user.user_id) {
		throw__bad_gateway(ctx__request, {
			status__http: user.statusCode
		})
	}
}
