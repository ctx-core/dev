/**
 * @typedef opts__builder
 * @property {function<boolean>} _match - Returns whether or not to process this markup as markdown
 */
/**
 * @typedef opts__preprocess
 * @property {string} content
 * @property {string} filename
 * @property {string} attributes
 */
/**
 * @typedef ctx__code__map
 * @property {string} code
 * @property {string} map
 */
export function compose__a1__preprocess(a1__preprocess) {
	return {
		markup: compose__key__a1__preprocess('markup', a1__preprocess),
		script: compose__key__a1__preprocess('script', a1__preprocess),
		style: compose__key__a1__preprocess('style', a1__preprocess),
	}
}
function compose__key__a1__preprocess(key, a1__preprocess) {
	return (opts__preprocess = {}) => {
		for (let i = 0; i < a1__preprocess.length; i++) {
			const fn = a1__preprocess[i][key]
			const ctx__code__map = fn && fn(opts__preprocess)
			if (ctx__code__map) return ctx__code__map
		}
	}
}
