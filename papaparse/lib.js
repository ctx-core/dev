import {version} from 'ctx-core/npm/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/papaparse/lib'
export function version__papaparse() {
  log(`${logPrefix}|version__papaparse`)
  return version({path: 'papaparse'})
}