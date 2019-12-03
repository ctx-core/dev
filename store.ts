import { writable, derived, get } from 'svelte/store'
import { subscribe } from '@ctx-core/store'
// @ts-ignore
import { subscribe__debug } from '@ctx-core/store'
import { _eql, _neql, _eq } from '@ctx-core/function'
import { I } from '@ctx-core/combinators'
import { _has__dom } from '@ctx-core/dom'
import { sync__localStorage } from '@ctx-core/local-storage'
import { validate__current__token__auth0 } from '.'
import { _exp__token__jwt } from '@ctx-core/jwt'
import { _waitfor__ratelimit__backoff__fibonacci } from '@ctx-core/fetch'
import { get__userinfo__auth0 } from './fetch'
import {
	__AUTH0_CLIENT_ID,
	__AUTH0_DOMAIN,
	__AUTH0_URL,
	__json__token__auth0,
	__token__auth0__,
	__token__auth0,
	__error__token__auth0,
	clear__token__auth0,
	logout__token__auth0,
	set__error__token__auth0,
} from './store--base'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0/store'
export {
	__AUTH0_CLIENT_ID,
	__AUTH0_DOMAIN,
	__AUTH0_URL,
	__json__token__auth0,
	__token__auth0__,
	__token__auth0,
	__error__token__auth0,
	clear__token__auth0,
	logout__token__auth0,
	set__error__token__auth0,
}
export const __txt__error__token__auth0 =
	derived(__error__token__auth0,
		error__token__auth0=>
			error__token__auth0
			? error__token__auth0.error_message || error__token__auth0.message
				? error__token__auth0.error_message || error__token__auth0.message
				: error__token__auth0.error_description
					? error__token__auth0.error_description
					: error__token__auth0.error
						? error__token__auth0.error
						: ''
			: '')
if (_has__dom()) {
	subscribe(__error__token__auth0,
		error__token__auth0=>{
			if (error__token__auth0) {
				open__login__auth0()
			}
		})
}
if (_has__dom()) {
	subscribe(__json__token__auth0,
		json__token__auth0=>{
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
	if (event.key === 'json__token__auth0') {
		log(`${logPrefix}|__storage__json__token__auth0`)
		__json__token__auth0.set(event.newValue)
	}
}
if (_has__dom()) {
	window.addEventListener('storage', __storage__json__token__auth0)
}
export function set__token__auth0(token__auth0) {
	__json__token__auth0.set(JSON.stringify(token__auth0))
}
function schedule__validate__current__token__auth0() {
	const token__auth0 = get(__token__auth0)
	const id_token = token__auth0 && token__auth0.id_token
	if (!id_token) return
	const exp__token__jwt = _exp__token__jwt(id_token)
	const now = Date.now()
	const millis__validate = now - exp__token__jwt
	setTimeout(
		async ()=>{
			try {
				await validate__current__token__auth0(token__auth0)
			} catch (error) {
				if (error.type === 'bad_credentials') {
					console.error(error)
					set__error__token__auth0(error)
					return
				}
				throw error
			}
		},
		millis__validate)
}
export const __token__auth0__userinfo__auth0 = writable(null)
export const __userinfo__auth0 = derived([
		__token__auth0,
		__token__auth0__userinfo__auth0,
	],
	(
		[
			token__auth0,
			token__auth0__userinfo__auth0
		],
		set
	)=>{
		let cancel
		(async ()=>{
			if (token__auth0 === token__auth0__userinfo__auth0) {
				return
			}
			if (!token__auth0) {
				set(_userinfo__auth0__no__token__auth0())
				return
			}
			set(token__auth0)
			const response =
				await _waitfor__ratelimit__backoff__fibonacci(get__userinfo__auth0)
			if (cancel) return
			if (!response.ok) {
				clear__token__auth0(false)
				set(false)
				return
			}
			const userinfo__auth0 = await response.json()
			set(userinfo__auth0)
		})()
		return () => cancel = true
		function _userinfo__auth0__no__token__auth0() {
			return (
				token__auth0 == null
				? null
				: false
			)
		}
	})
export const __ctx__userinfo__auth0 =
	derived([__userinfo__auth0, __token__auth0__userinfo__auth0],
		([userinfo__auth0, token__auth0__userinfo__auth0])=>(
			{
				userinfo__auth0,
				token__auth0__userinfo__auth0,
			}
		))
export const __email__auth0 =
	derived(__userinfo__auth0,
		(userinfo__auth0:{ email?:string })=>
			(userinfo__auth0 == false)
			? false
			: userinfo__auth0 && userinfo__auth0.email)
export const __email = __email__auth0
export const __is__loggedin__auth0 = derived(__token__auth0, _neql(false))
export const __is__loggedout__auth0 = derived(__token__auth0, _eql(false))
export const __opened__auth0 = writable(null)
export const __class__opened__auth0 = derived(__opened__auth0, I)
export const __closed__auth0 =
	derived(__opened__auth0, _eql(false))
export const __opened__login =
	derived(__opened__auth0,
		opened__auth0=>!opened__auth0 || opened__auth0 == 'login')
export const __opened__signup =
	derived(__opened__auth0, _eq('signup'))
export const __opened__forgot_password =
	derived(__opened__auth0, _eq('forgot_password'))
export const __opened__check_email__forgot_password =
	derived(__opened__auth0, _eq('check_email__forgot_password'))
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
export function clear__error__token__auth0() {
	set__error__token__auth0(null)
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
export function open__check_email__forgot_password__auth0() {
	log(`${logPrefix}|open__check_email__forgot_password__auth0`)
	__opened__auth0.set('check_email__forgot_password')
}
export function open__change_password__auth0() {
	log(`${logPrefix}|open__change_password__auth0`)
	__opened__auth0.set('change_password')
}
export function close__auth0() {
	log(`${logPrefix}|close__auth0`)
	__opened__auth0.set(false)
}
export const __msg__logout__auth0 = writable(null)
export function logout__auth0() {
	log(`${logPrefix}|logout__auth0`)
	logout__token__auth0()
	__msg__logout__auth0.set({
		time: Date.now()
	})
}
