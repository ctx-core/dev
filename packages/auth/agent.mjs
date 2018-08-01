import { clear__core } from '@ctx-core/agent/lib.mjs'
import {
	load__ctx__localStorage,
	assign__ctx__localStorage,
	remove__ctx__localStorage
} from '@ctx-core/localStorage/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth/agent.mjs'
export function _ctx__agent__authentication(ctx) {
	log(`${logPrefix}|_ctx__agent__authentication`)
	let agent, scope__0
	return {
		init,
		authenticate,
		clear
	}
	function init() {
		log(`${logPrefix}|_ctx__agent__authentication|init`)
		agent = this
		scope__0 = agent.scope__0
		agent.set(load__ctx__localStorage())
	}
	async function authenticate(ctx__reset) {
		log(`${logPrefix}|_ctx__agent__authentication|authenticate`)
		await agent.reset(ctx__reset)
		let ctx__localStorage = {}
		ctx__localStorage[scope__0] = ctx[scope__0]
		assign__ctx__localStorage(ctx__localStorage)
		return ctx
	}
	function clear() {
		log(`${logPrefix}|_ctx__agent__authentication|clear`)
		remove__ctx__localStorage(scope__0)
		return clear__core.apply(agent, arguments)
	}
}
export const $ctx__agent__authentication = _ctx__agent__authentication
