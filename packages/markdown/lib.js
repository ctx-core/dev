// See https://github.com/sveltejs/sapper.svelte.technology/blob/master/src/routes/guide/_process_markdown.js
import fs from 'fs'
import { join, extname, basename, resolve } from 'path'
import { promisify } from 'util'
import { map, filter } from '@ctx-core/array'
import { _andand, arg__0__ } from '@ctx-core/function'
const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
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
/**
 * @typedef ctx__parse__md
 * @property {Date} date
 * @property {string} html
 */
/**
 * Returns a ctx__parse__md from the given markdown
 * @param {string} markdown
 * @param {opts__html__markdown} opts
 * @returns {ctx__parse__md}
 */
export function _ctx__parse__md(markdown, opts) {
	const { content, metadata } = _obj__metadata__content(markdown)
	const html = _html__markdown(content, opts)
	return {
		html,
		date: new Date(metadata.date),
	}
}
/**
 * Returns a ctx__parse__md from the markdown in the given txt__path
 * @param {string} txt__path
 * @param {opts__html__markdown} [opts]
 * @returns {Promise<ctx__parse__md>|null}
 */
export async function _ctx__parse__md__file(txt__path, opts = {}) {
	if (extname(txt__path) !== '.md') return
	const txt__path__resolve = resolve(txt__path)
	if (!(await exists(txt__path__resolve))) return
	const stats = await lstat(txt__path__resolve)
	if (!stats.isFile()) return
	const markdown = await readFile(txt__path__resolve, 'utf-8')
	return _ctx__parse__md(markdown, opts)
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
 * Returns a array of ctx__parse__md for each markdown file in params.dir
 * @param {opts__dir} params
 * @returns {Promise<ctx__parse__md[]>}
 */
export async function _a1__ctx__parse__md(params = {}) {
	const { dir } = params
	const a1__name = await _a1__name(params)
	const a1__relative_path = map(a1__name, file => join(dir, `${file}.md`))
	const a1__promise__ctx__parse__md__file =
		map(a1__relative_path, arg__0__(_ctx__parse__md__file))
	return Promise.all(a1__promise__ctx__parse__md__file)
}
/**
 * Return html for each concatenated processed markdown file in dir
 * @param {opts__dir} params
 * @returns {Promise<string>}
 */
export async function _html__md__dir(params = {}) {
	const a1__ctx__parse__md = await _a1__ctx__parse__md(dir)
	const a1__html__md__dir = map(a1__ctx__parse__md, _andand('html'))
	return a1__html__md__dir.join('\n\n')
}
/**
 * @typedef {Function} HTTP_Handler
 */
/**
 * @typedef body__md__dir
 * @property {name__md[]} a1__name
 * @property {ctx__parse__md[]} a1__ctx__parse__md
 */
/**
 * Returns a get http handler responding with a [body__md__dir](#body__md__dir).
 * @param {opts__dir} opts__dir
 * @returns {HTTP_Handler}
 */
export function _get__md__dir(opts__dir = {}) {
	return async (req, res) => {
		let json
		const [
			a1__name,
			a1__ctx__parse__md,
		] = await Promise.all([
			_a1__name(opts__dir),
			_a1__ctx__parse__md(opts__dir),
		])
		json = JSON.stringify({ a1__name, a1__ctx__parse__md })
		const headers = {
			'Content-Type': 'application/json',
		}
		if (process.env.NODE_ENV !== 'development') {
			headers['Cache-Control'] = `max-age=${5 * 60 * 1e3}` // 5 minutes
		}
		res.writeHead(200, headers)
		res.end(json)
	}
}
/**
 * @typedef body__a1__name
 * @property {name__md[]} a1__name
 */
/**
 * Returns a GET [HTTP_Handler](#HTTP_Handler)
 * that responds with [body__a1__name](#body__a1__name)
 * @param {opts__dir} opts__dir
 * @returns {HTTP_Handler}
 */
export function _get__a1__name(opts__dir = {}) {
	return async (req, res) => {
		const a1__name = await _a1__name(opts__dir)
		const json = JSON.stringify({ a1__name })
		const headers = {
			'Content-Type': 'application/json',
		}
		if (process.env.NODE_ENV !== 'development') {
			headers['Cache-Control'] = `max-age=${5 * 60 * 1e3}` // 5 minutes
		}
		res.writeHead(200, headers)
		res.end(json)
	}
}
/**
 * Returns a GET [HTTP_Handler](#HTTP_Handler)
 * that responds with a [body__ctx__parse__md](#body__ctx__parse__md).
 * @param {opts__dir} opts__dir
 * @returns {HTTP_Handler}
 */
export function _get__md__file(opts__dir = {}) {
	const { dir } = opts__dir
	return async (req, res) => {
		let json
		const { params } = req
		const filename = basename(
			params.filename || params.name || opts__dir.filename || opts__dir.name,
			'.md')
		const ctx__parse__md = await _ctx__parse__md__file(join(dir, `${filename}.md`), params)
		json = JSON.stringify({ ctx__parse__md })
		const headers = {
			'Content-Type': 'application/json',
		}
		if (process.env.NODE_ENV !== 'development') {
			headers['Cache-Control'] = `max-age=${5 * 60 * 1e3}` // 5 minutes
		}
		res.writeHead(200, headers)
		res.end(json)
	}
}
/**
 * @typedef body__a1__name__path
 * @property {name__md[]} a1__name
 * @property {string} path__content
 * @property {string} path__segment
 */
/**
 * @typedef body__ctx__parse__md__path
 * @property {ctx__parse__md} ctx__parse__md
 * @property {string} path__content
 * @property {string} path__segment
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
		const path__segment = a1__segment.join('/')
		const path__content = join(dir, path__segment)
		const path__content__resolve = resolve(path__content)
		const dir__resolve = resolve(dir)
		const valid__path =
			path__content__resolve.slice(0, dir__resolve.length) === dir__resolve
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
		const a1__name = await _a1__name({ dir: path__content__resolve })
		if (a1__name) {
			res.writeHead(200, headers)
			res.end(JSON.stringify({
				a1__name,
				path__content,
				path__segment,
			}))
			return
		}
		const ctx__parse__md = await _ctx__parse__md__file(`${path__content__resolve}.md`, params)
		if (ctx__parse__md) {
			res.writeHead(200, headers)
			res.end(JSON.stringify({
				ctx__parse__md,
				path__content: `${path__content}.md`,
				path__segment: `${path__segment}.md`,
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