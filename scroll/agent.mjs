import {clone} from 'ctx-core/object/lib.mjs'
import {ensure__agent} from 'ctx-core/agent/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/scroll/agent.mjs'
export function agent__active__Sticky__Scroll(ctx, ...array__opts) {
	let agent = ctx.agent__active__Sticky__Scroll
	if (agent) return agent
	return ensure__agent(ctx, {
		key: 'agent__active__Sticky__Scroll',
		scope: ['active__Sticky__Scroll'],
		init,
		reset,
		add,
		remove,
		_active,
		_match
	})
	function init() {
		log(`${logPrefix}|agent__active__Sticky__Scroll|init`)
		agent = this
		reset()
	}
	async function reset() {
		agent.set({active__Sticky__Scroll: {}})
	}
	function add(key) {
		log(`${logPrefix}|add`)
		const active__Sticky__Scroll = clone(ctx.active__Sticky__Scroll)
		active__Sticky__Scroll[key] = true
		agent.set({active__Sticky__Scroll})
	}
	function remove(key) {
		log(`${logPrefix}|remove`)
		const active__Sticky__Scroll = clone(ctx.active__Sticky__Scroll)
		active__Sticky__Scroll[key] = false
		agent.set({active__Sticky__Scroll})
	}
	function _active(key) {
		log(`${logPrefix}|_active`)
		const {active__Sticky__Scroll} = ctx
				, active =
						active__Sticky__Scroll
						? active__Sticky__Scroll[key]
						: false
		return active
	}
	function _match(key, active) {
		return !!(active) == !!(_active(key))
	}
}