import env, {
	_env__process,
	throw__missing__env,
	assign__env
} from '@ctx-core/env/env'
import { _AUTH0_LOCK_URL } from './package.js'
if (!env.AUTH0_CLIENT_ID) throw__missing__env('AUTH0_CLIENT_ID')
if (!env.AUTH0_DOMAIN) throw__missing__env('AUTH0_DOMAIN')
const AUTH0_LOCK_URL =
	env.AUTH0_LOCK_URL
	|| _env__process('AUTH0_LOCK_URL')
	|| _AUTH0_LOCK_URL()
assign__env({ AUTH0_LOCK_URL })
export default env
