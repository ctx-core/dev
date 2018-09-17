import { _user_id, validate__user } from '@ctx-core/auth0/lib.mjs'
import {
	get__user__v2__auth0,
	get__users_by_email__v2__auth0,
	patch__user__v2__auth0
} from '@ctx-core/auth0/fetch.management.mjs'
import { _decoded__token__jwt__koa } from '@ctx-core/auth0/node.mjs'
import { log } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/express.mjs'
export async function post__change_password__auth0(req, res) {
	log(`${logPrefix}|post__change_password__auth0`)
	const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
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
	const { body } = req
	const { password } = body
	const response = await patch__user__v2__auth0(ctx__request, { password })
	const user = await response.json()
	validate__user(user, ctx__request)
	res.end(JSON.stringify({ status: 200 }))
	async function _user__password() {
		const decoded__token__jwt = await _decoded__token__jwt__koa(req.headers['authorization'])
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