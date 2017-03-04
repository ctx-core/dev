import {
  debug__chalk,
  log__chalk,
  info__chalk,
  warn__chalk,
  error__chalk} from 'ctx-core/logger/chalk'
export function debug() {
  return debug__chalk($timestamp(), ...arguments)
}
export function log() {
  return log__chalk($timestamp(), ...arguments)
}
export function info() {
  return info__chalk($timestamp(), ...arguments)
}
export function warn() {
  return warn__chalk($timestamp(), ...arguments)
}
export function error() {
  return error__chalk($timestamp(), ...arguments)
}
export const error__log = error
function $timestamp() {
  return (new Date()).toISOString()
}
export function $log(message, fn) {
  return function() {
    log(message)
    return fn.apply(this, arguments)
  }
}
export function $console(fn, log$ctx) {
  return function() {
    for (let key in log$ctx) {
      console[key](log$ctx[key])
    }
    return fn.apply(this, arguments)
  }
}