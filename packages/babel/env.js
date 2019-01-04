import { assign } from '@ctx-core/object/lib.js'
import env from '@ctx-core/env/env.js'
const { _version__package } = require('@ctx-core/package/lib.js')
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/babel/lib.js'
log(logPrefix)
assign(env, {
	BABEL__POLYFILL__URL:
		`https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/${_version__babel_polyfill()}/polyfill.min.js`
})
export default env
export function _version__babel_polyfill() {
	log(`${logPrefix}|$version__babel_polyfill`)
	return _version__package('babel-polyfill')
}