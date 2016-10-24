import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/fb/html'
export function $attrs__head__fb() {
  log(`${logPrefix}|$attrs__head__fb`)
  return {
          prefix:
            'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# business: http://ogp.me/ns/business#'}
}