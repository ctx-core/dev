import { assign } from '@ctx-core/object/lib.js'
import { __store__token__auth0 } from '@ctx-core/auth0/store.js'
import { __store__Auth0Lock } from './store.js'
import { throw__missing_argument } from '@ctx-core/error/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/auth0-lock/lib.js'
export async function ensure__Auth0Lock(store, options) {
	log(`${logPrefix}|ensure__Auth0Lock`)
	if (store.Auth0Lock) return store
	await __store__Auth0Lock(store)
	store.set({
		Auth0Lock: _Auth0Lock(store, options),
		logout__Auth0Lock: _logout__Auth0Lock(store)
	})
	return store
}
export function _Auth0Lock(store, options) {
	log(`${logPrefix}|$Auth0Lock`)
	return new Auth0Lock(store.get().AUTH0_CLIENT_ID, store.AUTH0_DOMAIN, options)
}
function _logout__Auth0Lock(store) {
	log(`${logPrefix}|$logout__Auth0Lock`)
	return function () {
		return logout__Auth0Lock(store, ...arguments)
	}
}
export async function logout__Auth0Lock(store, ...ARR__opts) {
	log(`${logPrefix}|logout__Auth0Lock`)
	const { Auth0Lock } = store.get()
	if (Auth0Lock) {
		await __store__token__auth0(store)
		const opts = assign({ client_id: store.AUTH0_CLIENT_ID }, ...ARR__opts)
		if (!opts.returnTo)
			throw__missing_argument(store.get(), { key: 'opts.returnTo' })
		store.clear__token__auth0()
		Auth0Lock.logout(opts)
	}
	return store
}
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
	async function __authenticated__Auth0Lock(token__auth0) {
		log(`${logPrefix}|ensure__authenticated__Auth0Lock|__authenticated__Auth0Lock`)
		const { store } = ctx
		await __store__token__auth0(store)
		store.set({ token__auth0 })
	}
}