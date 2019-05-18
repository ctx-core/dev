import marked from 'marked'
import { extname } from 'path'
/**
 * @typedef opts__builder
 * @property {function<boolean>} _match - Returns whether or not to process this markup as markdown
 */
/**
 * @typedef ctx__content__filename__attributes
 * @property {string} content
 * @property {string} filename
 * @property {string} attributes
 */
/**
 * @typedef ctx__code__map
 * @property {string} code
 * @property {string} map
 */
/**
 * Returns a markup preprocessor for svelte-rollup.
 * @param {opts__builder} opts__builder
 * @returns {function(ctx__content__filename__attributes): ctx__code__map}
 */
export function _markup(opts__builder = {}) {
	const {
		_match = ({ filename }) => extname(filename) === '.md',
	} = opts__builder
	return async function markup(opts) {
		if (!_match(opts)) return
		const { content } = opts
		return {
			code: marked(content),
		}
	}
}
export const markup = _markup()
export const markup__markdown = markup
