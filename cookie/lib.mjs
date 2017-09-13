/**
 * @module ctx-core/cookies/lib
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework}
 */
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/cookie/lib'
export function get__cookie(key) {
  log(`${logPrefix}|get__cookie`, key)
  if (!key) return null
  const _key = encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&')
      , regex =
          new RegExp(
            `(?:(?:^|.*;)\\s*${_key}\\s*\\=\\s*([^;]*).*$)|^.*$`)
  return decodeURIComponent(document.cookie.replace(regex, '$1')) || null
}
export function set__cookie(key, value, opts={}) {
  log(`${logPrefix}|set__cookie`, key)
  const {expires, path, domain, schedule} = opts
  if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) return false
  let _expires = ''
  if (expires) {
    switch (expires.constructor) {
      case Number:
        _expires =
          expires === Infinity
          ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
          : `; max-age=${expires}`
        break
      case String:
        _expires = `; expires=${expires}`
        break
      case Date:
        _expires = `; expires=${expires.toUTCString()}`
        break
    }
  }
  const _key = encodeURIComponent(key)
      , _value = encodeURIComponent(value)
      , _domain = domain ? `; domain=${domain}` : ''
      , _path = path ? `; path=${path}` : ''
      , _schedule = schedule ? '; secure' : ''
  document.cookie =
    `${_key}=${_value}${_expires}${_domain}${_path}${_schedule}`
  return true
}
export function remove__cookie(key, opts={}) {
  log(`${logPrefix}|remove__cookie`, key)
  if (!has__cookie(key)) { return false; }
  const _key = encodeURIComponent(key)
      , {domain,path} = opts
      , _domain = domain ? `; domain=${domain}` : ''
      , _path = path ? `; path=${path}` : ''
  document.cookie =
    `${_key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${_domain}${_path}`
  return true;
}
export function has__cookie(key) {
  log(`${logPrefix}|has__cookie`, key)
  if (!key) return false
  const _key = encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&')
      , regex =
        new RegExp(`(?:^|;\\s*)${_key}\\s*\\=`)
  return regex.test(document.cookie)
}
export function keys__cookie() {
  log(`${logPrefix}|keys__cookie`)
  const keys =
          document.cookie
            .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
            .split(/\s*(?:\=[^;]*)?;\s*/)
  for (let len=keys.length, i=0; i < len; i++) {
    keys[i] = decodeURIComponent(keys[i])
  }
  return keys
}