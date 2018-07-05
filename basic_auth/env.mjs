import env, {
	assign__env,
	_env__process,
	throw__missing__env
} from 'ctx-core/env.mjs'
const { isLocalhost } = env
const BASIC_AUTH_LOGIN = env.BASIC_AUTH_LOGIN
	|| _env__process('BASIC_AUTH_LOGIN')
	|| (isLocalhost && throw__missing__env('BASIC_AUTH_LOGIN'))
	|| null
const BASIC_AUTH_PASSWORD = env.BASIC_AUTH_PASSWORD
	|| _env__process('BASIC_AUTH_PASSWORD')
	|| (isLocalhost && throw__missing__env('BASIC_AUTH_PASSWORD'))
	|| null
assign__env({
	BASIC_AUTH_LOGIN,
	BASIC_AUTH_PASSWORD
})
export default env