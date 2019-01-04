import { _mixin__store } from '@ctx-core/store/lib.js'
import { mixin, _ctx__clear } from '@ctx-core/object/lib.js'
import { __store__layers } from '@ctx-core/layer/store.js'
import { _difference__array } from '@ctx-core/array/lib.js'
import { log } from '@ctx-core/logger/lib.js'
import { last__array } from '@ctx-core/array/lib.js'
export const __store__dialogs = _mixin__store('__store__dialogs', async store => {
	__store__layers(store)
	const scope = ['dialogs']
	mixin(store, {
		clear__dialogs() {
			this.set(_ctx__clear(scope, ...arguments))
			return this
		},
		push__dialogs(...dialogs__) {
			log(`${logPrefix}|push__dialogs`)
			const layers = []
			for (let i = 0; i < dialogs__.length; i++) {
				const dialog = dialogs__[i]
				dialog.layer = dialog.layer || {}
				layers.push(dialog.layer)
			}
			store.push__layers(layers)
			const dialogs = this.dialogs.slice(0)
			dialogs.push(...dialogs__)
			this.set({ dialogs })
			return this
		},
		remove__dialogs(...dialogs__) {
			log(`${logPrefix}|remove__dialogs`)
			const dialogs__remove__ = compact__array(dialogs__ || [])
			const dialogs__remove = []
			const layers__remove = []
			for (let i = 0; i < dialogs__remove__.length; i++) {
				const dialog__remove__ = dialogs__remove__[i]
				const dialog__remove =
					typeof dialog__remove__ === 'string'
					? this.findBy__name__tag__dialogs(dialog__remove__)
					: dialog__remove__
				dialogs__remove.push(dialog__remove)
				layers__remove.push(dialog__remove.layer)
			}
			store.remove__layers(...layers__remove)
			this.set({ dialogs: _difference__array(dialogs__remove, this.dialogs) })
			return this
		},
		findBy__name__tag__dialogs(name__tag) {
			log(`${logPrefix}|findBy__name__tag__dialogs`, name__tag)
			const { dialogs } = this
			for (let i = 0; i < dialogs.length; i++) {
				const dialog = dialogs[i]
				if (dialog.name__tag === name__tag) {
					return dialog
				}
			}
		},
		get dialogs() {return this.get().dialogs},
	})
})
export const __store__dialog = _mixin__store('__store__dialog', async store => {
	__store__dialogs(store)
	store.on('state', ({ changed, current, previous }) => {
		if (changed.dialogs) {
			const { dialogs } = current
			const dialog = last__array(dialogs)
			if (!previous || (last__array(previous.dialogs) !== dialog)) {
				store.set({ dialog })
			}
		}
	})
})