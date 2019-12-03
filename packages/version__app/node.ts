import {
	_version,
	_versioned__js as _versioned__js__,
} from './lib'
export { _version }
export function _versioned__js(src__script, opts = {}) {
	return _versioned__js__(src__script, opts)
}
/**
 * versioned file
 * @param {string} url
 * @returns {string}
 */
export function _versioned(url) {
	return `${url}?${_query__version()}`
}
/**
 * version query param
 * @returns {string}
 */
export function _query__version() {
	return `v=${encodeURIComponent(_version())}`
}
