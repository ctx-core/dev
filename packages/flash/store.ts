import { writable, derived, get } from 'svelte/store'
import { subscribe } from '@ctx-core/store'
// @ts-ignore
import { subscribe__debug } from '@ctx-core/store'
import { clone } from '@ctx-core/object'
import { tap, _andand, noop } from '@ctx-core/function'
export const __queue__flash = writable([])
export let timeout__flash = 10000
function mutate__flash(fn) {
	__queue__flash.update(
		queue__flash =>
			tap(queue__flash.slice(),
				queue__flash__ =>
					fn(queue__flash__)
			)
	)
}
export const __flash =
	derived(__queue__flash, _andand(0))
export const __message__flash =
	derived(__flash, _andand('message__flash'))
export const __error__flash =
	derived(__flash, _andand('error__flash'))
export const __id__timeout__expire__flash =
	derived(__flash,
		() =>
			setTimeout(
				shift__flash,
				timeout__flash)
	)
subscribe(__id__timeout__expire__flash, noop)
export function add__flash(ctx__flash) {
	mutate__flash(
		queue__flash =>
			queue__flash.push(ctx__flash))
}
export function shift__flash() {
	mutate__flash(
		queue__flash =>
			queue__flash.shift())
}
export function add__message__flash(message__flash, rest) {
	add__flash(clone(rest, {
		message__flash,
	}))
}
export function add__error__flash(error__flash, rest) {
	add__flash(clone(rest, {
		error__flash,
	}))
}
export function cancel__expire__flash() {
	window.clearTimeout(get(__id__timeout__expire__flash))
}
