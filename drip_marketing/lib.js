import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/drip_marketing/lib'
export function push__drip() {
  log(`${logPrefix}|push__dcq`)
  if (typeof window._dcq !== 'undefined') {
    _dcq.push(...arguments)
  }
}