import {clone} from 'ctx-core/object/lib.mjs'
import {ensure__agent__agents} from 'ctx-core/ctx/agent.mjs'
import {_store} from 'ctx-core/store/lib.mjs'
import {log,info,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/agent/svelte.mjs'
export function ensure__store(ctx, store) {
	log(`${logPrefix}|ensure__store`)
	if (ctx.store) return ctx
	store = store || _store(ctx)
	ctx.store = store
	bind__store__agent__agents(ctx, store)
	return ctx
}
export function bind__store__agent__agents(ctx, store) {
	ensure__agent__agents(ctx)
	ctx.agent__agents.on('ctx__change', __ctx__change__agent__agents)
	function __ctx__change__agent__agents(ctx__change) {
		log(`${logPrefix}|__ctx__change__agent__agents`, ctx__change)
		store.set(clone(ctx__change, {__from__agent__agents: true}))
	}
}