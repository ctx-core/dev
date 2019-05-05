import { _has__dom } from '@ctx-core/dom'
import { tick } from '@ctx-core/function'
export function refresh__initHighlighting(hljs) {
	if (_has__dom()) {
		hljs.initHighlighting.called = false
		tick(hljs.initHighlighting)
	}
}