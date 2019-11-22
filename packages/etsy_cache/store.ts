import { writable, derived } from 'svelte/store'
import { _andand } from '@ctx-core/function'
import {
	_a1__listing__etsy__s3,
	_a1__images__listing__etsy__s3,
} from './fetch'
import { _has__dom } from '@ctx-core/dom'
export const __a1__listing__etsy__s3__loading = writable(null)
if (_has__dom()) {
	reload__a1__listing__etsy__s3__loading()
}
export const __arr__listing__etsy__s3__loading = __a1__listing__etsy__s3__loading
export async function reload__a1__listing__etsy__s3__loading() {
	const arr__listing__etsy__s3 = await _a1__listing__etsy__s3()
	__a1__listing__etsy__s3__loading.set(arr__listing__etsy__s3)
}
export const reload__arr__listing__etsy__s3__loading = reload__a1__listing__etsy__s3__loading
export const __a1__images__listing__etsy__s3__loading = writable(null)
export const __arr__images__listing__etsy__s3__loading = __a1__images__listing__etsy__s3__loading
if (_has__dom()) {
	reload__a1__images__listing__etsy__s3__loading()
}
export async function reload__a1__images__listing__etsy__s3__loading() {
	const arr__images__listing__etsy__s3 = await _a1__images__listing__etsy__s3()
	__a1__images__listing__etsy__s3__loading.set(arr__images__listing__etsy__s3)
}
export const reload__arr__images__listing__etsy__s3__loading = reload__a1__images__listing__etsy__s3__loading
export const __ctx__listing__etsy = derived([
		__a1__listing__etsy__s3__loading,
		__a1__images__listing__etsy__s3__loading
	],
	([a1__listing__etsy__s3, a1__images__listing__etsy__s3]) =>
		a1__listing__etsy__s3
		&& a1__images__listing__etsy__s3
		&& {
			a1__listing__etsy__s3,
			a1__images__listing__etsy__s3,
		})
export const __a1__listing__etsy__s3 =
	derived(__ctx__listing__etsy, _andand('a1__listing__etsy__s3'))
export const __arr__listing__etsy__s3 = __a1__listing__etsy__s3
export const __a1__images__listing__etsy__s3 =
	derived(__ctx__listing__etsy, _andand('a1__images__listing__etsy__s3'))
export const __arr__images__listing__etsy__s3 = __a1__images__listing__etsy__s3
