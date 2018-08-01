import { tag__assign } from '@ctx-core/riot/tag.mjs'
import { format__currency } from 'ctx-core/currency/lib.mjs'
import { agent__account__user__quovo } from 'ctx-core/quovo/agent.mjs'
import { path__account__user__quovo } from 'ctx-core/quovo/path.mjs'
import { mount__currency } from '@ctx-core/currency/dom.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-user-account-nav.mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	tag__assign(tag, {
		format__currency,
		path__account__user__quovo
	})
	const { ctx } = tag
	mount__currency(tag)
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	function onmount() {
		log(`${logPrefix}|onmount`)
		agent__account__user__quovo(ctx)
			.on('change', __change__agent__account__user__quovo)
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		agent__account__user__quovo(ctx)
			.off('change', __change__agent__account__user__quovo)
	}
	function __change__agent__account__user__quovo() {
		log(`${logPrefix}|__change__agent__account__user__quovo`)
		tag.update()
	}
}