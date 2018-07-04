import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {agent__users__quovo} from 'ctx-core/quovo/agent.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-users-nav.mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	tag__assign(tag)
	const { ctx } = tag
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	function onmount() {
		log(`${logPrefix}|onmount`)
		agent__users__quovo(ctx)
			.on('change', __change__agent__users__quovo)
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		agent__users__quovo(ctx)
			.off('change', __change__agent__users__quovo)
	}
	function __change__agent__users__quovo() {
		log(`${logPrefix}|__change__agent__users__quovo`)
		tag.update()
	}
}