/**
 * atob helper functions
 * @module ctx-core/atob/lib
 */
import atob from 'atob-lite'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/atob/lib.mjs'
export function $Uint32Array__atob(b64) {
  log(`${logPrefix}|$Uint32Array__atob`)
  const $ = atob(b64)
      , {length} = $
  let $$ = new Uint32Array(length)
  for(let i=0; i < length; i++) {
    $$[i] = $.charCodeAt(i)
  }
  return $$
}