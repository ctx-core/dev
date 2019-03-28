import { writable, derive, get } from 'svelte/store'
import { derive__spread } from '@ctx-core/store'
import { mixin__store__load, _reload__store } from '@ctx-core/store'
import { _andand } from '@ctx-core/function'
import { _has__dom } from '@ctx-core/dom'
import { _now__millis } from '@ctx-core/time'
import { sync__localStorage } from '@ctx-core/local-storage'
import deepEqual from 'deep-equal'
import { validate__current__token__auth0 } from './lib'
import { _exp__token__jwt } from '@ctx-core/jwt'
import { _waitfor__ratelimit__backoff__fibonacci } from '@ctx-core/fetch'
import { get__userinfo__auth0 } from './fetch'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0/store'
export const __AUTH0_CLIENT_ID = writable(process.env.AUTH0_CLIENT_ID)
export const __AUTH0_DOMAIN = writable(process.env.AUTH0_DOMAIN)
export const __AUTH0_URL = writable(process.env.AUTH0_URL)
export const __json__token__auth0 =
	writable((_has__dom() && localStorage.getItem('json__token__auth0')) || null)
export const __token__auth0__ =
	derive(
		__json__token__auth0,
		json__token__auth0 =>
			json__token__auth0
			&& (
				typeof json__token__auth0 === 'string'
				? JSON.parse(json__token__auth0)
				: json__token__auth0))
export const __token__auth0 =
	derive(
		__token__auth0__,
		token__auth0__ =>
			(token__auth0__ && !token__auth0__.error)
			? token__auth0__
			: null)
export const __errors__token__auth0 =
	derive(__token__auth0__, _andand('error'))
if (_has__dom()) {
	__errors__token__auth0.subscribe(errors__token__auth0 => {
		if (errors__token__auth0) {
			open__login__auth0()
		}
	})
}
if (_has__dom()) {
	__json__token__auth0.subscribe(
		json__token__auth0 => {
			if (json__token__auth0) {
				sync__localStorage('json__token__auth0', json__token__auth0)
				schedule__validate__current__token__auth0()
			} else {
				clear__token__auth0()
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
let unsubscribe__token__auth0__userinfo__auth0
export const __userinfo__auth0 = mixin__store__load(writable(), [], async () => {
	if (!unsubscribe__token__auth0__userinfo__auth0) {
		unsubscribe__token__auth0__userinfo__auth0 = __token__auth0.subscribe(_reload__store(__userinfo__auth0))
	}
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
})
export const __ctx__userinfo__auth0 =
	derive([__userinfo__auth0, __token__auth0__userinfo__auth0],
		([userinfo__auth0, token__auth0__userinfo__auth0]) => (
			{
				userinfo__auth0,
				token__auth0__userinfo__auth0,
			}
		))
export const __email__auth0 =
	derive(__userinfo__auth0,
		userinfo__auth0 =>
			(userinfo__auth0 == false)
			? false
			: userinfo__auth0 && userinfo__auth0.email)
export const __email = __email__auth0
export const __is__loggedin__auth0 =
	derive(__email__auth0, email__auth0 => !!email__auth0)
export const __is__loggedout__auth0 =
	derive(__email__auth0, email__auth0 => !email__auth0)
export const __class__opened__auth0 = writable()
let unsubscribe__email__auth0__class__opened__auth0
if (_has__dom()) {
	reload__email__auth0__class__opened__auth0()
}
export function reload__email__auth0__class__opened__auth0() {
	if (!unsubscribe__email__auth0__class__opened__auth0) {
		__email__auth0.subscribe(_reload__store(__class__opened__auth0))
	}
	const email__auth0 = get(__email__auth0)
	__class__opened__auth0.set(email__auth0 ? 'login' : false)
}
export function set__errors__token__auth0(errors__token__auth0) {
	__errors__token__auth0.set(errors__token__auth0)
}
export function open__login__auth0() {
	log(`${logPrefix}|open__login__auth0`)
	__class__opened__auth0.set('login')
}
export function open__signup__auth0() {
	log(`${logPrefix}|open__signup__auth0`)
	__class__opened__auth0.set('signup')
}
export function open__forgot_password__auth0() {
	log(`${logPrefix}|open__forgot_password__auth0`)
	__class__opened__auth0.set('forgot_password')
}
export function open__forgot_password__check_email__auth0() {
	log(`${logPrefix}|open__forgot_password__check_email__auth0`)
	__class__opened__auth0.set('forgot_password__check_email')
}
export function open__change_password__auth0() {
	log(`${logPrefix}|open__change_password__auth0`)
	__class__opened__auth0.set('change_password')
}
export function close__auth0() {
	log(`${logPrefix}|close__auth0`)
	__class__opened__auth0.set(false)
}
export const __MSG__logout__auth0 = writable()
export function logout__auth0() {
	log(`${logPrefix}|logout__auth0`)
	logout__token__auth0()
	__MSG__logout__auth0.set({
		time: _now__millis()
	})
}
