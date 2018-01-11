const {$version} = require('ctx-core/package/lib')
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/papaparse/lib.mjs'
export function $version__papaparse() {
  log(`${logPrefix}|$version__papaparse`)
  return $version('papaparse')
}