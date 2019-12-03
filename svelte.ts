import sass from 'node-sass'
import autoprefixer from 'autoprefixer'
import importer__package from 'node-sass-package-importer'
import postcss from 'postcss'
import { parseDOM } from 'htmlparser2/lib'
import ElementType from 'domelementtype'
import { getOuterHTML } from 'domutils/lib/stringify'
import cheerio from 'cheerio'
import {
	each,
	map,
	compact,
	flatten,
	_present__a1,
} from '@ctx-core/array'
import { splice__str } from '@ctx-core/string'
import { error } from '@ctx-core/logger'
/**
 * @typedef AST__PostCSS
 */
type Opts__builder = {
	postcss_plugins?:any[]
}
type Plugin_Output = { code:string, map:string }
async function render__sass(opts__builder:Opts__builder, opts):Promise<Plugin_Output> {
	const { postcss_plugins = [autoprefixer] } = opts__builder
	const { filename, content, attributes } = opts
	return new Promise((fulfil, reject)=>{
		sass.render({
			data: content,
			includePaths: ['src'],
			importer: importer__package(),
			sourceMap: true,
			outFile: 'x' // this is necessary, but is ignored
		}, async (err, result)=>{
			if (err) {
				error(`Error in\n${filename}`)
				return reject(err)
			}
			const css = result.css.toString()
			let ast = postcss.parse(css)
			if (attributes?.global) ast = globalize(ast)
			const result__ =
				await postcss(postcss_plugins).process(ast.toResult().css, {
					from: filename,
				})
			fulfil({
				code: result__.css,
				map: result.map.toString()
			})
		})
	})
}
/**
 * Builder Function that returns a style__sass preprocessor for Svelte.
 * @param opts__builder
 * @param opts__builder.postcss_plugins [autoprefixer]: Plugins for postcss
 * @returns {function(*): Promise<{code, map}>}
 */
export function _style__sass(opts__builder:Opts__builder = {}) {
	return function style__sass(opts) {
		const { attributes } = opts
		const { type } = attributes
		if (type !== 'text/scss' && type !== 'text/sass') return
		return render__sass(opts__builder, opts)
	}
}
/**
 * Default style__sass preprocessor for Svelte.
 * @param opts.filename
 * @param opts.content
 * @param opts.attributes
 * @returns {Promise<{code, map}>} A promise returning `{ code, map }`
 */
export const style__sass = _style__sass()
export const style = style__sass
/**
 * Takes a postcss ast & wraps each selector with the `:global()` svelte css directive.
 * @param {AST__PostCSS} ast
 * @returns {AST__PostCSS}
 */
export function globalize(ast) {
	let selector = '' + (ast.selector || '')
	if (selector) {
		const a2__arg__splice = []
		const length__selector = selector.length
		let idx = 0
		const str__global = ':global('
		const len__str__global = str__global.length
		do {
			const idx__begin = selector.indexOf(str__global, idx)
			if (idx__begin === -1) break
			a2__arg__splice.push([idx__begin, len__str__global])
			idx = idx__begin + len__str__global
			let rc__paren = 1
			let char
			do {
				char = selector.slice(idx, idx + 1)
				if (char === ')') rc__paren -= 1
				else if (char === '(') rc__paren += 1
				idx += 1
			} while (rc__paren && char != null && idx < length__selector)
			a2__arg__splice.push([idx - 1, 1])
		} while (idx !== -1 && idx < length__selector)
		for (let i = a2__arg__splice.length - 1; i >= 0; i -= 1) {
			const a1__arg__splice = a2__arg__splice[i]
			selector = splice__str(selector, ...a1__arg__splice)
		}
//		selector.split(/[\s+[>\+\~]\s*]/)
		ast.selector = `:global(${selector})`
//		ast.selector = `:global(${selector.replace(/:global\((.*)\)/g, '$1')})`
	}
	each(ast.nodes, globalize)
	return ast
}
export function _markup__sass(opts__builder:Opts__builder = {}) {
	return async opts=>{
		const { filename, content, attributes, } = opts
		const dom = parseDOM(content, {
			lowerCaseTags: false,
			lowerCaseAttributeNames: false,
		})
		const promise_a1 = map(dom, async node=>{
			if (
				node.type === ElementType.Tag
				&& node.name == 'svelte:head'
			) {
				const $ = cheerio.load(node)
				const promise_a1 = map(
					$(`style[type='text/sass'], style[type='text/scss']`),
					async style_node=>{
						const text_node = style_node.firstChild
						const { data } = text_node
						const { code } = await render__sass(opts__builder, {
							filename,
							content: data,
							attributes,
						})
						style_node.attribs.type = 'text/css'
						delete style_node.attribs.global
						text_node.data = code
						return style_node
					})
				return Promise.all(promise_a1)
			}
		})
		const node_a1 = await Promise.all(promise_a1)
		if (_present__a1(flatten(compact(node_a1)))) {
			return {
				code: getOuterHTML(dom),
				map: null,
			}
		}
	}
}
export function _preprocess__sass(opts__builder = {}) {
	const style = _style__sass(opts__builder)
	const markup = _markup__sass()
	return {
		style,
		markup,
	}
}
