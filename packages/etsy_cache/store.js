import { writable, derive } from 'svelte/store'
import { _andand } from '@ctx-core/function'
import {
	_arr__listing__etsy__s3,
	_arr__images__listing__etsy__s3,
} from './fetch'
import { _has__dom } from '@ctx-core/dom'
export const __arr__listing__etsy__s3__loading = writable()
if (_has__dom()) {
	reload__arr__listing__etsy__s3__loading()
}
export async function reload__arr__listing__etsy__s3__loading() {
	const arr__listing__etsy__s3 = await _arr__listing__etsy__s3()
	__arr__listing__etsy__s3__loading.set(arr__listing__etsy__s3)
}
export const __arr__images__listing__etsy__s3__loading = writable()
if (_has__dom()) {
	reload__arr__images__listing__etsy__s3__loading()
}
export async function reload__arr__images__listing__etsy__s3__loading() {
	const arr__images__listing__etsy__s3 = await _arr__images__listing__etsy__s3()
	__arr__images__listing__etsy__s3__loading.set(arr__images__listing__etsy__s3)
}
export const __ctx__listing__etsy = derive([
		__arr__listing__etsy__s3__loading,
		__arr__images__listing__etsy__s3__loading
	],
	([arr__listing__etsy__s3, arr__images__listing__etsy__s3]) =>
		arr__listing__etsy__s3
		&& arr__images__listing__etsy__s3
		&& {
			arr__listing__etsy__s3,
			arr__images__listing__etsy__s3,
		})
export const __arr__listing__etsy__s3 =
	derive(__ctx__listing__etsy, _andand('arr__listing__etsy__s3'))
export const __arr__images__listing__etsy__s3 =
	derive(__ctx__listing__etsy, _andand('arr__images__listing__etsy__s3'))
