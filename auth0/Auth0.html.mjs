import {call__offs} from 'ctx-core/observable/lib.mjs'
import {_assign__offs__svelte} from 'ctx-core/svelte/lib.mjs'
import {$$dom} from 'ctx-core/dom/lib.mjs'
import {post__signup__dbconnections__auth0
			, post__token__oauth__auth0
			, post__start__passwordless__auth0
			, post__change_password__auth
			, _body__password_realm
			, _body} from 'ctx-core/auth0/fetch.mjs'
import {agent__userinfo__auth0
			, agent__auth0
			, agent__token__auth0} from 'ctx-core/auth0/agent.mjs'
import {validate__signup
			, validate__forgot_password
			, validate__change_password} from 'ctx-core/auth0/lib.mjs'
import {log,warn,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth0/Auth0.html.mjs'
export function oncreate() {
	log(`${logPrefix}|oncreate`)
	const {ctx} = this.get()
	agent__token__auth0(ctx)
	_assign__offs__svelte(this,
		agent__auth0(ctx))
		.on(this.store, 'state',
			({changed, current}) => {
				if (changed.class__opened__auth0) {
					log(`${logPrefix}|onstate|class__opened__auth0`)
					const {class__opened__auth0} = current
					if (ctx.class__opened__auth0 != class__opened__auth0) {
						agent__auth0(ctx).set({
							class__opened__auth0
						})
					}
					schedule__clear__forms(this)
				}
			})
}
export function ondestroy() {
	log(`${logPrefix}|ondestroy`)
	const C = this
	call__offs(C)
}
export function __close(e, ctx) {
	log(`${logPrefix}|__close`)
	e.preventDefault()
	agent__auth0(ctx).close()
}
export function __submit__signup(e, ctx) {
	log(`${logPrefix}|__submit__signup`)
	e.preventDefault()
	const C = this
			, { email__signup
				, password__signup
				, password_confirmation__signup
				} = C.refs
			, email = email__signup.value
			, password = password__signup.value
			, password_confirmation =
					password_confirmation__signup.value
			, errors__token__auth0 =
					validate__signup({
						email,
						password,
						password_confirmation
					})
	if (errors__token__auth0) {
		C.set({errors__token__auth0})
		return false
	}
	signup(ctx, C, {
		email,
		password
	})
}
export function __submit__login(e, ctx) {
	log(`${logPrefix}|__submit__login`)
	e.preventDefault()
	const C = this
			, { username__login
				, password__login
				} = C.refs
			, username = username__login.value
			, password = password__login.value
	login(ctx, C, {username, password})
}
export async function __submit__forgot_password(e, ctx) {
	log(`${logPrefix}|__submit__forgot_password`)
	e.preventDefault()
	const C = this
			, {email__forgot_password} = C.refs
			, email = email__forgot_password.value
			, form =
					{ connection: 'email',
						send: 'link',
						email}
			, errors__token__auth0 =
					validate__forgot_password(form)
	if (errors__token__auth0) {
		C.set({errors__token__auth0})
		return
	}
	await post__start__passwordless__auth0(
		ctx,
		_body(ctx, form))
	agent__auth0(ctx).open__forgot_password__check_email()
}
export function __submit__change_password(e, ctx) {
	log(`${logPrefix}|__submit__change_password`)
	e.preventDefault()
	const C = this
			, { password__change_password
				, password_confirmation__change_password
				} = C.refs
			, password = password__change_password.value
			, password_confirmation =
					password_confirmation__change_password.value
			, errors__token__auth0 =
					validate__change_password(
						{ password,
							password_confirmation})
	if (errors__token__auth0) {
		C.set({errors__token__auth0})
		return false
	}
	change_password(ctx, C, {
		password
	})
}
async function signup(ctx, C, form) {
	log(`${logPrefix}|signup`)
	clear__errors(C)
	const response =
					await post__signup__dbconnections__auth0(
						ctx,
						_body__password_realm(ctx, form))
			, userinfo__auth0 = await response.json()
			, {statusCode} = userinfo__auth0
	if (statusCode) {
		const { code
					, description
					} = userinfo__auth0
				, email =
						code === 'user_exists'
						? 'This Email is already signed up'
						: description
				, errors__token__auth0 = {email}
		C.set({errors__token__auth0})
		return
	}
	agent__userinfo__auth0(ctx).set({userinfo__auth0})
	schedule__clear__forms(C)
	login(ctx, C, {
		username: form.email,
		password: form.password})
}
async function login(ctx, C, form) {
	log(`${logPrefix}|login`)
	clear__errors(C)
	const response =
					await post__token__oauth__auth0(
						ctx,
						_body__password_realm(ctx, form))
			, json__token__auth0 = await response.text()
	agent__token__auth0(ctx).set({json__token__auth0})
	const { token__auth0
				, errors__token__auth0
				} = ctx
	if (token__auth0) {
		schedule__clear__forms(C)
		agent__auth0(ctx).close()
	} else if (errors__token__auth0) {
		C.set({errors__token__auth0})
	}
}
async function change_password(ctx, C, form) {
	log(`${logPrefix}|change_password`)
	clear__errors(C)
	const {password} = form
	let error
	try {
		const response =
						await post__change_password__auth(ctx, password)
				, __json = await response.json()
		if (!response.ok) {
			if (response.status == 401) {
				agent__auth0(ctx).open__login()
				const errors__token__auth0 =
								{email: 'Authentication Error - Login'}
				C.set({errors__token__auth0})
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
		const errors__token__auth0 =
						{password: error}
		C.set({errors__token__auth0})
		return
	}
	schedule__clear__forms(C)
	agent__auth0(ctx).close()
}
function schedule__clear__forms(C) {
	const {root} = C.refs
	setTimeout(() => {
		log(`${logPrefix}|clear__forms`)
		clear__inputs($$dom('input[type=text]', root))
		clear__inputs($$dom('input[type=password]', root))
	}, 100)
}
function clear__inputs(inputs) {
	for (let i=0; i < inputs.length; i++) {
		const input = inputs[i]
		input.value = ''
	}
}
function clear__errors(C) {
	log(`${logPrefix}|clear__errors`)
	C.set({errors__token__auth0: false})
}