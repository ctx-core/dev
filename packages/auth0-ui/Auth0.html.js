import { onDestroy } from 'svelte'
import { __token__auth0, __AUTH0_DOMAIN } from '@ctx-core/auth0/store'
import { _has__dom, __dom } from '@ctx-core/dom'
import { close__auth0, set__errors__token__auth0 } from '@ctx-core/auth0/store'
import {
	post__signup__dbconnections__auth0,
	post__token__oauth__auth0,
	post__start__passwordless__auth0,
	post__change_password__auth,
	_body__password_realm,
	_body
} from './fetch'
import {
	__json__token__auth0,
	__userinfo__auth0,
	__class__opened__auth0,
	open__login__auth0,
	open__forgot_password__check_email__auth0,
	__errors__token__auth0,
} from './store'
import {
	validate__signup,
	validate__forgot_password,
	validate__change_password
} from './lib'
import { log, warn, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0-ui/Auth0.html.js'
export async function onMount__auth0() {
	log(`${logPrefix}|onMount__auth0`)
	if (_has__dom()) {
		const unsubscribe = __class__opened__auth0.subscribe(schedule__clear__forms)
		onDestroy(unsubscribe)
	}
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
		email__signup,
		password__signup,
		password_confirmation__signup
	} = ctx
	const email = email__signup.value
	const password = password__signup.value
	const password_confirmation = password_confirmation__signup.value
	const errors__token__auth0 =
		validate__signup({
			email,
			password,
			password_confirmation
		})
	if (errors__token__auth0) {
		set__errors__token__auth0(errors__token__auth0)
		return false
	}
	signup({
		email,
		password
	})
}
export function __submit__login(event, ctx) {
	log(`${logPrefix}|__submit__login`)
	event.preventDefault()
	const { username__login, password__login } = ctx
	const username = username__login.value
	const password = password__login.value
	login({ username, password })
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
	const errors__token__auth0 = validate__forgot_password(form)
	if (errors__token__auth0) {
		set__errors__token__auth0(errors__token__auth0)
		return
	}
	await post__start__passwordless__auth0(_body(form))
	open__forgot_password__check_email__auth0()
}
export function __submit__change_password(event, ctx) {
	log(`${logPrefix}|__submit__change_password`)
	event.preventDefault()
	const {
		root,
		password__change_password,
		password_confirmation__change_password
	} = ctx
	const password = password__change_password.value
	const password_confirmation = password_confirmation__change_password.value
	const errors__token__auth0 =
		validate__change_password(
			{
				password,
				password_confirmation
			})
	if (errors__token__auth0) {
		set__errors__token__auth0(errors__token__auth0)
		return false
	}
	change_password(root, { password })
}
async function signup(form) {
	log(`${logPrefix}|signup`)
	clear__errors(this)
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
		const errors__token__auth0 = { email }
		set__errors__token__auth0(errors__token__auth0)
		return
	}
	__userinfo__auth0.set(userinfo__auth0)
	schedule__clear__forms(this)
	login({
		username: form.email,
		password: form.password
	})
}
async function login(form) {
	log(`${logPrefix}|login`)
	const AUTH0_DOMAIN = get(__AUTH0_DOMAIN)
	clear__errors(this)
	const response =
		await post__token__oauth__auth0(
			{ AUTH0_DOMAIN },
			_body__password_realm(form))
	const json__token__auth0 = await response.text()
	__json__token__auth0.set(json__token__auth0)
	if (get(__token__auth0)) {
		schedule__clear__forms(this)
		close__auth0()
	} else {
		const errors__token__auth0 = get(__errors__token__auth0)
		if (errors__token__auth0) {
			set__errors__token__auth0(errors__token__auth0)
		}
	}
}
async function change_password(root, form) {
	log(`${logPrefix}|change_password`)
	clear__errors()
	const { password } = form
	let error
	try {
		const response = await post__change_password__auth(password)
		const __json = await response.json()
		if (!response.ok) {
			if (response.status == 401) {
				open__login__auth0()
				const errors__token__auth0 = { email: 'Authentication Error - Login' }
				set__errors__token__auth0(errors__token__auth0)
				return
			}
			error = __json.error || 'Error changing Password'
		}
	} catch (e) {
		warn(e)
		error = e.message
	}
	if (error) {
		const errors__token__auth0 = { password: error }
		set__errors__token__auth0(errors__token__auth0)
		return
	}
	schedule__clear__forms(root)
	close__auth0()
}
function schedule__clear__forms(root) {
	setTimeout(() => {
		log(`${logPrefix}|clear__forms`)
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
function clear__errors() {
	log(`${logPrefix}|clear__errors`)
	set__errors__token__auth0(false)
}