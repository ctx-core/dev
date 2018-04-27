import {_mixin__store} from 'ctx-core/store/lib.mjs'
import {mixin, _ctx__clear, set__false__if__null} from 'ctx-core/object/lib.mjs'
import {_ctx__set__from__localStorage
			, sync__localStorage} from 'ctx-core/localStorage/agent.mjs'
import deepEqual from 'deep-equal'
import {agent__auth0} from "./agent";
import {_now__millis} from "../time/lib";
import {validate__current__token__auth0	} from "./lib";
import {_exp__token__jwt} from "../jwt/lib";
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth0/store.mjs'
export const 	__store__token__auth0 = _mixin__store('__store__token__auth0', store => {
	const scope =
					[ 'token__auth0',
						'json__token__auth0',
						'errors__token__auth0']
	mixin(store, {
		logout__token__auth0() {
			store.clear__token__auth0(false)
		},
		clear__token__auth0(value=false) {
			store.set(_ctx__clear(scope, value))
			sync__localStorage('json__token__auth0', null)
		}
	})
	store.on('state', ({changed, current}) => {
		if (changed.json__token__auth0 && !changed.token__auth0) {
			const {json__token__auth0} = current
			if (json__token__auth0) {
				const token__auth0__ = JSON.parse(json__token__auth0)
						, {error} = token__auth0__
				if (error) {
					const errors__token__auth0 = {email: token__auth0__.error_description}
					store.set({
						json__token__auth0,
						errors__token__auth0,
						token__auth0: false
					})
					setTimeout(() => agent__auth0(ctx).open__login())
				} else {
					store.set({token__auth0: token__auth0__, json__token__auth0, errors__token__auth0: null})
				}
			} else {
				store.clear__token__auth0(false)
			}
			sync__localStorage('json__token__auth0', json__token__auth0)
			schedule__validate__current__token__auth0()
		} else if (changed.token__auth0 && !changed.json__token__auth0) {
			const {token__auth0} = current
			const json__token__auth0 = token__auth0 ? JSON.stringify(token__auth0) : null
			store.set({
				token__auth0,
				json__token__auth0,
				errors__token__auth0: null})
			sync__localStorage('json__token__auth0', json__token__auth0)
		}
	})
	const ctx__set = _ctx__set__from__localStorage('json__token__auth0')
	store.set(set__false__if__null(ctx__set, 'json__token__auth0'))
	window.addEventListener('storage', __storage)
	function __storage(e) {
		log(`${logPrefix}|__store__token__auth0|__storage`)
		const {key} = e
		if (key === 'json__token__auth0') {
			const {newValue} = e
					, {token__auth0} = store.get()
			if (!token__auth0 && !newValue) return
			const token__auth0__ = JSON.parse(newValue)
			if (!deepEqual(token__auth0, token__auth0__)) {
				const ctx__set = {token__auth0: token__auth0__}
				store.set(ctx__set)
			}
		}
	}
	function schedule__validate__current__token__auth0() {
		const {token__auth0} = store.get()
				, id_token =
						token__auth0
						&& token__auth0.id_token
		if (!id_token) return
		const exp__token__jwt = _exp__token__jwt(id_token)
				, now__millis = _now__millis()
				, millis__validate = now__millis - exp__token__jwt
		setTimeout(
			() => validate__current__token__auth0(ctx),
			millis__validate)
	}
})