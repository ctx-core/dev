import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/fb/html'
export function $attrs__html__fb() {
  log(`${logPrefix}|$attrs__html__fb`)
  return {
    xmlns: 'http://www.w3.org/1999/xhtml',
    'xmlns:og': 'http://ogp.me/ns#',
    'xmlns:fb': 'https://www.facebook.com/2008/fbml'
  }
}