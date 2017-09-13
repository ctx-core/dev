/**
 * @typedef ctx-core/uri/lib
 */
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/uri/lib'
/**
 * Converts a urn to a url
 * @param {string} uri
 * @returns {string}
 * @see {@link https://danielmiessler.com/study/url-uri/}
 */
export function $url__urn(uri) {
  log(`${logPrefix}|$url__urn`)
  if (!uri) return uri
  if (
    uri.indexOf('//') === 0
    || uri.indexOf('http://') === 0
    || uri.indexOf('https://') === 0
  ) return uri
  return `//${uri}`
}