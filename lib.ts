/**
 * @module @ctx-core/html/lib
 */
import { assign } from '@ctx-core/object'
import { _versioned } from '@ctx-core/version__app'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/html/lib.js'
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
export function _class(obj, ...a1__class) {
	const a1 = []
	a1.push(...a1__class)
	for (let key in obj) {
		if (obj[key]) a1.push(key)
	}
	return a1.join(' ')
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
export function _style(obj, ...a1__style) {
	const a1 = []
	a1.push(...a1__style)
	for (let key in obj) {
		const value = obj[key]
		a1.push(`${key}: ${value};`)
	}
	return a1.join(' ')
}
/**
 * Parses a style string & returns an object with each style
 * @param {string} str__style
 * @returns {Object} key/value pair of styles
 * @example
 * $styles__obj('position: absolute; left: 5px;') // returns {position: 'absolute, left: '5px'}
 */
export function _OBJ__styles(str__style) {
	const a1__str__style = (str__style || '').split(/ *; */)
	const obj__styles = {}
	for (let i = 0; i < a1__str__style.length; i++) {
		const str__style__i = a1__str__style[i]
		if (!str__style__i) continue
		const [name__style, value__style] = str__style__i.split(/ *: */)
		obj__styles[name__style] = value__style
	}
	return obj__styles
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
	let a1__html__links = []
	for (let i = 0; i < css.length; i++) {
		const cssFile = css[i]
		a1__html__links.push(
			`${
				(i || indentFirstLine) ? indentation : ''
				}<link rel="stylesheet" type="text/css" href="${cssFile}">`
		)
	}
	return a1__html__links.join('\n')
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
	let a1__html__js = []
	for (let i = 0; i < script.length; i++) {
		const jsFile = script[i]
		a1__html__js.push(
			`${indentation}<script type="text/javascript" src="${jsFile}"></script>`
		)
	}
	return a1__html__js.join('\n')
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
