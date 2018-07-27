import { clone } from 'ctx-core/object/lib.mjs'
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth/tag.mjs'
export function mount__authentication(tag, ...ARR__opts) {
	log(`${logPrefix}|mount__authentication`)
	let { ctx } = tag
	const { store } = ctx
	const opts = clone(...ARR__opts)
	tag.on('mount', onmount)
	tag.on('unmount', onunmount)
	let subscription__store
	return tag
	function onmount() {
		log(`${logPrefix}|onmount`)
		subscription__store =
			store.on('state', ({ changed, current }) => {
				if (changed.authentication) {
					__change__agent__authentication(current)
				}
			})
	}
	function onunmount() {
		log(`${logPrefix}|onunmount`)
		subscription__store.cancel()
	}
	function __change__agent__authentication() {
		log(`${logPrefix}|__change__agent__authentication`)
		tag.update()
	}
}