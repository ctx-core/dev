import env from '@ctx-core/env/env.mjs'
import { assign } from '@ctx-core/object/lib.mjs'
import { _URL__SHIM__CORE_JS } from './lib.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/core-js/env.mjs'
log(logPrefix)
assign(env, {
	URL__SHIM__CORE_JS: _URL__SHIM__CORE_JS()
})
export default env
