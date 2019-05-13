// See https://github.com/sveltejs/sapper.svelte.technology/blob/master/src/routes/guide/_process_markdown.js
import fs from 'fs'
import { join, extname, basename, resolve } from 'path'
import { promisify } from 'util'
import { map, filter } from '@ctx-core/array'
import { _andand } from '@ctx-core/function'
const exists = promisify(fs.exists)
const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)
const lstat = promisify(fs.lstat)
import marked from 'marked'
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
export function _html__markdown(markdown, opts = {}) {
	const renderer = new marked.Renderer()
	const { hljs } = opts
	if (hljs) {
		renderer.code = (source, lang) => {
			const highlighted = hljs.highlight(lang, source).value
			return `<pre><code>${highlighted}</code></pre>`
		}
	}
	const html = marked(markdown.replace(/^\t+/gm, match => match.split('\t').join('  ')), {
		renderer
	})
	return html
}
export async function _content__md__file(txt__path, params = {}) {
	if (extname(txt__path) !== '.md') return
	const txt__path__resolve = resolve(txt__path)
	if (!(await exists(txt__path__resolve))) return
	const stats = await lstat(txt__path__resolve)
	if (!stats.isFile()) return
	const markdown = await readFile(txt__path__resolve, 'utf-8')
	const { content, metadata } = _obj__metadata__content(markdown)
	const html = _html__markdown(content, params)
	return {
		html,
		date: new Date(metadata.date),
	}
}
export async function _a1__content__md(params = {}) {
	const { dir } = params
	const a1__name = await _a1__name(params)
	const a1__relative_path = map(a1__name, file => join(dir, `${file}.md`))
	const a1__promise__content__md__file = map(a1__relative_path, _content__md__file)
	return Promise.all(a1__promise__content__md__file)
}
export async function _html__md__dir(dir) {
	const a1__content__md = await _a1__content__md(dir)
	const a1__html__md__dir = map(a1__content__md, _andand('html'))
	return a1__html__md__dir.join('\n\n')
}
export async function _a1__name(params = {}) {
	const { dir } = params
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
export function _get__md__dir(params = {}) {
	return async (req, res) => {
		let json
		const [
			a1__name,
			a1__content__md,
		] = await Promise.all([
			_a1__name(params),
			_a1__content__md(params),
		])
		json = JSON.stringify({ a1__name, a1__content__md })
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
export function _get__a1__name(opts = {}) {
	return async (req, res) => {
		const a1__name = await _a1__name(opts)
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
export function _get__md__file(opts = {}) {
	const { dir } = opts
	return async (req, res) => {
		let json
		const { params } = req
		const filename = basename(
			params.filename || params.name || opts.filename || opts.name,
			'.md')
		const content__md = await _content__md__file(join(dir, `${filename}.md`), params)
		json = JSON.stringify({ content__md })
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
export function _get__a1__segment(opts = {}) {
	const { dir } = opts
	return async (req, res) => {
		console.debug('_get__a1__segment|debug|0')
		const { params } = req
		const { a1__segment } = params
		console.debug('_get__a1__segment|debug|1', {
			dir,
			params,
		})
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
		const content__md = await _content__md__file(`${path__content__resolve}.md`, params)
		if (content__md) {
			res.writeHead(200, headers)
			res.end(JSON.stringify({
				content__md,
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