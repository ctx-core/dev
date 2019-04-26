import { writable, derived, get } from 'svelte/store'
import { _has__dom } from '@ctx-core/dom'
import { _index__prev, _index__next } from '@ctx-core/array'
import { _a1__pathname__medium } from './fetch'
export const __a1__pathname__medium__source = writable()
export const __arr__pathname__medium__source = __a1__pathname__medium__source
if (_has__dom()) {
	reload__a1__pathname__medium__source()
}
export async function reload__a1__pathname__medium__source() {
	const a1__pathname__medium = await _a1__pathname__medium()
	__a1__pathname__medium__source.set(a1__pathname__medium)
}
export const __idx__pathname__medium = writable(0)
export const __a1__pathname__medium =
	derived(__a1__pathname__medium__source,
		a1__pathname__medium__source => a1__pathname__medium__source || [])
export const __pathname__medium = derived([
		__a1__pathname__medium,
		__idx__pathname__medium
	],
	([a1__pathname__medium, idx__pathname__medium]) =>
		a1__pathname__medium[idx__pathname__medium]
)
export function next__pathname__medium() {
	const { length } = get(__a1__pathname__medium)
	__idx__pathname__medium.update(
		idx__pathname__medium => _index__next(length, idx__pathname__medium)
	)
}
export function prev__pathname__medium() {
	const { length } = get(__a1__pathname__medium)
	__idx__pathname__medium.update(
		idx__pathname__medium => _index__prev(length, idx__pathname__medium)
	)
}
