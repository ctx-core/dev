import { call__offs } from '@ctx-core/observable/lib.mjs'
import { _assign__offs__svelte } from '@ctx-core/svelte/lib.mjs'
import { __dom } from '@ctx-core/dom/lib.mjs'
import {
	post__signup__dbconnections__auth0,
	post__token__oauth__auth0,
	post__start__passwordless__auth0,
	post__change_password__auth,
	_body__password_realm,
	_body
} from './fetch.mjs'
import {
	__store__token__auth0,
	__store__userinfo__auth0,
	__store__auth0
} from './store.mjs'
import {
	validate__signup,
	validate__forgot_password,
	validate__change_password
} from './lib.mjs'
import { log, warn, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/Auth0.html.mjs'
export async function oncreate() {
	log(`${logPrefix}|oncreate`)
	const { store } = this
	await Promise.all([
		__store__token__auth0(store),
		__store__auth0(store),
	])
	_assign__offs__svelte(this)
		.on(store, 'state',
			({ changed, current }) => {
				if (changed.class__opened__auth0) {
					log(`${logPrefix}|onstate|class__opened__auth0`)
					const { class__opened__auth0 } = current
					if (store.get().class__opened__auth0 != class__opened__auth0) {
						store.set({ class__opened__auth0 })
					}
					schedule__clear__forms(this)
				}
			})
}
export function ondestroy() {
	log(`${logPrefix}|ondestroy`)
	call__offs(this)
}
export async function __close(e) {
	log(`${logPrefix}|__close`)
	e.preventDefault()
	const { store } = this
	await __store__auth0(store)
	store.close__auth0()
}
export function __submit__signup(e) {
	log(`${logPrefix}|__submit__signup`)
	e.preventDefault()
	const { refs, store } = this
	const {
		email__signup,
		password__signup,
		password_confirmation__signup
	} = refs
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
		store.set__errors__token__auth0(errors__token__auth0)
		return false
	}
	signup.call(this, {
		email,
		password
	})
}
export function __submit__login(e) {
	log(`${logPrefix}|__submit__login`)
	e.preventDefault()
	const {
		username__login,
		password__login
	} = this.refs
	const username = username__login.value
	const password = password__login.value
	login.call(this, { username, password })
}
export async function __submit__forgot_password(e, AUTH0_DOMAIN) {
	log(`${logPrefix}|__submit__forgot_password`)
	e.preventDefault()
	const { store } = this
	const { email__forgot_password } = this.refs
	const email = email__forgot_password.value
	const form =
		{
			connection: 'email',
			send: 'link',
			email
		}
	const errors__token__auth0 = validate__forgot_password(form)
	if (errors__token__auth0) {
		store.set__errors__token__auth0(errors__token__auth0)
		return
	}
	await post__start__passwordless__auth0(AUTH0_DOMAIN, _body(store, form))
	this.store.open__forgot_password__check_email__auth0()
}
export function __submit__change_password(e) {
	log(`${logPrefix}|__submit__change_password`)
	e.preventDefault()
	const { refs, store } = this
	const {
		password__change_password,
		password_confirmation__change_password
	} = refs
	const password = password__change_password.value
	const password_confirmation = password_confirmation__change_password.value
	const errors__token__auth0 =
		validate__change_password(
			{
				password,
				password_confirmation
			})
	if (errors__token__auth0) {
		store.set__errors__token__auth0(errors__token__auth0)
		return false
	}
	change_password.call(this, { password })
}
async function signup(form) {
	log(`${logPrefix}|signup`)
	clear__errors(this)
	const { store } = this
	await __store__userinfo__auth0(store)
	const { AUTH0_DOMAIN } = store.get()
	const response = await post__signup__dbconnections__auth0(AUTH0_DOMAIN, _body__password_realm(store, form))
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
		store.set__errors__token__auth0(errors__token__auth0)
		return
	}
	store.set({ userinfo__auth0 })
	schedule__clear__forms(this)
	login.call(this, {
		username: form.email,
		password: form.password
	})
}
async function login(form) {
	log(`${logPrefix}|login`)
	const { store } = this
	await Promise.all([
		__store__token__auth0(store),
		__store__auth0(store),
	])
	const { AUTH0_DOMAIN } = store.get()
	clear__errors(this)
	const response = await post__token__oauth__auth0(AUTH0_DOMAIN, _body__password_realm(store, form))
	const json__token__auth0 = await response.text()
	store.set({ json__token__auth0 })
	const {
		token__auth0,
		errors__token__auth0
	} = store.get()
	if (token__auth0) {
		schedule__clear__forms(this)
		store.close__auth0()
	} else if (errors__token__auth0) {
		store.set__errors__token__auth0(errors__token__auth0)
	}
}
async function change_password(form) {
	log(`${logPrefix}|change_password`)
	const { store } = this
	await __store__auth0(store)
	clear__errors(this)
	const { password } = form
	let error
	try {
		const response = await post__change_password__auth(store.get(), password)
		const __json = await response.json()
		if (!response.ok) {
			if (response.status == 401) {
				store.open__login__auth0()
				const errors__token__auth0 = { email: 'Authentication Error - Login' }
				store.set__errors__token__auth0(errors__token__auth0)
				return
			}
			error =
				__json.error
				|| 'Error changing Password'
		}
	} catch (e) {
		warn(e)
		error = e.message
	}
	if (error) {
		const errors__token__auth0 = { password: error }
		store.set__errors__token__auth0(errors__token__auth0)
		return
	}
	schedule__clear__forms(this)
	store.close__auth0()
}
function schedule__clear__forms(C) {
	const { root } = C.refs
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
function clear__errors(C) {
	log(`${logPrefix}|clear__errors`)
	const { store } = C
	store.set__errors__token__auth0(false)
}