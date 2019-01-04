const { _version__package } = require('@ctx-core/package/lib.js')
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/papaparse/lib.js'
export function _version__papaparse() {
	log(`${logPrefix}|_version__papaparse`)
	return _version__package('papaparse')
}