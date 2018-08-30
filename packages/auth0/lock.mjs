import { assign } from '@ctx-core/object/lib.mjs'
import {
	__store__token__auth0,
	__store__Auth0Lock
} from './store.mjs'
import { throw__missing_argument } from '@ctx-core/error/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/lock.mjs'
export function ensure__Auth0Lock(store, options) {
	log(`${logPrefix}|ensure__Auth0Lock`)
	if (store.Auth0Lock) return store
	__store__Auth0Lock(store)
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
export function logout__Auth0Lock(store, ...ARR__opts) {
	log(`${logPrefix}|logout__Auth0Lock`)
	const { Auth0Lock } = store
	if (Auth0Lock) {
		__store__token__auth0(store)
		const opts = assign({ client_id: store.AUTH0_CLIENT_ID }, ...ARR__opts)
		if (!opts.returnTo)
			throw__missing_argument(store.get(), { key: 'opts.returnTo' })
		store.clear__token__auth0()
		Auth0Lock.logout(opts)
	}
	return store
}