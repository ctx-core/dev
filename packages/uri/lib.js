/**
 * @typedef ctx-core/uri/lib
 */
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/uri/lib.js'
/**
 * Converts a urn to a url
 * @param {string} uri
 * @returns {string}
 * @see {@link https://danielmiessler.com/study/url-uri/}
 */
export function _url__urn(uri) {
	log(`${logPrefix}|_url__urn`)
	if (!uri) return uri
	if (
		uri.indexOf('//') === 0
		|| uri.indexOf('http://') === 0
		|| uri.indexOf('https://') === 0
	) return uri
	return `//${uri}`
}
export function _str__query(query={}) {
  const a1__STR__query = []
	for (let key in query) {
		a1__STR__query.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
	}
	return a1__STR__query.length ? `?${a1__STR__query.join('&')}` : ''
}
export function _filename__url(url) {
	if (!url) return url
	const location = url.split('?')[0]
	return location.split('/').pop()
}