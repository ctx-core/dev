import {ensure__agent} from 'ctx-core/agent/lib.mjs'
import {agent__email} from 'ctx-core/email/agent'
import {_waitfor__ratelimit__backoff__fibonacci} from 'ctx-core/fetch/lib.mjs'
import {get__userinfo__auth0} from 'ctx-core/auth0/fetch.mjs'
import {__store__token__auth0} from 'ctx-core/auth0/store.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth0/agent.mjs'
export function agent__userinfo__auth0(ctx, ...array__opts) {
	let agent = ctx.agent__userinfo__auth0
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__userinfo__auth0',
		scope:
			[ 'userinfo__auth0',
				'token__auth0__userinfo__auth0'],
		init,
		reset
	}, ...array__opts)
	function init() {
		log(`${logPrefix}|agent__userinfo__auth0|init`)
		agent = this
		const {store} = ctx
		__store__token__auth0(store)
		store.on('state', ({changed}) => {
			if (changed.token__auth0) {
				agent.reset()
			}
		})
	}
	async function reset() {
		log(`${logPrefix}|agent__userinfo__auth0|reset`)
		const {token__auth0} = ctx
		if (token__auth0 === ctx.token__auth0__userinfo__auth0) {
			return
		}
		if (!token__auth0) {
			const userinfo__auth0__no__token__auth0 =
							_userinfo__auth0__no__token__auth0()
			agent.set(
				{ userinfo__auth0:
						userinfo__auth0__no__token__auth0})
			return
		}
		const token__auth0__userinfo__auth0 = token__auth0
		agent.set({token__auth0__userinfo__auth0})
		const response =
						await _waitfor__ratelimit__backoff__fibonacci(
							() => get__userinfo__auth0(ctx))
		if (!response.ok) {
			__store__token__auth0(ctx.store).clear(false)
			return
		}
		const userinfo__auth0 = await response.json()
		agent.set({userinfo__auth0})
		function _userinfo__auth0__no__token__auth0() {
			const userinfo__auth0__no__token__auth0 =
							token__auth0 == null
							? null
							: false
			return userinfo__auth0__no__token__auth0
		}
	}
}
export function agent__Auth0Lock(ctx, ...array__opts) {
	let agent = ctx.agent__Auth0Lock
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__Auth0Lock',
		scope:
			[ 'Auth0Lock',
				'logout__Auth0Lock']
	}, ...array__opts)
}
export function agent__email__auth0(ctx, ...array__opts) {
	let agent
	return agent__email(ctx, {
		init
	}, ...array__opts)
	function init() {
		log(`${logPrefix}|agent__email__auth0|init`)
		agent = this
		agent__userinfo__auth0(ctx).on('change',
			__change__agent__userinfo__auth0)
		refresh()
	}
	function __change__agent__userinfo__auth0() {
		log(`${logPrefix}|agent__email__auth0|__change__agent__userinfo__auth0`)
		refresh()
	}
	function refresh() {
		log(`${logPrefix}|agent__email__auth0|refresh`)
		const {userinfo__auth0} = ctx
				, email =
						(userinfo__auth0 == false)
						? false
						: userinfo__auth0
							&& userinfo__auth0.email
		agent.set({email})
	}
}
export function agent__auth0(ctx, ...array__opts) {
	let agent = ctx.agent__auth0
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__auth0',
		scope:
			[ 'view__auth0',
				'class__opened__auth0'],
		init,
		reset,
		open__login,
		open__signup,
		open__forgot_password,
		open__forgot_password__check_email,
		open__change_password,
		close,
		logout
	}, ...array__opts)
	function init() {
		log(`${logPrefix}|agent__auth0|init`)
		agent = this
		const {store} = ctx
		__store__token__auth0(store)
		agent__email__auth0(ctx).on('change',
			__change__agent__email)
		function __change__agent__email() {
			log(`${logPrefix}|agent__auth0|__change__agent__email`)
			agent.reset()
		}
	}
	function reset() {
		log(`${logPrefix}|agent__auth0|reset`)
		const {email} = ctx
				, view__auth0 =
						{ is__loggedin: !!email,
							is__loggedout:
								email != null
								&& !email,
							get opened__dialog() {
								return ctx.class__opened__auth0
							},
							get closed__dialog() {
								return !this.opened__dialog
							}
						}
				, class__opened__auth0__ = ctx.class__opened__auth0
				, class__opened__auth0 =
						email
						? false
						: ( class__opened__auth0__ == 'login'
								&& class__opened__auth0__ == 'signup')
							? class__opened__auth0__
							: class__opened__auth0__
								? 'login'
								: false
		agent.set(
			{ view__auth0
			, class__opened__auth0})
	}
	function open__login() {
		log(`${logPrefix}|agent__auth0|open__login`)
		agent.set({class__opened__auth0: 'login'})
	}
	function open__signup() {
		log(`${logPrefix}|agent__auth0|open__signup`)
		agent.set({class__opened__auth0: 'signup'})
	}
	function open__forgot_password() {
		log(`${logPrefix}|agent__auth0|open__forgot_password`)
		agent.set({class__opened__auth0: 'forgot_password'})
	}
	function open__forgot_password__check_email() {
		log(`${logPrefix}|agent__auth0|open__forgot_password__check_email`)
		agent.set({class__opened__auth0: 'forgot_password__check_email'})
	}
	function open__change_password() {
		log(`${logPrefix}|agent__auth0|open__change_password`)
		agent.set({class__opened__auth0: 'change_password'})
	}
	function close() {
		log(`${logPrefix}|agent__auth0|close`)
		agent.set({class__opened__auth0: false})
	}
	function logout() {
		log(`${logPrefix}|logout`)
		const {store} = ctx
		__store__token__auth0(store).logout__token__auth0()
	}
}
