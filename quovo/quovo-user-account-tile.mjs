import { tag__assign } from '@ctx-core/riot/tag.mjs'
import { __store__route } from '@ctx-core/route/store.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-user-account-tile.mjs'
export function init(tag) {
	log(`${logPrefix}|init`)
	tag__assign(tag)
	const { ctx } = tag
		, { store } = ctx
	__store__route(store)
	store.on('state', ({ changed }) => {
		if (changed.__route) {
			tag.update()
		}
	})
}