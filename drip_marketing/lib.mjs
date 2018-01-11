import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/drip_marketing/lib.mjs'
export function push__drip() {
  log(`${logPrefix}|push__drip`)
  if (typeof window._dcq !== 'undefined') {
    _dcq.push(...arguments)
  }
}