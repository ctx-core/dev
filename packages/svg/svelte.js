import { extname } from 'path'
import { keys } from '@ctx-core/object'
import { map } from '@ctx-core/array'
import htmlparser2 from 'htmlparser2'
import { getInnerHTML } from 'domutils'
import '@ctx-core/svelte/preprocess'
/**
 * Returns a svg preprocessor for svelte-rollup.
 * @param {opts__builder} opts__builder
 * @returns {function(opts__preprocess): {ctx__code__map}}
 */
export function _markup(opts__builder = {}) {
	const {
		_match = ({ filename }) => extname(filename) === '.svg',
	} = opts__builder
	return async opts => {
		if (!_match(opts)) return
		const { content } = opts
		let code
		const handler = new htmlparser2.DomHandler((error, dom) => {
			if (error) {
				throw error
			} else {
				const dom0 = dom[0]
				const { attribs } = dom0
				const txt__attribs =
					map(
						keys(attribs),
						key => `${key}=${JSON.stringify(attribs[key])}`).join(' ')
				code = `
<script context="module">
	export async function preload({ params, query }) {
	  return Object.assign({}, query, params)
	}
</script>
<script>
	let node__svg
	$: {
		Object.keys($$props).forEach(
			prop => node__svg && node__svg.setAttribute(prop, $$props[prop]))
	}
</script>
<svelte:options namespace="svg"></svelte:options>
<svg bind:this="{node__svg}" ${txt__attribs}>${getInnerHTML(dom0)}</svg>
				`.trim()
			}
		})
		const parser = new htmlparser2.Parser(handler)
		parser.write(content.slice(content.indexOf('<svg')))
		parser.end()
		return {
			code,
			map: null,
		}
	}
}
export const markup = _markup()
export const markup__markdown = markup
export function _preprocess__svg(opts__builder = {}) {
	const markup = _markup(opts__builder)
	return {
		markup,
	}
}
