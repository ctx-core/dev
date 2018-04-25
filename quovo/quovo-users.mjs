import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {format__currency} from 'ctx-core/currency/lib.mjs'
import {agent__users__quovo} from 'ctx-core/quovo/agent.mjs'
import {mount__currency} from 'ctx-core/currency/dom.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-users.mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	tag__assign(tag, {
		_value,
		format__currency,
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
		agent__users__quovo(ctx).on('change',
			__change__agent__users__quovo)
		tag.update()
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		agent__users__quovo(ctx).off('change',
			__change__agent__users__quovo)
	}
	function _value(value) {
		log(`${logPrefix}|$value`)
		return format__currency(value || 0)
	}
	function __change__agent__users__quovo() {
		log(`${logPrefix}|__change__agent__users__quovo`)
		tag.update()
	}
}