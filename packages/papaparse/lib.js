import { _version__package } from '@ctx-core/package'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/papaparse/lib.js'
export function _version__papaparse() {
	log(`${logPrefix}|_version__papaparse`)
	return _version__package('papaparse')
}