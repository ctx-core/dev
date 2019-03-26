import jwt from 'jsonwebtoken'
import { get__user__v2__auth0 } from './fetch.management.js'
import { get__jwks__json } from './fetch'
import { validate__user, _user_id } from './lib'
import { throw__response__fetch } from '@ctx-core/fetch'
import { _token__jwt__authorization__header } from '@ctx-core/jwt'
import { throw__bad_credentials } from '@ctx-core/error'
import { log, error } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0/node.js'
export async function _email__jwt__verify(authorization) {
	log(`${logPrefix}|_email__jwt__verify`)
	const decoded__token__jwt = await _decoded__token__jwt__koa(authorization)
	let email = decoded__token__jwt.email
	if (!email) {
		const user_id = _user_id(decoded__token__jwt)
		const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
		const ctx__request = {
			AUTH0_DOMAIN,
			user_id
		}
		const response = await get__user__v2__auth0({ AUTH0_DOMAIN })
		const user = await response.json()
		validate__user(user, ctx__request)
		email = user.email
	}
	return email
}
export async function _user_id__jwt__verify(authorization) {
	const decoded__token__jwt = await _decoded__token__jwt__koa(authorization)
	const user_id = _user_id(decoded__token__jwt)
	return user_id
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
	const decoded__token__auth0 = jwt.verify(token__jwt, cert__jwks)
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
