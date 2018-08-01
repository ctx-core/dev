import { throw__missing_argument } from '@ctx-core/error/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth/authenticated.mjs'
/**
 * Ensures authenticated__Auth0Lock handler for `ctx.agent__access_token__auth0` and `ctx.agent__userinfo__auth0`
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {module:ctx-core/object/lib~ctx}
 * @TODO Reference Counting?
 */
export function ensure__authenticated__Auth0Lock(ctx) {
	log(`${logPrefix}|ensure__authenticated__Auth0Lock`)
	if (!ctx.Auth0Lock)
		throw__missing_argument(ctx, { key: 'ctx.Auth0Lock' })
	ctx.Auth0Lock.on('authenticated', __authenticated__Auth0Lock)
	ctx.authenticated__Auth0Lock = {
		destroy
	}
	return ctx
	function destroy() {
		log(`${logPrefix}|ensure__authenticated__Auth0Lock|destroy`)
		ctx.Auth0Lock.off('authenticated', __authenticated__Auth0Lock)
		delete ctx.authenticated__Auth0Lock
		return ctx
	}
	function __authenticated__Auth0Lock(authResult) {
		log(`${logPrefix}|ensure__authenticated__Auth0Lock|__authenticated__Auth0Lock`)
		__store__token__auth0(ctx.store).set({ token__auth0: authResult })
	}
}