import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {format__currency} from 'ctx-core/currency/lib.mjs'
import {tran_type$map} from 'ctx-core/quovo/lib.mjs'
import {agent__portfolio_history__quovo} from 'ctx-core/quovo/agent.mjs'
import {mount__currency} from 'ctx-core/currency/dom.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-history.mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	tag__assign(tag, {
		format__currency,
		tran_type$map: tran_type$map,
		registerElement: [
			'x-headers',
			'x-date',
			'quovo-tran-type',
			'x-market-code',
			'x-ticker',
			'x-ticker-name',
			'quovo-portfolio-history-quantity',
			'quovo-portfolio-history-value'
		]
	})
	const { ctx } = tag
	mount__currency(tag)
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	function onmount() {
		log(`${logPrefix}|onmount`)
		agent__portfolio_history__quovo(ctx)
			.on('change', __change__agent__portfolio_history__quovo)
		tag.update()
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		agent__portfolio_history__quovo(ctx)
			.off('change', __change__agent__portfolio_history__quovo)
	}
	function __change__agent__portfolio_history__quovo() {
		log(`${logPrefix}|__change__agent__portfolio_history__quovo`)
		tag.update()
	}
}