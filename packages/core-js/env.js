import env from '@ctx-core/env/env.js'
import { assign } from '@ctx-core/object/lib.js'
import { _URL__SHIM__CORE_JS } from './lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/core-js/env.js'
log(logPrefix)
assign(env, {
	URL__SHIM__CORE_JS: _URL__SHIM__CORE_JS()
})
export default env
