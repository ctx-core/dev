import {
	PreprocessorGroup,
} from 'svelte/types/compiler/preprocess'
export function compose__a1__preprocess(a1__preprocess):PreprocessorGroup {
	return {
		markup: compose__key__a1__preprocess('markup', a1__preprocess),
		script: compose__key__a1__preprocess('script', a1__preprocess),
		style: compose__key__a1__preprocess('style', a1__preprocess),
	}
}
export const _preprocess = compose__a1__preprocess
function compose__key__a1__preprocess(key, a1__preprocess) {
	return async (opts__preprocess = {})=>{
		for (let i = 0; i < a1__preprocess.length; i++) {
			const fn = a1__preprocess[i][key]
			const ctx__code__map = fn && await fn(opts__preprocess)
			if (ctx__code__map) return ctx__code__map
		}
	}
}
