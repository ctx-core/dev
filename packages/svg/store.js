import { writable, derive } from 'svelte/store'
export const __margin__svg = writable()
export const __width__svg = writable()
export const __height__svg = writable()
export const __width__content__svg = writable()
export const __height__content__svg = writable()
export const __ctx__matrix2d__svg = derive([],
	(
		margin__svg,
		width__svg,
		height__svg,
		width__content__svg,
		height__content__svg
	) => ({
		margin__svg,
		width__svg,
		height__svg,
		width__content__svg,
		height__content__svg
	}))