// See https://github.com/sveltejs/sapper.svelte.technology/blob/master/src/routes/guide/_process_markdown.js
import marked from 'marked'
export function _obj__metadata__content(markdown) {
	const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown)
	const frontMatter = match[1]
	const content = markdown.slice(match[0].length)
	const metadata = {}
	frontMatter.split('\n').forEach(pair => {
		const colonIndex = pair.indexOf(':')
		metadata[pair.slice(0, colonIndex).trim()] = pair
			.slice(colonIndex + 1)
			.trim()
	})
	return { metadata, content }
}
export const _obj__metadata__content__markdown = _obj__metadata__content
export function _html__content__markdown(content, opts = { }) {
	const renderer = new marked.Renderer()
	const { hljs } = opts
	if (hljs) {
		renderer.code = (source, lang) => {
			const highlighted = hljs.highlight(lang, source).value
			return `<pre><code>${highlighted}</code></pre>`
		}
	}
	const html = marked(content.replace(/^\t+/gm, match => match.split('\t').join('  ')), {
		renderer
	})
	return html
}