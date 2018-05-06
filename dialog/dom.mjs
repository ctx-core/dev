import {clone} from 'ctx-core/object/lib.mjs'
import {__store__dialogs, __store__dialog} from 'ctx-core/dialog/store.mjs'
import {mount__layers} from 'ctx-core/layer/dom.mjs'
import {__store__route, __store__router} from 'ctx-core/route/store.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/dialog/dom.mjs'
export function mount__dialog(tag, ...ctx__mount$$) {
	log(`${logPrefix}|mount__dialog`)
	const ctx__mount = clone(...ctx__mount$$)
	let {ctx} = tag
	const {store} = ctx
	mount__layers(tag, ctx__mount)
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	return tag
	function onmount() {
		log(`${logPrefix}|mount__dialog|onmount`)
		__store__route(store)
		__store__dialog(store)
		__store__dialogs(store)
		store.on('state', __state)
		reload__dialog()
	}
	function onunmount() {
		log(`${logPrefix}|mount__dialog|onunmount`)
		store.off('state', __state)
	}
	function __state({changed, current, previous}) {
		if (changed.__route) {
			reload__dialog()
		}
		if (changed.dialogs && ctx__mount.__change__dialogs) {
			ctx__mount.__change__dialogs(current, previous)
		}
		if (changed.dialog) {
			if (!current.dialog) {
				__store__router(store).navigate(current.path__route)
			}
			tag.update()
		}
		if (changed.dialog && ctx__mount.__change__dialog) {
			ctx__mount.__change__dialog(current, previous)
		}
	}
	function reload__dialog() {
		log(`${logPrefix}|mount__dialog|reload__dialog`)
		const {query__route} = ctx
				, dialog__query__route = query__route && query__route.dialog
				, {agent__dialogs} = ctx
				, dialogs = agent__dialogs.__0 || []
		let dialog, indexOf__dialog
		for (let i=dialogs.length-1; i >= 0; i--) {
			dialog = dialogs[i]
			if (dialog.name__tag === dialog__query__route) {
				indexOf__dialog = i
				break
			}
		}
		if (dialog__query__route) {
			if (indexOf__dialog > -1) {
				agent__dialogs.remove({
					dialogs: dialogs.slice(indexOf__dialog + 1)
				})
			} else {
				dialog = {
					name__tag: dialog__query__route
				}
				agent__dialogs.push({
					dialogs: [dialog]
				})
			}
		}
		return ctx
	}
}