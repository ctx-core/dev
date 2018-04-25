/**
 * Agent methods for layers.
 * @module ctx-core/layer/agent
 */
import {
	clone__concat__array,
	last__array} from 'ctx-core/array/lib.mjs'
import {ensure__agent__array} from 'ctx-core/agent/array.mjs'
import {throw__invalid_state} from 'ctx-core/error/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const {isNaN} = Number
		, logPrefix = 'ctx-core/layer/agent.mjs'
export function agent__layers(ctx, ...array__opts) {
	let agent = ctx.agent__layers
	if (agent) return agent
	return ensure__agent__array(ctx, {
		key: 'agent__layers',
		scope: ['layers'],
		init,
		load,
		push,
		top,
		zIndex__top,
	}, ...array__opts)
	function init() {
		log(`${logPrefix}|agent__layers|init`)
		agent = this
		agent.zIndex__base =
			agent.zIndex__base || 0
	}
	function load() {
		log(`${logPrefix}|agent__layers|load`)
		if (agent.scope.every(scope__ => ctx[scope__])) return
		log(`${logPrefix}|agent__layers|load|load__array`)
		agent.load__array(...arguments)
	}
	function push(...array__layers) {
		log(`${logPrefix}|agent__layers|push`)
		const $layers = clone__concat__array(...array__layers)
		const {scope} = agent
		for (let i=0; i < scope.length; i++) {
			const scope__0 = scope[i]
					, layers = $layers[scope__0] || []
			for (let j=0; j < layers.length; j++) {
				const layer = layers[j]
						, {zIndex} = layer
						, zIndex__top = agent.zIndex__top()
				if (Number.isFinite(zIndex)) {
					if (zIndex__top != null && zIndex <= zIndex__top) {
						throw__invalid_state(ctx, {
							key: scope__0,
							reason: `zIndex must be greater than ctx.${agent.key}.zIndex__top('${scope__0}')`
						})
					}
				} else {
					layer.zIndex =
						isNaN(zIndex__top)
						? agent.zIndex__base
						: zIndex__top + 1
				}
			}
		}
		agent.push__agent__array($layers)
		return agent
	}
	function top(key) {
		log(`${logPrefix}|agent__layers|top`)
		key = key || agent.scope__0
		const layers = ctx[key]
		return last__array(layers)
	}
	function zIndex__top() {
		log(`${logPrefix}|agent__layers|zIndex__top`)
		const top = agent.top(...arguments)
		return top && top.zIndex
	}
}