import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {format__currency} from 'ctx-core/currency/lib.mjs'
import {mount__currency} from 'ctx-core/currency/dom.mjs'
import {agent__route} from 'ctx-core/route/agent.mjs'
import {agent__user__quovo} from 'ctx-core/quovo/agent.mjs'
import {path__user__quovo
			, path__sync__user__quovo} from 'ctx-core/quovo/path.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-user-nav.mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	tag__assign(tag, {
		format__currency,
		path__user__quovo,
		path__sync__user__quovo,
		registerElement: [
			'quovo-user',
			'quovo-user-id',
			'quovo-user-username',
			'quovo-user-email',
			'quovo-user-value']})
	const {ctx} = tag
	mount__currency(tag)
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	function onmount() {
		log(`${logPrefix}|onmount`)
		agent__route(ctx).on('change',
			__change__agent__route)
		agent__user__quovo(ctx)
			.on('change', __change__agent__user__quovo)
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		agent__route(ctx).off('change',
			__change__agent__route)
		agent__user__quovo(ctx)
			.off('change', __change__agent__user__quovo)
	}
	function __change__agent__route() {
		log(`${logPrefix}|__change__agent__route`)
		tag.update()
	}
	function __change__agent__user__quovo() {
		log(`${logPrefix}|__change__agent__user__quovo`)
		tag.update()
	}
}