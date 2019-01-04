import env, {
	_env__process,
	throw__missing__env,
	assign__env
} from '@ctx-core/env/env.js'
import { _AUTH0_URL } from './package.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/auth0/env.js'
log(logPrefix)
if (!env.AUTH0_CLIENT_ID) throw__missing__env('AUTH0_CLIENT_ID')
if (!env.AUTH0_DOMAIN) throw__missing__env('AUTH0_DOMAIN')
const AUTH0_URL =
	env.AUTH0_URL
	|| _env__process('AUTH0_URL')
	|| _AUTH0_URL()
assign__env({ AUTH0_URL })
export default env
