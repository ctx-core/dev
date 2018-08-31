import { _mixin__store, compute } from '@ctx-core/store/lib.mjs'
import {
	mixin,
	_ctx__clear,
	_ctx__zip,
	set__false__if__null
} from '@ctx-core/object/lib.mjs'
import { sync__localStorage } from '@ctx-core/local-storage/agent.mjs'
import deepEqual from 'deep-equal'
import { _now__millis } from '@ctx-core/time/lib.mjs'
import { validate__current__token__auth0 } from './lib.mjs'
import { _exp__token__jwt } from '@ctx-core/jwt/lib.mjs'
import { _waitfor__ratelimit__backoff__fibonacci } from '@ctx-core/fetch/lib.mjs'
import { get__userinfo__auth0 } from './fetch.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/store.mjs'
export const __store__token__auth0 = _mixin__store('__store__token__auth0', async store => {
	__store__auth0(store)
	const scope = [
		'token__auth0',
		'json__token__auth0',
		'errors__token__auth0',
	]
	mixin(store, {
		reset__token__auth0() {
		},
		logout__token__auth0() {
			this.clear__token__auth0(false)
		},
		clear__token__auth0(value = false) {
			this.set(_ctx__clear(scope, value))
			sync__localStorage('json__token__auth0', null)
		},
		get token__auth0() {return this.get().token__auth0},
		get json__token__auth0() {return this.get().json__token__auth0},
		get errors__token__auth0() {return this.get().errors__token__auth0},
	})
	store.on('state', ({ changed, current }) => {
		if (changed.json__token__auth0 && !changed.token__auth0) {
			const { json__token__auth0 } = current
			if (json__token__auth0) {
				const token__auth0__ = JSON.parse(json__token__auth0)
				const { error } = token__auth0__
				if (error) {
					const errors__token__auth0 = { email: token__auth0__.error_description }
					store.set({
						json__token__auth0,
						errors__token__auth0,
						token__auth0: false
					})
					setTimeout(() => store.open__login__auth0())
				} else {
					store.set({
						token__auth0: token__auth0__,
						json__token__auth0,
						errors__token__auth0: null
					})
				}
			} else {
				store.clear__token__auth0(false)
			}
			sync__localStorage('json__token__auth0', json__token__auth0)
			schedule__validate__current__token__auth0()
		} else if (changed.token__auth0 && !changed.json__token__auth0) {
			const { token__auth0 } = current
			const json__token__auth0 = token__auth0 ? JSON.stringify(token__auth0) : null
			store.set({
				token__auth0,
				json__token__auth0,
				errors__token__auth0: null
			})
			sync__localStorage('json__token__auth0', json__token__auth0)
		}
	})
	const __set = {
		json__token__auth0: localStorage.getItem('json__token__auth0') || null
	}
	store.set(set__false__if__null(__set, 'json__token__auth0'))
	window.addEventListener('storage', __storage)
	return store.reset__token__auth0()
	function __storage(e) {
		log(`${logPrefix}|__store__token__auth0|__storage`)
		const { key } = e
		if (key === 'json__token__auth0') {
			const { newValue } = e
			const { token__auth0 } = store.get()
			if (!token__auth0 && !newValue) return
			const token__auth0__ = JSON.parse(newValue)
			if (!deepEqual(token__auth0, token__auth0__)) {
				const ctx__set = { token__auth0: token__auth0__ }
				store.set(ctx__set)
			}
		}
	}
	function schedule__validate__current__token__auth0() {
		const { token__auth0 } = store.get()
		const id_token = token__auth0 && token__auth0.id_token
		if (!id_token) return
		const exp__token__jwt = _exp__token__jwt(id_token)
		const now__millis = _now__millis()
		const millis__validate = now__millis - exp__token__jwt
		setTimeout(
			() => validate__current__token__auth0(ctx),
			millis__validate)
	}
})
export const __store__userinfo__auth0 = _mixin__store('__store__userinfo__auth0', async store => {
	__store__token__auth0(store)
	const scope = [
		'userinfo__auth0',
		'token__auth0__userinfo__auth0']
	mixin(store, {
		async reset__userinfo__auth0() {
			log(`${logPrefix}|reset__userinfo__auth0`)
			const { token__auth0 } = this.get()
			if (token__auth0 === this.token__auth0__userinfo__auth0) {
				return
			}
			if (!token__auth0) {
				const userinfo__auth0__no__token__auth0 = _userinfo__auth0__no__token__auth0()
				this.set({ userinfo__auth0: userinfo__auth0__no__token__auth0 })
				return
			}
			const token__auth0__userinfo__auth0 = token__auth0
			this.set({ token__auth0__userinfo__auth0 })
			const response =
				await _waitfor__ratelimit__backoff__fibonacci(
					() => get__userinfo__auth0(store))
			if (!response.ok) {
				store.clear__token__auth0(false)
				return
			}
			const userinfo__auth0 = await response.json()
			store.set({ userinfo__auth0 })
			function _userinfo__auth0__no__token__auth0() {
				const userinfo__auth0__no__token__auth0 =
					token__auth0 == null
					? null
					: false
				return userinfo__auth0__no__token__auth0
			}
		},
		get userinfo__auth0() {return this.get().userinfo__auth0},
		get token__auth0__userinfo__auth0() {return this.get().token__auth0__userinfo__auth0},
	})
	compute(store, {
		__userinfo__auth0: [
			scope,
			(...values) => _ctx__zip(scope, values)
		]
	})
	store.on('state', ({ changed }) => {
		if (changed.token__auth0) {
			store.reset__userinfo__auth0()
		}
	})
	return store.reset__userinfo__auth0()
})
export const __store__Auth0Lock = _mixin__store('__store__Auth0Lock', async store => {
	const scope = [
		'Auth0Lock',
		'logout__Auth0Lock',
		'AUTH0_CLIENT_ID',
		'AUTH0_DOMAIN',
	]
	mixin(store, {
		get Auth0Lock() {return this.get().Auth0Lock},
		get logout__Auth0Lock() {return this.get().logout__Auth0Lock},
		get AUTH0_CLIENT_ID() {return this.get().AUTH0_CLIENT_ID},
		get AUTH0_DOMAIN() {return this.get().AUTH0_DOMAIN},
	})
})
export const __store__email__auth0 = _mixin__store('__store__email__auth0', async store => {
	__store__userinfo__auth0(store)
	mixin(store, {
		reset__email__auth0() {
			log(`${logPrefix}|reset__email__auth0`)
			const { userinfo__auth0 } = this
			const email =
				(userinfo__auth0 == false)
				? false
				: userinfo__auth0
					&& userinfo__auth0.email
			this.set({ email })
			return this
		},
		get email() {return this.get().email}
	})
	store.on('state', ({ changed }) => {
		if (changed.__userinfo__auth0) {
			store.reset__email__auth0()
		}
	})
	return store.reset__email__auth0()
})
export const __store__auth0 = _mixin__store('__store__auth0', async store => {
	__store__token__auth0(store)
	__store__email__auth0(store)
	const scope__base = [
		'view__auth0',
		'class__opened__auth0'
	]
	mixin(store, {
		reset__auth0() {
			log(`${logPrefix}|reset__auth0`)
			const { email } = this
			const view__auth0 =
				{
					is__loggedin: !!email,
					is__loggedout: email != null && !email,
					get opened__dialog() {
						return store.class__opened__auth0
					},
					get closed__dialog() {
						return !this.opened__dialog
					}
				}
			const class__opened__auth0__ = this.class__opened__auth0
			const class__opened__auth0 =
				email
				? false
				: (class__opened__auth0__ == 'login'
					&& class__opened__auth0__ == 'signup')
					? class__opened__auth0__
					: class__opened__auth0__
						? 'login'
						: false
			this.set({
				view__auth0,
				class__opened__auth0
			})
		},
		set__errors__token__auth0(errors__token__auth0) {
			this.set({ errors__token__auth0 })
		},
		open__login__auth0() {
			log(`${logPrefix}|open__login__auth0`)
			this.set({ class__opened__auth0: 'login' })
		},
		open__signup__auth0() {
			log(`${logPrefix}|open__signup__auth0`)
			this.set({ class__opened__auth0: 'signup' })
		},
		open__forgot_password__auth0() {
			log(`${logPrefix}|open__forgot_password__auth0`)
			this.set({ class__opened__auth0: 'forgot_password' })
		},
		open__forgot_password__check_email__auth0() {
			log(`${logPrefix}|open__forgot_password__check_email__auth0`)
			this.set({ class__opened__auth0: 'forgot_password__check_email' })
		},
		open__change_password__auth0() {
			log(`${logPrefix}|open__change_password__auth0`)
			this.set({ class__opened__auth0: 'change_password' })
		},
		close__auth0() {
			log(`${logPrefix}|close__auth0`)
			this.set({ class__opened__auth0: false })
		},
		logout__auth0() {
			log(`${logPrefix}|logout__auth0`)
			this.logout__token__auth0()
			this.fire('logout__auth0')
		},
	})
	compute(store, {
		is__loggedin__auth0: [
			'view__auth0',
			view__auth0 => view__auth0 && view__auth0.is__loggedin
		],
		is__loggedout__auth0: [
			'view__auth0',
			view__auth0 => view__auth0 && view__auth0.is__loggedout
		]
	})
	store.on('state', ({ changed }) => {
		if (changed.email) {
			store.reset__auth0()
		}
	})
	return store.reset__auth0()
})