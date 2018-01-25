/**
 * atob helper functions
 * @module ctx-core/atob/lib
 */
import {no__dom} from 'ctx-core/dom/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/atob/lib.mjs'
export function $Uint32Array__atob(b64) {
  log(`${logPrefix}|$Uint32Array__atob`)
  const atob = $atob()
      , $ = atob(b64)
      , {length} = $
  let Uint32Array__atob = new Uint32Array(length)
  for(let i=0; i < length; i++) {
    Uint32Array__atob[i] = $.charCodeAt(i)
  }
  return Uint32Array__atob
}
export function $atob() {
  const atob =
          no__dom()
          ? require('atob-lite')
          : window.atob
  return atob
}