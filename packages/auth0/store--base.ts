import { derived, Readable, writable } from 'svelte/store'
// @ts-ignore
import { subscribe__debug } from '@ctx-core/store'
import { _has__dom } from '@ctx-core/dom'
import { Token } from '@ctx-core/jwt'
import { warn } from '@ctx-core/logger'
import { falsy } from '@ctx-core/function'
export type Token__auth0 = Token|falsy
export const __AUTH0_CLIENT_ID = writable(process.env.AUTH0_CLIENT_ID)
export const __AUTH0_DOMAIN = writable(process.env.AUTH0_DOMAIN)
export const __AUTH0_URL = writable(process.env.AUTH0_URL)
export const __json__token__auth0 =
	writable<string|falsy>((_has__dom() && localStorage.getItem('json__token__auth0')) || false)
export const __token__auth0__ =
	derived<Readable<string|falsy>, Token__auth0>(
		__json__token__auth0,
		json__token__auth0=>{
			if (json__token__auth0 && typeof json__token__auth0 === 'string') {
				try {
					return JSON.parse(json__token__auth0)
				} catch (e) {
					warn(e)
					json__token__auth0 = null
					setTimeout(
						()=>__json__token__auth0.set(json__token__auth0))
				}
			}
			return json__token__auth0
		})
export const __token__auth0 =
	derived<Readable<Token__auth0>, Token__auth0>(
		__token__auth0__,
		token__auth0=>
			(token__auth0 && token__auth0.error)
			? false
			: token__auth0 as Token)
export const __error__token__auth0 = writable(null)
export function clear__token__auth0(value:falsy = false) {
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
