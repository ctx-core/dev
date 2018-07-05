const { _version } = require('ctx-core/package/lib.js')
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/papaparse/lib.mjs'
export function _version__papaparse() {
	log(`${logPrefix}|_version__papaparse`)
	return _version('papaparse')
}