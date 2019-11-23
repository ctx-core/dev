import { _has__dom } from '@ctx-core/dom'
import { tick } from '@ctx-core/function'
/**
 * @typedef HighlightJS
 */
/**
 * Calls `hljs.initHighlighting` in a DOM environment with dynamically loaded content.
 * @param {HighlightJS} hljs
 */
export function refresh__initHighlighting(hljs) {
	if (_has__dom()) {
		hljs.initHighlighting.called = false
		tick(hljs.initHighlighting)
	}
}