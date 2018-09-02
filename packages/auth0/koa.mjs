import { assign__ctx__env } from '@ctx-core/env/env.mjs'
import route__koa from 'koa-route'
import { _html__script__auth } from './html.mjs'
import { _user_id, validate__user } from './lib.mjs'
import { _decoded__token__jwt__koa } from './node.mjs'
import {
	patch__user__v2__auth0,
	get__user__v2__auth0,
	get__users_by_email__v2__auth0
} from './fetch.management.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
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
	const { user_id } = user__password
	const ctx__request = {
		AUTH0_DOMAIN,
		user_id
	}
	if (!user__password) {
		validate__user(null, ctx__request)
		return
	}
	const { body } = ctx.request
	const { password } = body
	const response = await patch__user__v2__auth0(ctx__request, { password })
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
