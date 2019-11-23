import { onDestroy } from 'svelte'
import { get } from 'svelte/store'
import { __AUTH0_DOMAIN } from '@ctx-core/auth0/store'
import { _has__dom, __dom } from '@ctx-core/dom'
import { subscribe } from '@ctx-core/store'
import {
	close__auth0,
	set__error__token__auth0,
	clear__error__token__auth0,
} from '@ctx-core/auth0/store'
import {
	post__signup__dbconnections__auth0,
	post__token__oauth__auth0,
	post__start__passwordless__auth0,
	post__change_password__auth,
	_body__password_realm,
	_body
} from '@ctx-core/auth0/fetch'
import {
	__json__token__auth0,
	__userinfo__auth0,
	__class__opened__auth0,
	open__login__auth0,
	open__check_email__forgot_password__auth0,
	__error__token__auth0,
} from '@ctx-core/auth0/store'
import {
	validate__signup,
	validate__forgot_password,
	validate__change_password
} from '@ctx-core/auth0/validation'
import { log, warn, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0-ui/Auth0.svelte.js'
export async function onMount__auth0(root) {
	log(`${logPrefix}|onMount__auth0`)
	if (_has__dom()) {
		const unsubscribe =
			subscribe(__class__opened__auth0, () => schedule__clear__forms(root))
		onDestroy(unsubscribe)
	}
}
export function _onMount__auth0(root) {
  return () => onMount__auth0(root)
}
export async function __close(event) {
	log(`${logPrefix}|__close`)
	event.preventDefault()
	close__auth0()
}
export function __submit__signup(event, ctx) {
	log(`${logPrefix}|__submit__signup`)
	event.preventDefault()
	const {
		root,
		email__signup,
		password__signup,
		password_confirmation__signup,
	} = ctx
	const email = email__signup.value
	const password = password__signup.value
	const password_confirmation = password_confirmation__signup.value
	const error__token__auth0 =
		validate__signup({
			email,
			password,
			password_confirmation
		})
	if (error__token__auth0) {
		set__error__token__auth0(error__token__auth0)
		return false
	}
	signup(root,{
		email,
		password
	})
}
export function __submit__login(event, ctx) {
	log(`${logPrefix}|__submit__login`)
	event.preventDefault()
	const { root, username__login, password__login } = ctx
	const username = username__login.value
	const password = password__login.value
	login(root, { username, password })
}
export async function __submit__forgot_password(event, ctx) {
	log(`${logPrefix}|__submit__forgot_password`)
	event.preventDefault()
	const { email__forgot_password } = ctx
	const email = email__forgot_password.value
	const form =
		{
			connection: 'email',
			send: 'link',
			email
		}
	const error__token__auth0 = validate__forgot_password(form)
	if (error__token__auth0) {
		set__error__token__auth0(error__token__auth0)
		return
	}
	await post__start__passwordless__auth0(_body(form))
	open__check_email__forgot_password__auth0()
}
export function __submit__change_password(ctx) {
	log(`${logPrefix}|__submit__change_password`)
	const {
		root,
		password__change_password,
		password_confirmation__change_password
	} = ctx
	const password = password__change_password.value
	const password_confirmation = password_confirmation__change_password.value
	const error__token__auth0 =
		validate__change_password(
			{
				password,
				password_confirmation
			})
	if (error__token__auth0) {
		set__error__token__auth0(error__token__auth0)
		throw error__token__auth0
	}
	return change_password(root, { password })
}
async function signup(root, form) {
	log(`${logPrefix}|signup`)
	const response =
		await post__signup__dbconnections__auth0(_body__password_realm(form))
	const userinfo__auth0 = await response.json()
	const { statusCode } = userinfo__auth0
	if (statusCode) {
		const {
			code,
			description
		} = userinfo__auth0
		const email =
			code === 'user_exists'
			? 'This Email is already signed up'
			: description
		const error__token__auth0 = { email }
		set__error__token__auth0(error__token__auth0)
		return
	}
	__userinfo__auth0.set(userinfo__auth0)
	schedule__clear__forms(root)
	login(root,{
		username: form.email,
		password: form.password
	})
}
async function login(root, form) {
	log(`${logPrefix}|login`)
	const AUTH0_DOMAIN = get(__AUTH0_DOMAIN)
	const response =
		await post__token__oauth__auth0(
			{ AUTH0_DOMAIN, ..._body__password_realm(form) })
	if (response.ok) {
		const json__token__auth0 = await response.text()
		__json__token__auth0.set(json__token__auth0)
		schedule__clear__forms(root)
		close__auth0()
	} else {
		const error__token__auth0 = await response.json()
		__error__token__auth0.set(error__token__auth0)
		set__error__token__auth0(error__token__auth0)
	}
}
async function change_password(root, form) {
	log(`${logPrefix}|change_password`)
	const { password } = form
	let error
	try {
		const response = await post__change_password__auth(password)
		const __json = await response.json()
		if (!response.ok) {
			if (response.status == 401) {
				open__login__auth0()
				const error__token__auth0 = { email: 'Authentication Error - Log in' }
				set__error__token__auth0(error__token__auth0)
				return
			}
			error = __json.error || 'Error changing Password'
		}
	} catch (e) {
		warn(e)
		error = e.message
	}
	if (error) {
		const error__token__auth0 = { password: error }
		set__error__token__auth0(error__token__auth0)
		return
	}
	schedule__clear__forms(root)
	close__auth0()
}
function schedule__clear__forms(root) {
	setTimeout(() => {
		log(`${logPrefix}|clear__forms`)
		clear__error__token__auth0()
		clear__inputs(__dom('input[type=text]', root))
		clear__inputs(__dom('input[type=password]', root))
	}, 100)
}
function clear__inputs(inputs) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i]
		input.value = ''
	}
}
