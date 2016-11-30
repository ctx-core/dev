import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/google/lib'
export function push__dataLayer() {
  log(`${logPrefix}|push__dataLayer`)
  dataLayer.push(...arguments)
}
export function ga$() {
  log(`${logPrefix}|ga$`)
  ga(...arguments)
}