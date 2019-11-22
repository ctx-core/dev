import { assign } from '@ctx-core/object'
import { get } from 'svelte/store'
// @ts-ignore
import { subscribe } from '@ctx-core/store'
import Auth0Lock from 'auth0-lock'
import { __token__auth0, clear__token__auth0 } from '@ctx-core/auth0/store'
import {
	__auth0Lock,
	__AUTH0_CLIENT_ID,
	__AUTH0_DOMAIN,
	__logout__Auth0Lock,
} from './store'
import { throw__missing_argument } from '@ctx-core/error'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0-lock/lib.js'
export async function ensure__auth0Lock(options) {
	log(`${logPrefix}|ensure__Auth0Lock`)
	if (get(__auth0Lock)) return
	__auth0Lock.set(_Auth0Lock(options))
	__logout__Auth0Lock.set(_logout__Auth0Lock())
}
export function _Auth0Lock(options) {
	return (
		new Auth0Lock(
			get(__AUTH0_CLIENT_ID),
			get(__AUTH0_DOMAIN),
			options,
		)
	)
}
function _logout__Auth0Lock() {
	log(`${logPrefix}|_logout__Auth0Lock`)
	return function () {
		return logout__Auth0Lock(...arguments)
	}
}
export async function logout__Auth0Lock(...a1__opts) {
	log(`${logPrefix}|logout__Auth0Lock`)
	const Auth0Lock = get(__auth0Lock)
	if (Auth0Lock) {
		const opts = assign({ client_id: get(__AUTH0_CLIENT_ID) }, ...a1__opts)
		if (!opts.returnTo)
			throw__missing_argument({ key: 'opts.returnTo' })
		clear__token__auth0()
		Auth0Lock.logout(opts)
	}
}
