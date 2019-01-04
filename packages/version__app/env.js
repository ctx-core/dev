import env from '@ctx-core/env/env.js'
import {
	assign__env,
	_env__process
} from '@ctx-core/env/env.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/version__app/env.js'
log(logPrefix)
const RELEASE_VERSION =
	_env__process(
		'HEROKU_RELEASE_VERSION',
		'RELEASE_VERSION')
const SOURCE_VERSION = _env__process('SOURCE_VERSION')
const CACHE_VERSION =
	_env__process('CACHE_VERSION')
	|| (RELEASE_VERSION && RELEASE_VERSION.replace('v', ''))
	|| SOURCE_VERSION
	|| Math.random().toString()
assign__env({
	RELEASE_VERSION,
	SOURCE_VERSION,
	CACHE_VERSION
})
export default env