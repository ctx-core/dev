import marked from 'marked'
import { extname } from 'path'
import { _frontmatter__content, _is__code__override } from './lib'
import '@ctx-core/svelte/preprocess'
const js__exec__route = `
	import { __frontmatter } from '@ctx-core/markdown/store'
	export let segment = ''
	__frontmatter.set(frontmatter)
	`.trim()
/**
 * Returns a markup preprocessor for svelte-rollup.
 * @param {opts__builder} opts__builder
 * @returns {function(opts__preprocess): {ctx__code__map}}
 */
export function _markup(opts__builder = {}) {
	const {
		extension = '.md',
		_match = ({ filename }) => extname(filename) === extension,
	} = opts__builder
	return async opts => {
		if (!_match(opts)) return
		const { content: markdown } = opts
		const { frontmatter, content } = _frontmatter__content(markdown)
		const renderer = new marked.Renderer()
		let js__module = `
export const frontmatter = ${JSON.stringify(frontmatter)}
		`.trim()
		let js__exec = ''
		const code__default = renderer.code.bind(renderer)
		renderer.code = code__override
		const paragraph__default = renderer.paragraph.bind(renderer)
		renderer.paragraph = paragraph__override
		const link__default = renderer.link.bind(renderer)
		renderer.link = link__override
		const html__content = marked(content, { renderer })
		const code = `
${
			js__module
			? `
<script context=module>
	${js__module}
</script>
			`.trim()
			: ''
			}
<script>
	${js__exec}
</script>
${html__content}
		`.trim()
		return {
			code,
			map: null,
		}
		function code__override(code, infostring, escaped) {
			if (infostring === 'js module') {
				js__module += `\n${code||''}`
			}
			if (infostring === 'js exec') {
				js__exec += `\n${code||''}`
			}
			if (infostring === 'js exec route') {
				js__exec += `\n${js__exec__route}\n${code||''}`
			}
			if (_is__code__override(infostring)) return ''
			const html = code__default(code, infostring, escaped)
			return '{@html ' + JSON.stringify(html) + '}'
		}
		function paragraph__override(text) {
			if (
				/^\s*\{#/.test(text)
				|| /^\s*\{:/.test(text)
				|| /^\s*\{\//.test(text)
				|| /^\s*<svelte:/.test(text)
			) {
				return `${text}\n`
			}
			return paragraph__default(text)
		}
		function link__override(href, title, text) {
		  if (/^svelte:/.exec(href)) {
		  	return `<${href}>`
			}
		  return link__default(href, title, text)
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
