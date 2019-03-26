import { assign } from '@ctx-core/object'
import { __token__auth0 } from '@ctx-core/auth0/store'
import { __Auth0Lock, __AUTH0_CLIENT_ID, __AUTH0_DOMAIN, __logout__Auth0Lock } from './store'
import { throw__missing_argument } from '@ctx-core/error'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0-lock/lib.js'
export async function ensure__Auth0Lock(options) {
	log(`${logPrefix}|ensure__Auth0Lock`)
	if (get(__Auth0Lock)) return
	__Auth0Lock.set(_Auth0Lock(options))
	__logout__Auth0Lock.set(_logout__Auth0Lock())
}
export function _Auth0Lock(options) {
	log(`${logPrefix}|_Auth0Lock`)
	return new get(__Auth0Lock)(get(__AUTH0_CLIENT_ID), get(__AUTH0_DOMAIN), options)
}
function _logout__Auth0Lock() {
	log(`${logPrefix}|_logout__Auth0Lock`)
	return function () {
		return logout__Auth0Lock(...arguments)
	}
}
export async function logout__Auth0Lock(...ARR__opts) {
	log(`${logPrefix}|logout__Auth0Lock`)
	const Auth0Lock = get(__Auth0Lock)
	if (Auth0Lock) {
		const opts = assign({ client_id: get(__AUTH0_CLIENT_ID) }, ...ARR__opts)
		if (!opts.returnTo)
			throw__missing_argument({ key: 'opts.returnTo' })
		clear__token__auth0()
		Auth0Lock.logout(opts)
	}
}
/**
 * Ensures authenticated__Auth0Lock handler for `ctx.agent__access_token__auth0` and `ctx.agent__userinfo__auth0`
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {module:ctx-core/object/lib~ctx}
 * @TODO Reference Counting?
 */
export function ensure__authenticated__Auth0Lock({ __Auth0Lock }) {
	log(`${logPrefix}|ensure__authenticated__Auth0Lock`)
	if (!__Auth0Lock)
		throw__missing_argument(ctx, { key: '__Auth0Lock' })
	const unsubscribe__Auth0Lock = __Auth0Lock.subscribe('authenticated', __authenticated__Auth0Lock)
	function destroy() {
		log(`${logPrefix}|ensure__authenticated__Auth0Lock|destroy`)
		unsubscribe__Auth0Lock('authenticated', __authenticated__Auth0Lock)
	}
	async function __authenticated__Auth0Lock(token__auth0) {
		log(`${logPrefix}|ensure__authenticated__Auth0Lock|__authenticated__Auth0Lock`)
		__token__auth0.set(token__auth0)
	}
}