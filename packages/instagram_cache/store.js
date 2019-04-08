import { writable, derive, get } from 'svelte/store'
import { _has__dom } from '@ctx-core/dom'
import { _index__prev, _index__next } from '@ctx-core/array'
import { _arr__pathname__medium } from './fetch'
export const __arr__pathname__medium__source = writable()
if (_has__dom()) {
	reload__arr__pathname__medium__source()
}
export async function reload__arr__pathname__medium__source() {
	const arr__pathname__medium = await _arr__pathname__medium()
	__arr__pathname__medium__source.set(arr__pathname__medium)
}
export const __idx__pathname__medium = writable(0)
export const __arr__pathname__medium =
	derive(__arr__pathname__medium__source,
		arr__pathname__medium__source => arr__pathname__medium__source || [])
export const __pathname__medium = derive([
		__arr__pathname__medium,
		__idx__pathname__medium
	],
	([arr__pathname__medium, idx__pathname__medium]) =>
		arr__pathname__medium[idx__pathname__medium]
)
export function next__pathname__medium() {
	const { length } = get(__arr__pathname__medium)
	__idx__pathname__medium.update(
		idx__pathname__medium => _index__next(length, idx__pathname__medium)
	)
}
export function prev__pathname__medium() {
	const { length } = get(__arr__pathname__medium)
	__idx__pathname__medium.update(
		idx__pathname__medium => _index__prev(length, idx__pathname__medium)
	)
}
