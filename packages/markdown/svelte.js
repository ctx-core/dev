import marked from 'marked'
import { extname } from 'path'
import '@ctx-core/svelte/preprocess'
/**
 * Returns a markup preprocessor for svelte-rollup.
 * @param {opts__builder} opts__builder
 * @returns {function(opts__preprocess): {ctx__code__map}}
 */
export function _markup(opts__builder = {}) {
	const {
		_match = ({ filename }) => extname(filename) === '.md',
	} = opts__builder
	return async opts => {
		if (!_match(opts)) return
		const { content } = opts
		return {
			code: marked(content),
			map: null,
		}
	}
}
export const markup = _markup()
export const markup__markdown = markup
export function _preprocess__markdown(opts__builder = {}) {
  return {
  	markup: _markup(opts__builder),
	}
}
