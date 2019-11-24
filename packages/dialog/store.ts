import { writable, derived, get } from 'svelte/store'
// @ts-ignore
import { subscribe__debug } from '@ctx-core/store'
import { each, _last, remove } from '@ctx-core/array'
export const __stack__dialog = writable([])
export const __top__stack__dialog = derived(__stack__dialog, _last)
export function add__component__stack__dialog(component) {
	const stack__dialog = get(__stack__dialog).slice(0)
	stack__dialog.push(component)
	__stack__dialog.set(stack__dialog)
}
export function remove__component__stack__dialog(component) {
	const stack__dialog = get(__stack__dialog).slice(0)
	remove(stack__dialog, component)
	__stack__dialog.set(stack__dialog)
}
export function close__top__stack__dialog(event) {
	const top__stack__dialog = get(__top__stack__dialog)
	if (top__stack__dialog) top__stack__dialog.close(event)
}
export function close__stack__dialog(event?) {
	const stack__dialog = get(__stack__dialog)
	each(stack__dialog, dialog => dialog.close(event))
}
