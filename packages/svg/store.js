import { writable, derived } from 'svelte/store'
export const __margin__svg = writable(null)
export const __width__svg = writable(null)
export const __height__svg = writable(null)
export const __width__content__svg = writable(null)
export const __height__content__svg = writable(null)
export const __ctx__matrix2d__svg = derived([
		__margin__svg,
		__width__svg,
		__height__svg,
		__width__content__svg,
		__height__content__svg,
	],
	([
		 margin__svg,
		 width__svg,
		 height__svg,
		 width__content__svg,
		 height__content__svg
	 ]) => ({
		margin__svg,
		width__svg,
		height__svg,
		width__content__svg,
		height__content__svg,
	}))
