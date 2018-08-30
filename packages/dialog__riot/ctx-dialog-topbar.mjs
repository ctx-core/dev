import { tag__assign } from '@ctx-core/riot/tag.mjs'
import { __store__dialogs } from '@ctx-core/dialog/store.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/dialog__riot/ctx-dialog-topbar.mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	tag__assign(tag, {
		__click__back_button: __click__back_button,
		registerElement: ['ctx-back-button']
	})
	const { ctx } = tag
	const { store } = ctx
	__store__dialogs(store)
	function __click__back_button() {
		log(`${logPrefix}|__click__back_button`)
		clear()
	}
	function clear() {
		log(`${logPrefix}|clear`)
		store.remove__dialogs(tag.opts.dialog)
	}
}