import { derived, writable } from 'svelte/store'
// @ts-ignore
import { subscribe__debug } from '@ctx-core/store'
import { _has__dom } from '@ctx-core/dom'
import { warn } from '@ctx-core/logger'
export const __AUTH0_CLIENT_ID = writable(process.env.AUTH0_CLIENT_ID)
export const __AUTH0_DOMAIN = writable(process.env.AUTH0_DOMAIN)
export const __AUTH0_URL = writable(process.env.AUTH0_URL)
export const __json__token__auth0 =
	writable((_has__dom() && localStorage.getItem('json__token__auth0')) || false)
export const __token__auth0__ =
	derived(
		__json__token__auth0,
		json__token__auth0 => {
			if (json__token__auth0 && typeof json__token__auth0 === 'string') {
				try {
					return JSON.parse(json__token__auth0)
				} catch (e) {
					warn(e)
					json__token__auth0 = null
					setTimeout(
						() => __json__token__auth0.set(json__token__auth0))
				}
			}
			return json__token__auth0
		})
export const __token__auth0 =
	derived(
		__token__auth0__,
		token__auth0__ =>
			(token__auth0__ && token__auth0__.error)
			? false
			: token__auth0__)
export const __error__token__auth0 = writable(null)
export function clear__token__auth0(value = false) {
	__json__token__auth0.set(value)
}
export function logout__token__auth0() {
	clear__token__auth0(false)
}
export function set__error__token__auth0(error) {
	__error__token__auth0.set(error)
	if (error) {
		clear__token__auth0(false)
	}
}
