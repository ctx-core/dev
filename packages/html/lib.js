/**
 * @module @ctx-core/html/lib
 */
import { assign } from '@ctx-core/object'
import { _version } from '@ctx-core/version__app/lib.js'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/html'
export function escape__html(html__unsafe) {
	return html__unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}
/**
 * Returns a string of attrs for an html element
 * @param {Object} obj - Key/Value pairs of the attrs
 * @returns {String} The attrs for an html element
 */
export function _attrs(obj) {
	if (!obj) return ''
	let attrs = []
	for (let key in obj) {
		attrs.push(`${key}=${_html(obj[key])}`)
	}
	return attrs.join(' ')
}
/**
 * Returns class html attribute from obj
 * @param {Object} obj - key/value pairs of classes. Truthy values will have key class added. Falsy values will have key class ignored.
 * @returns {string} List of classes
 * @example
 * _class({class_1: true, class_2: false, class_3: true}) // returns 'class_1 class_3'
 */
export function _class(obj, ...ARR__class) {
	const ARR = []
	ARR.push(...ARR__class)
	for (let key in obj) {
		if (obj[key]) ARR.push(key)
	}
	return ARR.join(' ')
}
/**
 * Assigns additional styles to the style attribute on the HTMLElement el.
 * @param {module:ctx-core/dom/lib~HTMLElement} el - Element to set style on. Existing styles are kept unless overwritten by obj.
 * @param {Object} styles - key/value pairs of the styles
 * @returns {module:ctx-core/dom/lib~HTMLElement}
 */
export function assign__style(el, styles) {
	const style__el = el.getAttribute('style') || ''
	const OBJ__styles = _OBJ__styles(style__el)
	el.setAttribute(
		'style',
		_style(assign(OBJ__styles, styles))
	)
	return el
}
/**
 * Returns class style attribute from obj
 * @param {Object} obj - key/value pairs of styles
 * @returns {string} style
 * @example
 * _style({position: 'absolute, left: '5px'}) // returns 'position: absolute; left: 5px;'
 */
export function _style(obj, ...ARR__style) {
	const ARR = []
	ARR.push(...ARR__style)
	for (let key in obj) {
		const value = obj[key]
		ARR.push(`${key}: ${value};`)
	}
	return ARR.join(' ')
}
/**
 * Parses a style string & returns an object with each style
 * @param {string} STR__style
 * @returns {Object} key/value pair of styles
 * @example
 * $styles__obj('position: absolute; left: 5px;') // returns {position: 'absolute, left: '5px'}
 */
export function _OBJ__styles(STR__style) {
	const ARR__STR__style = (STR__style || '').split(/ *; */)
	const OBJ__styles = {}
	for (let i = 0; i < ARR__STR__style.length; i++) {
		const STR__style__i = ARR__STR__style[i]
		if (!STR__style__i) continue
		const [name__style, value__style] = STR__style__i.split(/ *: */)
		OBJ__styles[name__style] = value__style
	}
	return OBJ__styles
}
/**
 * Returns a string of escaped html
 * @param {string} unsafe
 * @returns {XML|string} - Escaped HTML
 */
export function _html(unsafe) {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}
/**
 * html for css link tags
 * @returns {string}
 */
export function _html__links() {
	log(`${logPrefix}|$html__links`)
	const ctx = assign({
		css: [],
		indentation: '',
		indentFirstLine: true
	}, ...arguments)
	const {
		css,
		indentation,
		indentFirstLine
	} = ctx
	let ARR__html__links = []
	for (let i = 0; i < css.length; i++) {
		const cssFile = css[i]
		ARR__html__links.push(
			`${
				(i || indentFirstLine) ? indentation : ''
				}<link rel="stylesheet" type="text/css" href="${cssFile}">`
		)
	}
	return ARR__html__links.join('\n')
}
/**
 * html for js script tags
 * @returns {string}
 */
export function _html__js() {
	log(`${logPrefix}|_html__js`)
	const ctx =
		assign(
			{
				js: [],
				indentation: '',
				indentFirstLine: true
			},
			...arguments)
	const { indentation } = ctx
	const script = ctx.script || ctx.js
	let ARR__html__js = []
	for (let i = 0; i < script.length; i++) {
		const jsFile = script[i]
		ARR__html__js.push(
			`${indentation}<script type="text/javascript" src="${jsFile}"></script>`
		)
	}
	return ARR__html__js.join('\n')
}
/**
 * versioned css file url
 * @param src__script
 */
export function _css__path__versioned(src__script) {
	log(`${logPrefix}|$js$path__versioned`)
	const extName = '.css'
	return _versioned(`${src__script}${extName}`)
}
/**
 *
 * @param {module:ctx-core/object/lib~ctx}
 * @param src__script
 * @param opts
 * @returns {string}
 */
export function _versioned__js(ctx, src__script, opts = {}) {
	const extName = (!opts.debug && ctx.minify) ? '.min.js' : '.js'
	return _versioned(ctx, `${src__script}${extName}`)
}
/**
 * versioned file
 * @param {module:ctx-core/object/lib~ctx}
 * @param {string} url
 * @returns {string}
 */
export function _versioned(ctx, url) {
	log(`${logPrefix}|versioned`)
	return `${url}?${_query__version(ctx)}`
}
/**
 * _versioned with ctx
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string}
 */
export function __versioned(ctx) {
	log(`${logPrefix}|$$versioned`)
	return function _versioned__versioned() {
		return _versioned(ctx, ...arguments)
	}
}
/**
 * version query param
 * @returns {string}
 */
export function _query__version(ctx) {
	return `v=${encodeURIComponent(_version(ctx))}`
}
