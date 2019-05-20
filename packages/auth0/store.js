import { writable, derived, get } from 'svelte/store'
import { subscribe, subscribe__debug } from '@ctx-core/store'
import { _eql, _neql, _eq, tick } from '@ctx-core/function'
import { I } from '@ctx-core/combinators'
import { _has__dom } from '@ctx-core/dom'
import { _now__millis } from '@ctx-core/time'
import { sync__localStorage } from '@ctx-core/local-storage'
import deepEqual from 'deep-equal'
import { validate__current__token__auth0 } from '.'
import { _exp__token__jwt } from '@ctx-core/jwt'
import { _waitfor__ratelimit__backoff__fibonacci } from '@ctx-core/fetch'
import { get__userinfo__auth0 } from './fetch'
import { log, warn, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0/store'
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
					tick(() => __json__token__auth0.set(json__token__auth0))
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
export const __error__token__auth0 = writable()
if (_has__dom()) {
	subscribe(__error__token__auth0,
		error__token__auth0 => {
			if (error__token__auth0) {
				open__login__auth0()
			}
		})
}
if (_has__dom()) {
	subscribe(__json__token__auth0,
		json__token__auth0 => {
			if (json__token__auth0 == null) {
				clear__token__auth0()
				return
			}
			sync__localStorage('json__token__auth0', json__token__auth0)
			if (json__token__auth0) {
				schedule__validate__current__token__auth0()
			}
		}
	)
}
function __storage__json__token__auth0(event) {
	log(`${logPrefix}|__storage__json__token__auth0`)
	const { key } = event
	if (key === 'json__token__auth0') {
		const { newValue } = event
		const token__auth0 = get(__token__auth0)
		if (!token__auth0 && !newValue) return
		const token__auth0__ = JSON.parse(newValue)
		if (!deepEqual(token__auth0, token__auth0__)) {
			__token__auth0.set(token__auth0__)
		}
	}
}
if (_has__dom()) {
	window.addEventListener('storage', __storage__json__token__auth0)
}
export function clear__token__auth0(value = false) {
	__json__token__auth0.set(false)
}
export function set__token__auth0(token__auth0) {
	__json__token__auth0.set(JSON.stringify(token__auth0))
}
function schedule__validate__current__token__auth0() {
	const token__auth0 = get(__token__auth0)
	const id_token = token__auth0 && token__auth0.id_token
	if (!id_token) return
	const exp__token__jwt = _exp__token__jwt(id_token)
	const now__millis = _now__millis()
	const millis__validate = now__millis - exp__token__jwt
	setTimeout(
		() => validate__current__token__auth0(token__auth0),
		millis__validate)
}
export function logout__token__auth0() {
	clear__token__auth0(false)
}
export const __token__auth0__userinfo__auth0 = writable()
export const __userinfo__auth0 = writable()
if (_has__dom()) {
	subscribe(__token__auth0, reload__userinfo__auth0)
	reload__userinfo__auth0()
}
export async function reload__userinfo__auth0() {
	const token__auth0 = get(__token__auth0)
	if (token__auth0 === get(__token__auth0__userinfo__auth0)) {
		return
	}
	if (!token__auth0) {
		__userinfo__auth0.set(_userinfo__auth0__no__token__auth0())
		return
	}
	__token__auth0__userinfo__auth0.set(token__auth0)
	const response =
		await _waitfor__ratelimit__backoff__fibonacci(get__userinfo__auth0)
	if (!response.ok) {
		clear__token__auth0(false)
		return
	}
	const userinfo__auth0 = await response.json()
	__userinfo__auth0.set(userinfo__auth0)
	function _userinfo__auth0__no__token__auth0() {
		return (
			token__auth0 == null
			? null
			: false
		)
	}
}
export const __ctx__userinfo__auth0 =
	derived([__userinfo__auth0, __token__auth0__userinfo__auth0],
		([userinfo__auth0, token__auth0__userinfo__auth0]) => (
			{
				userinfo__auth0,
				token__auth0__userinfo__auth0,
			}
		))
export const __email__auth0 =
	derived(__userinfo__auth0,
		userinfo__auth0 =>
			(userinfo__auth0 == false)
			? false
			: userinfo__auth0 && userinfo__auth0.email)
export const __email = __email__auth0
export const __is__loggedin__auth0 = derived(__email__auth0, _neql(false))
export const __is__loggedout__auth0 = derived(__email__auth0, _eql(false))
export const __opened__auth0 = writable()
export const __class__opened__auth0 = derived(__opened__auth0, I)
export const __opened__login =
	derived(__opened__auth0,
		opened__auth0 => !opened__auth0 || opened__auth0 == 'login')
export const __opened__signup = derived(__opened__auth0, _eq('signup'))
export const __opened__forgot_password =
	derived(__opened__auth0, _eq('forgot_password'))
export const __opened__forgot_password__check_email =
	derived(__opened__auth0, _eq('forgot_password__check_email'))
export const __opened__change_password =
	derived(__opened__auth0, _eq('change_password'))
let unsubscribe__reload__opened__auth0
if (_has__dom()) {
	reload__opened__auth0()
}
export function reload__opened__auth0() {
	if (!unsubscribe__reload__opened__auth0) {
		unsubscribe__reload__opened__auth0 = true
		unsubscribe__reload__opened__auth0 =
			subscribe(__email__auth0, reload__opened__auth0)
		return
	}
	const email__auth0 = get(__email__auth0)
	__opened__auth0.set(email__auth0 ? false : 'login')
}
export function set__error__token__auth0(error) {
	__error__token__auth0.set(error)
}
export function open__login__auth0() {
	log(`${logPrefix}|open__login__auth0`)
	__opened__auth0.set('login')
}
export function open__signup__auth0() {
	log(`${logPrefix}|open__signup__auth0`)
	__opened__auth0.set('signup')
}
export function open__forgot_password__auth0() {
	log(`${logPrefix}|open__forgot_password__auth0`)
	__opened__auth0.set('forgot_password')
}
export function open__forgot_password__check_email__auth0() {
	log(`${logPrefix}|open__forgot_password__check_email__auth0`)
	__opened__auth0.set('forgot_password__check_email')
}
export function open__change_password__auth0() {
	log(`${logPrefix}|open__change_password__auth0`)
	__opened__auth0.set('change_password')
}
export function close__auth0() {
	log(`${logPrefix}|close__auth0`)
	__opened__auth0.set(false)
}
export const __MSG__logout__auth0 = writable()
export function logout__auth0() {
	log(`${logPrefix}|logout__auth0`)
	logout__token__auth0()
	__MSG__logout__auth0.set({
		time: _now__millis()
	})
}
