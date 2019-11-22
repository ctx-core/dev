import '@ctx-core/env/env'
import { _version__package } from '@ctx-core/package'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/babel/lib.js'
log(logPrefix)
export const BABEL__POLYFILL__URL =
	`https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/${_version__babel_polyfill()}/polyfill.min.js`
export function _version__babel_polyfill() {
	log(`${logPrefix}|$version__babel_polyfill`)
	return _version__package('babel-polyfill')
}
