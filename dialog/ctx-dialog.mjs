import { tag__assign } from 'ctx-core/riot/tag.mjs'
import { mount__dialog } from 'ctx-core/dialog/dom.mjs'
import { __store__dialogs } from 'ctx-core/dialog/store.mjs'
import { __store__layers } from 'ctx-core/layer/store.mjs'
import {
	_dom,
	__dom,
	has__class,
	add__class
} from 'ctx-core/dom/lib.mjs'
import { log, info, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/dialog/ctx-dialog.mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	const update__super = tag.update
	tag__assign(tag, {
		className,
		update,
		__click__root
	})
	const slideOut__delay = 30
	const { ctx } = tag
	const { store } = ctx
	let layer
	mount__dialog(tag, {
		__change__agent__dialogs,
		__change__agent__dialog
	})
	log(logPrefix)
	let root
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	function onmount() {
		log(`${logPrefix}|onmount`)
		root = tag.root
		layer = {
			el: root
		}
		__store__layers(store).push__layers(layer)
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		__store__layers(store).remove__layers(layer)
	}
	function __change__agent__dialogs() {
		log(`${logPrefix}|__change__agent__dialogs`)
		tag.update()
	}
	function __change__agent__dialog() {
		log(`${logPrefix}|__change__agent__dialog`)
		root.className = tag.className()
	}
	function __click__root(e) {
		log(`${logPrefix}|__click__root`)
		const array__dom__clear =
			[root,
				_dom('section', root),
				...Array.from(__dom('ctx-dialog > section > *', root))]
		const { target } = e
		for (let i = 0; i < array__dom__clear.length; i++) {
			if (array__dom__clear[i] === target) {
				clear()
				return false
			}
		}
		return true
	}
	function className() {
		log(`${logPrefix}|className`)
		let array__className = []
		const { dialogs } = ctx
		if (dialogs && dialogs.length) array__className.push('show')
		const { dialog } = ctx
		if (dialog && dialog.name__tag) array__className.push(dialog.name__tag)
		return array__className.join(' ')
	}
	function clear() {
		log(`${logPrefix}|clear`)
		__store__dialogs(ctx.store).clear__dialogs()
	}
	function update() {
		log(`${logPrefix}|update`)
		init__hide()
		return update__super.apply(tag, arguments)
	}
	function init__hide() {
		log(`${logPrefix}|init__hide`)
		const hide =
			ctx.dialogs
			&& !ctx.dialogs.length
			&& has__class(root, 'show')
			&& !has__class(root, 'hide__inProgress')
		if (hide) {
			add__class(
				root,
				'hide__inProgress')
			schedule__hide()
		}
	}
	function schedule__hide() {
		log(`${logPrefix}|schedule__init__hide`)
		setTimeout(hide, slideOut__delay)
	}
	function hide() {
		info(`${logPrefix}|hide`)
		root.className = ''
	}
}