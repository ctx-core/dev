/**
 * btoa helper functions
 * @module ctx-core/btoa/lib
 */
import {no__dom} from 'ctx-core/dom/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/btoa/lib.mjs'
export function $Uint32Array__btoa(b64) {
  log(`${logPrefix}|$Uint32Array__btoa`)
  const btoa = $btoa()
      , $ = btoa(b64)
      , {length} = $
  let Uint32Array__btoa = new Uint32Array(length)
  for(let i=0; i < length; i++) {
    Uint32Array__btoa[i] = $.charCodeAt(i)
  }
  return Uint32Array__btoa
}
export function $btoa() {
  const btoa =
          no__dom()
          ? require('btoa-lite')
          : window.btoa
  return btoa
}