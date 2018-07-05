import { assign } from 'ctx-core/object/lib.mjs'
import env from 'ctx-core/env.mjs'
const { _version } = require('ctx-core/package/lib.js')
import { log, debug } from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/babel/lib.mjs'
log(logPrefix)
assign(env, {
	BABEL__POLYFILL__URL:
		`https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/${_version__babel_polyfill()}/polyfill.min.js`
})
export default env
export function _version__babel_polyfill() {
	log(`${logPrefix}|$version__babel_polyfill`)
	return _version('babel-polyfill')
}