import { writable, derived, get } from 'svelte/store'
// @ts-ignore
import { subscribe__debug } from '@ctx-core/store'
import { assign, clone } from '@ctx-core/object'
import { _h1__present__a1 } from '@ctx-core/data'
import { _class } from '@ctx-core/html'
export const __scrollY__window = writable(null)
export function reset__scrollY__window() {
	__scrollY__window.set(window.scrollY)
}
export const __h1__body_class = writable({})
export const __h1__body_class__h0__or_a1 = writable({})
export function add__or_a1__body_class(class__, member) {
	const h1__body_class__h0__or_a1__ = get(__h1__body_class__h0__or_a1)
	const or_a1__ = h1__body_class__h0__or_a1__[class__]
	if (or_a1__ && or_a1__.indexOf(member) > -1) {
		return h1__body_class__h0__or_a1__
	}
	const or_a1 = or_a1__ ? or_a1__.slice : []
	or_a1.push(member)
	const h1__body_class__h0__or_a1 =
		clone(
			h1__body_class__h0__or_a1__,
			{
				[class__]: or_a1,
			}
		)
	__h1__body_class__h0__or_a1.set(h1__body_class__h0__or_a1)
	return h1__body_class__h0__or_a1
}
export function remove__or_a1__body_class(class__, member) {
	const h1__body_class__h0__or_a1__ = get(__h1__body_class__h0__or_a1)
	const or_a1__ = h1__body_class__h0__or_a1__[class__]
	const idx = or_a1__ && or_a1__.indexOf(member)
	if (typeof idx !== 'number' || idx === -1) {
		return h1__body_class__h0__or_a1__
	}
	const or_a1 = or_a1__.slice()
	or_a1.splice(idx, 1)
	const h1__body_class__h0__or_a1 =
		clone(
			h1__body_class__h0__or_a1__,
			{
				[member]: or_a1,
			}
		)
	__h1__body_class__h0__or_a1.set(h1__body_class__h0__or_a1)
	return h1__body_class__h0__or_a1
}
export const __class__body = derived([
		__h1__body_class__h0__or_a1,
		__h1__body_class,
	], ([
				h1__body_class__h0__or_a1,
				h1__body_class,
			]) => {
		const class__body = _class(
			assign(
				_h1__present__a1(h1__body_class__h0__or_a1),
				h1__body_class))
		return class__body
	}
)
