import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {agent__portfolio__quovo} from 'ctx-core/quovo/agent.mjs'
import {path__portfolio__account__user__quovo
			, path__portfolio_history__account__user__quovo} from 'ctx-core/quovo/path.mjs'
import {mount__currency} from 'ctx-core/currency/dom.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-nav..mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	tag__assign(tag, {
		path__portfolio__account__user__quovo,
		path__portfolio_history__account__user__quovo
	})
	const {ctx} = tag
	mount__currency(tag)
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	function onmount() {
		log(`${logPrefix}|onmount`)
		agent__portfolio__quovo(ctx)
			.on('change', __change__agent__portfolio__quovo)
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		agent__portfolio__quovo(ctx)
			.off('change', __change__agent__portfolio__quovo)
	}
	function __change__agent__portfolio__quovo() {
		log(`${logPrefix}|__change__agent__portfolio__quovo`)
		tag.update()
	}
}