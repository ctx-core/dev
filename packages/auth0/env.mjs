import env, {
	_env__process,
	throw__missing__env,
	assign__env
} from '@ctx-core/env/env.mjs'
import { log, debug } from '@ctx-core/logger/lib.mjs'
const logPrefix = '@ctx-core/auth0/env.mjs'
log(logPrefix)
if (!env.AUTH0_CLIENT_ID) throw__missing__env('AUTH0_CLIENT_ID')
if (!env.AUTH0_DOMAIN) throw__missing__env('AUTH0_DOMAIN')
const AUTH0_URL =
	env.AUTH0_URL
	|| _env__process('AUTH0_URL')
	|| _AUTH0_URL()
const AUTH0_LOCK_URL =
	env.AUTH0_LOCK_URL
	|| _env__process('AUTH0_LOCK_URL')
	|| _AUTH0_LOCK_URL()
assign__env({
	AUTH0_URL,
	AUTH0_LOCK_URL
})
export default env
export function _AUTH0_URL() {
  return 'https://cdn.auth0.com/js/auth0/9.7.3/auth0.min.js'
//  return 'https://cdn.auth0.com/js/auth0/8.4.0/auth0.min.js'
}
export function _AUTH0_LOCK_URL() {
	return 'https://cdn.auth0.com/js/lock/11.6.1/lock.min.js'
//	return 'https://cdn.auth0.com/js/lock/10.13.0/lock.min.js'
}