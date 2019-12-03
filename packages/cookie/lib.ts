/**
 * @module @ctx-core/cookies/lib
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework}
 */
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/cookie/lib.js'
export function get__cookie(key) {
	log(`${logPrefix}|get__cookie`, key)
	if (!key) return null
	const key__ = encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&')
	const regex =
		new RegExp(
			`(?:(?:^|.*;)\\s*${key__}\\s*\\=\\s*([^;]*).*$)|^.*$`)
	return (
		decodeURIComponent(
			document.cookie.replace(regex, '$1'))
		|| null
	)
}
type Opts__set__cookie = {
	expires?:number|string|Date
	path?:string
	domain?:string
	schedule?:string
}
export function set__cookie(key, value, opts:Opts__set__cookie = {}) {
	log(`${logPrefix}|set__cookie`, key)
	const {
		expires,
		path,
		domain,
		schedule
	} = opts
	if (
		!key
		|| (
			/^(?:expires|max\-age|path|domain|secure)$/i
				.test(key)
		)
	)
		return false
	let expires__ = ''
	if (expires) {
		switch (expires.constructor) {
			case Number:
				expires__ =
					expires === Infinity
					? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
					: `; max-age=${expires}`
				break
			case String:
				expires__ = `; expires=${expires}`
				break
			case Date:
				expires__ = `; expires=${(expires as Date).toUTCString()}`
				break
		}
	}
	const key__ = encodeURIComponent(key)
	const value__ = encodeURIComponent(value)
	const domain__ =
		domain
		? `; domain=${domain}`
		: ''
	const path__ =
		path
		? `; path=${path}`
		: ''
	const schedule__ =
		schedule
		? '; secure'
		: ''
	document.cookie =
		`${key__}=${value__}${expires__}${domain__}${path__}${schedule__}`
	return true
}
type Opts__remove__cookie = {
	domain?:string
	path?:string
}
export function remove__cookie(key, opts:Opts__remove__cookie = {}) {
	log(`${logPrefix}|remove__cookie`, key)
	if (!has__cookie(key)) { return false }
	const key__ = encodeURIComponent(key)
	const { domain, path } = opts
	const domain__ =
		domain
		? `; domain=${domain}`
		: ''
	const path__ =
		path
		? `; path=${path}`
		: ''
	document.cookie =
		`${key__}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${domain__}${path__}`
	return true
}
export function has__cookie(key) {
	log(`${logPrefix}|has__cookie`, key)
	if (!key) return false
	const key__ = encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&')
	const regex = new RegExp(`(?:^|;\\s*)${key__}\\s*\\=`)
	return regex.test(document.cookie)
}
export function keys__cookie() {
	log(`${logPrefix}|keys__cookie`)
	const keys =
		document.cookie
			.replace(
				/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,
				'')
			.split(
				/\s*(?:\=[^;]*)?;\s*/)
	for (let length = keys.length, i = 0; i < length; i++) {
		keys[i] = decodeURIComponent(keys[i])
	}
	return keys
}
