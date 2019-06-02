import marked from 'marked'
import { extname } from 'path'
import { _frontmatter__content } from './lib'
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
		const { content: markdown } = opts
		const { frontmatter, content } = _frontmatter__content(markdown)
		const renderer = new marked.Renderer()
		let js__module = `
	export const frontmatter = ${JSON.stringify(frontmatter)}
		`.trim()
		let js__exec = `
	import { __frontmatter } from '@ctx-core/markdown/store'
	export let segment = ''
	__frontmatter.set(frontmatter)
		`.trim()
		const code__default = renderer.code.bind(renderer)
		renderer.code = code__override
		const paragraph__default = renderer.paragraph.bind(renderer)
		renderer.paragraph = paragraph__override
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
				js__module += `\n${code}`
				return ''
			}
			if (infostring === 'js module replace') {
				js__module = `\n${code}`
				return ''
			}
			if (infostring === 'js exec') {
				js__exec += `\n${code}`
				return ''
			}
			if (infostring === 'js exec replace') {
				js__exec = `\n${code}`
				return ''
			}
			const html = code__default(code, infostring, escaped)
			return '\'{@html ' + JSON.stringify(html) + '}'
		}
		function paragraph__override(text) {
			if (/^\s*\{#/.test(text) || /^\s*\{:/.test(text) || /^\s*\{\//.test(text)) {
				return `${text}\n`
			}
			return paragraph__default(text)
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
