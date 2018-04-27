import {assign} from 'ctx-core/object/lib.mjs'
import {agent__Auth0Lock} from 'ctx-core/auth0/agent.mjs'
import {__store__token__auth0} from 'ctx-core/auth0/store.mjs'
import {throw__missing_argument} from 'ctx-core/error/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth0/lock.mjs'
export function ensure__Auth0Lock(ctx, options) {
	log(`${logPrefix}|ensure__Auth0Lock`)
	if (ctx.Auth0Lock) return ctx
	agent__Auth0Lock(ctx).set({
		Auth0Lock: _Auth0Lock(ctx, options),
		logout__Auth0Lock: _logout__Auth0Lock(ctx)
	})
	return ctx
}
export function _Auth0Lock(ctx, options) {
	log(`${logPrefix}|$Auth0Lock`)
	return new Auth0Lock(ctx.AUTH0_CLIENT_ID, ctx.AUTH0_DOMAIN, options)
}
function _logout__Auth0Lock(ctx) {
	log(`${logPrefix}|$logout__Auth0Lock`)
	return function() {
		return logout__Auth0Lock(ctx, ...arguments)
	}
}
export function logout__Auth0Lock(ctx, ...array__opts) {
	log(`${logPrefix}|logout__Auth0Lock`)
	const {Auth0Lock} = ctx
	if (Auth0Lock) {
		const opts =
						assign(
							{client_id: ctx.AUTH0_CLIENT_ID},
							...array__opts)
		if (!opts.returnTo)
			throw__missing_argument(ctx, {key: 'opts.returnTo'})
		__store__token__auth0(ctx.store).clear__token__auth0()
		Auth0Lock.logout(opts)
	}
	return ctx
}