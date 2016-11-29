import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/google/lib'
export function push__data__gtm() {
  log(`${logPrefix}|push__data__gtm`)
  data__gtm.push(...arguments)
}
export function ga$() {
  log(`${logPrefix}|ga$`)
  ga(...arguments)
}