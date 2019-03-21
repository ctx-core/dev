import { get } from 'svelte/store.mjs'
import {
	__margin__svg,
	__width__svg,
	__height__svg,
	__width__content__svg,
	__height__content__svg,
} from './store.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/svg/lib.js'
export async function set__matrix2d__svg(opts={}) {
	log(`${logPrefix}|set__matrix2d__svg`)
	const margin__svg =
		opts.margin__svg
		|| get(__margin__svg)
		|| { top: 20, right: 20, bottom: 60, left: 100 }
	const width__svg = opts.width__svg || get(__width__svg)
	const height__svg = opts.height__svg || get(__height__svg)
	const {
		left,
		right,
		top,
		bottom
	} = margin__svg
	const width__content__svg = width__svg - left - right
	const height__content__svg = height__svg - top - bottom
	__margin__svg.set(margin__svg)
	__width__svg.set(width__svg)
	__height__svg.set(height__svg)
	__width__content__svg.set(width__content__svg)
	__height__content__svg.set(height__content__svg)
}
