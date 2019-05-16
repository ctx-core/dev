import { get, writable } from 'svelte/store'
import { push__layers, remove__layers } from '@ctx-core/layer/store'
import { compact, _last, _difference } from '@ctx-core/array'
import { log } from '@ctx-core/logger'
import { _has__dom } from '@ctx-core/dom'
import { subscribe, _set } from '@ctx-core/store'
export const __dialogs = writable()
export const __dialogs__prev = writable()
export const __dialog = writable()
if (_has__dom()) {
	subscribe(__dialogs,
		_set(__dialog, dialogs => _last(dialogs)))
}
export function clear__dialogs() {
	__dialogs.set(null)
}
export function push__dialogs(...dialogs__) {
	log(`${logPrefix}|push__dialogs`)
	const layers = []
	for (let i = 0; i < dialogs__.length; i++) {
		const dialog = dialogs__[i]
		dialog.layer = dialog.layer || {}
		layers.push(dialog.layer)
	}
	push__layers(layers)
	const dialogs = get(__dialogs).slice(0)
	dialogs.push(...dialogs__)
	__dialogs.set(dialogs)
}
export function remove__dialogs(...dialogs__) {
	log(`${logPrefix}|remove__dialogs`)
	const dialogs__remove__ = compact(dialogs__ || [])
	const dialogs__remove = []
	const layers__remove = []
	for (let i = 0; i < dialogs__remove__.length; i++) {
		const dialog__remove__ = dialogs__remove__[i]
		const dialog__remove =
			typeof dialog__remove__ === 'string'
			? findBy__name__tag__dialogs(dialog__remove__)
			: dialog__remove__
		dialogs__remove.push(dialog__remove)
		layers__remove.push(dialog__remove.layer)
	}
	remove__layers(...layers__remove)
	__dialogs.set(_difference(dialogs__remove, get(__dialogs)))
}
export function findBy__name__tag__dialogs(name__tag) {
	log(`${logPrefix}|findBy__name__tag__dialogs`, name__tag)
	const dialogs = get(__dialogs)
	for (let i = 0; i < dialogs.length; i++) {
		const dialog = dialogs[i]
		if (dialog.name__tag === name__tag) {
			return dialog
		}
	}
}
