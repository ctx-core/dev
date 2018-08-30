import { clone } from '@ctx-core/object/lib.mjs'
import { __store__matrix2d__svg } from './store.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/svg/lib.mjs'
export function set__matrix2d__svg(store, ...ARR__ctx__set) {
	log(`${logPrefix}|set__matrix2d__svg`)
	__store__matrix2d__svg(store)
	const ctx__set = clone(...ARR__ctx__set)
	const margin__svg =
		ctx__set.margin__svg
		|| store.margin__svg
		|| { top: 20, right: 20, bottom: 60, left: 100 }
	const width__svg = ctx__set.width__svg || store.width__svg
	const height__svg = ctx__set.height__svg || store.height__svg
	const {
		left,
		right,
		top,
		bottom
	} = margin__svg
	const width__content__svg = width__svg - left - right
	const height__content__svg = height__svg - top - bottom
	store.set({
		margin__svg,
		width__svg,
		height__svg,
		width__content__svg,
		height__content__svg
	}, ...ARR__ctx__set)
	return store
}
