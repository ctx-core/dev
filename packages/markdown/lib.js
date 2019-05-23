// See https://github.com/sveltejs/sapper.svelte.technology/blob/master/src/routes/guide/_process_markdown.js
import fs from 'fs'
import { join, extname, basename, resolve } from 'path'
import { promisify } from 'util'
import { map, filter } from '@ctx-core/array'
const exists = promisify(fs.exists)
const readdir = promisify(fs.readdir)
const lstat = promisify(fs.lstat)
import marked from 'marked'
/**
 * @typedef obj__metadata__content
 * @property {object} metadata
 * @property {string} content
 */
/**
 * @typedef hljs - highlight.js object
 */
/**
 * Returns `{ metadata, content }`
 * @param {string} markdown
 * @returns {obj__metadata__content}
 */
export function _obj__metadata__content(markdown) {
	const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown)
	if (!match) return { metadata: {}, content: markdown }
	const frontMatter = match && match[1]
	const content = match && match[0] && markdown.slice(match[0].length)
	const metadata = {}
	if (frontMatter) {
		frontMatter.split('\n').forEach(pair => {
			const colonIndex = pair.indexOf(':')
			metadata[pair.slice(0, colonIndex).trim()] = pair
				.slice(colonIndex + 1)
				.trim()
		})
	}
	return { metadata, content }
}
export const _obj__metadata__content__markdown = _obj__metadata__content
/**
 * @typedef opts__html__markdown
 * @property {hljs} [opts.hljs]
 */
/**
 * Returns html from the given markdown
 * @param {string} markdown
 * @param {opts__html__markdown} opts
 * @returns {string}
 */
export function _html__markdown(markdown, opts = {}) {
	const renderer = new marked.Renderer()
	const { hljs } = opts
	if (hljs) {
		renderer.code = (source, lang) => {
			const highlighted = hljs.highlight(lang, source).value
			return `<pre><code>${highlighted}</code></pre>`
		}
	}
	const html = marked(
		markdown.replace(/^\t+/gm,
			match =>
				match.split('\t').join('  ')), { renderer })
	return html
}
export async function _txt__path__file__md__resolve(txt__path) {
	if (extname(txt__path) !== '.md') return false
	const txt__path__resolve = resolve(txt__path)
	if (!(await exists(txt__path__resolve))) return false
	const stats = await lstat(txt__path__resolve)
	if (!stats.isFile()) return
	return txt__path__resolve
}
/**
 * @typedef opts__dir
 * @property {string} dir
 */
/**
 * Name for a markdown file
 * @typedef {string} name__md
 */
/**
 * Returns an array of names for each markdown file in opts__dir
 * @param {opts__dir} opts__dir
 * @returns {Promise<name__md[]>}
 */
export async function _a1__name(opts__dir = {}) {
	const { dir } = opts__dir
	if (!await exists(dir)) return
	const stats = await lstat(dir)
	if (!stats.isDirectory()) return
	const a1__name__ext = await readdir(dir)
	return (
		map(
			filter(a1__name__ext, name => extname(name) === '.md'),
			name => basename(name, '.md')
		)
	)
}
/**
 * @typedef {Function} HTTP_Handler
 */
/**
 * @typedef body__a1__name__path
 * @property {name__md[]} a1__name
 * @property {string} path__source
 * @property {string} path
 */
/**
 * @typedef body__ctx__parse__md__path
 * @property {string} path__source
 * @property {string} path
 */
/**
 * Returns a GET [HTTP_Handler](#HTTP_Handler)
 * that responds with a body__a1__name__path or a body__ctx__parse__md__path
 * @param opts__dir
 * @returns {Function}
 */
export function _get__a1__segment(opts__dir = {}) {
	const { dir } = opts__dir
	return async (req, res) => {
		const { params } = req
		const { a1__segment } = params
		const path = a1__segment.join('/')
		const path__source = join(dir, path)
		const path__source__resolve = resolve(path__source)
		const dir__resolve = resolve(dir)
		const valid__path =
			path__source__resolve.slice(0, dir__resolve.length) === dir__resolve
		if (!valid__path) {
			res.writeHead(403)
			res.end('Forbidden')
			return
		}
		const headers = {
			'Content-Type': 'application/json',
		}
		if (process.env.NODE_ENV !== 'development') {
			headers['Cache-Control'] = `max-age=${5 * 60 * 1e3}` // 5 minutes
		}
		const a1__name = await _a1__name({ dir: path__source__resolve })
		if (a1__name) {
			res.writeHead(200, headers)
			res.end(JSON.stringify({
				a1__name,
			}))
			return
		}
		const txt__path__file__md__resolve =
			await _txt__path__file__md__resolve(`${path__source__resolve}.md`)
		if (txt__path__file__md__resolve) {
			res.writeHead(200, headers)
			res.end(JSON.stringify({
				path__source: `${path__source}.md`,
				path: `${path}.md`,
			}))
			return
		}
		res.writeHead(404, headers)
		res.end(JSON.stringify({
			status: 404,
			message: 'Not Found',
		}))
	}
}
