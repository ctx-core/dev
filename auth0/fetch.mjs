import {assign} from 'ctx-core/object/lib.mjs'
import {fetch} from 'ctx-core/fetch/lib.mjs'
import {throw__unauthorized} from 'ctx-core/error/lib.mjs'
import {_token__jwt__authorization__header
			, validate__current__jwt} from 'ctx-core/jwt/lib.mjs'
import {validate__current__token__auth0} from 'ctx-core/auth0/lib.mjs'
import {log,error,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth0/fetch.mjs'
export async function get__jwks__json(ctx) {
	log(`${logPrefix}|get__jwks__json`)
	const {AUTH0_DOMAIN} = ctx
			, response =
					await fetch(
						`https://${AUTH0_DOMAIN}/.well-known/jwks.json`)
	return response
}
export function get__userinfo__auth0(ctx) {
	log(`${logPrefix}|get__userinfo__auth0`)
	const {AUTH0_DOMAIN} = ctx
			, Authorization =
					_authorization__header__access_token__verify(ctx)
			, promise =
					fetch(
						`https://${AUTH0_DOMAIN}/userinfo`,
						{ headers:
							{ 'Content-Type': 'application/json',
								Authorization}})
	return promise
}
export function post__signup__dbconnections__auth0(ctx, body) {
	log(`${logPrefix}|post__signup__dbconnections__auth0`)
	const {AUTH0_DOMAIN} = ctx
			, promise =
					fetch(
						`https://${AUTH0_DOMAIN}/dbconnections/signup`,
						{ method: 'POST',
							headers:
								{'Content-Type': 'application/json'},
							body: JSON.stringify(body)})
	return promise
}
export function post__start__passwordless__auth0(ctx, body) {
	log(`${logPrefix}|post__start__passwordless__auth0`)
	const { hostname
				, pathname
				} = window.location
			, {AUTH0_DOMAIN} = ctx
			, redirect_uri =
					`https://${hostname}/auth?url__redirect=${pathname}`
	assign(body, {authParams: {redirect_uri}})
	const promise =
					fetch(
						`https://${AUTH0_DOMAIN}/passwordless/start`,
						{ method: 'POST',
							headers:
								{'Content-Type': 'application/json'},
							body: JSON.stringify(body)})
	return promise
}
export function post__change_password__auth(ctx, password) {
	log(`${logPrefix}|post__change_password__auth`)
	const body = {password}
			, Authorization =
					_authorization__header__id_token__verify(ctx)
			, promise =
					fetch(
						'/auth/change_password',
						{ method: 'POST',
							headers:
								{ 'Content-Type': 'application/json',
									Authorization},
							body: JSON.stringify(body)})
	return promise
}
export function post__change_password__dbconnections__auth0(ctx, body) {
	log(`${logPrefix}|post__change_password__dbconnections__auth0`)
	const {AUTH0_DOMAIN} = ctx
			, promise =
					fetch(
						`https://${AUTH0_DOMAIN}/dbconnections/change_password`,
						{ method: 'POST',
							headers:
								{'Content-Type': 'application/json'},
							body: JSON.stringify(body)})
	return promise
}
export function post__token__oauth__auth0(ctx, body) {
	log(`${logPrefix}|post__token__oauth__auth0`)
	const {AUTH0_DOMAIN} = ctx
			, promise =
					fetch(
						`https://${AUTH0_DOMAIN}/oauth/token`,
						{ method: 'POST',
							headers:
								{'Content-Type': 'application/json'},
							body: JSON.stringify(body)})
	return promise
}
export function get__users__v2__auth0(ctx) {
	log(`${logPrefix}|get__users__v2__auth0`)
	const {AUTH0_DOMAIN} = ctx
			, Authorization =
					_authorization__header__access_token__verify(ctx)
			, url =
					`https://${AUTH0_DOMAIN}/api/v2/users`
			, promise =
					fetch(
						url,
						{ method: 'GET',
							headers:
								{ 'Content-Type': 'application/json',
									Authorization}})
	return promise
}
export function _authorization__header__access_token__verify(ctx) {
	const authorization__header__access_token__auth0 =
					_authorization__header__access_token(ctx)
	if (!authorization__header__access_token__auth0) {
		throw__unauthorized(ctx, {
			error_message: '_authorization__header__access_token__verify'
		})
	}
	return authorization__header__access_token__auth0
}
export function _authorization__header__access_token(ctx) {
	const authorization__header__access_token =
					_authorization__token__auth0__access_token(ctx)
					|| _authorization__koa()
					|| (ctx.request
							&& ctx.request.body
							&& _authorization__token__auth0__access_token(ctx.request.body))
					|| false
	return authorization__header__access_token
	function _authorization__token__auth0__access_token(ctx__) {
		const token__auth0 =
						ctx__
						&& ctx__.token__auth0
				, token_type =
						token__auth0
						&& token__auth0.token_type
				, access_token =
						token__auth0
						&& token__auth0.access_token
				, authorization__token__auth0 =
						(token_type && access_token)
						? `${token_type} ${access_token}`
						: null
		return authorization__token__auth0
	}
	function _authorization__koa() {
		const {request} = ctx
				, header = request && request.header
				, authorization__koa =
						header
						&& header.authorization
		if (authorization__koa) return authorization__koa
	}
}
export function _authorization__header__id_token__verify(ctx) {
	const authorization__header__id_token =
					_authorization__header__id_token(ctx)
	if (!authorization__header__id_token) {
		throw__unauthorized(ctx)
	}
	validate__current__token__auth0(ctx)
	const token__jwt =
					_token__jwt__authorization__header(
						authorization__header__id_token)
	try {
		validate__current__jwt(token__jwt)
	} catch (e) {
		error(e)
		return false
	}
	return authorization__header__id_token
}
function _authorization__header__id_token(ctx) {
	const authorization__header__auth0 =
					_authorization__token__auth0(ctx)
					|| _authorization__koa()
					|| (ctx.request
							&& ctx.request.body
							&& _authorization__token__auth0(ctx.request.body))
					|| false
	return authorization__header__auth0
	function _authorization__token__auth0(ctx__) {
		const token__auth0 =
						ctx__
						&& ctx__.token__auth0
				, token_type =
						token__auth0
						&& token__auth0.token_type
				, id_token =
						token__auth0
						&& token__auth0.id_token
				, authorization__header__id_token =
						(token_type && id_token)
						? `${token_type} ${id_token}`
						: null
		return authorization__header__id_token
	}
	function _authorization__koa() {
		const {request} = ctx
				, header = request && request.header
				, authorization__koa =
						header
						&& header.authorization
		if (authorization__koa) return authorization__koa
	}
}
export function _body__password_realm(ctx, ...form) {
	const body__password_realm =
					_body(
						ctx,
						{ grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
							realm: 'Username-Password-Authentication',
							connection: 'Username-Password-Authentication'},
						...form)
	return body__password_realm
}
export function _body(ctx, ...form) {
	const body =
					assign(
						{ client_id: ctx.AUTH0_CLIENT_ID},
						...form)
	return body
}
