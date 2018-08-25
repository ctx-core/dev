import env from '@ctx-core/env/env.mjs'
import { assign } from '@ctx-core/object/lib.mjs'
import { _version } from '@ctx-core/package/lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/core-js/env.mjs'
log(logPrefix)
assign(env, {
	URL__SHIM__CORE_JS: _URL__SHIM__CORE_JS()
})
export default env
export function _version__core_js() {
	return _version('core-js')
}
export function _URL__SHIM__CORE_JS() {
  return `https://cdnjs.cloudflare.com/ajax/libs/core-js/${_version__core_js()}/shim.min.js`
}