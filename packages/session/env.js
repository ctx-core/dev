import env, {
	assign__env,
	_env__process,
	throw__missing__env
} from '@ctx-core/env/env.js'
assign__env({
	SESSION_KEY:
		env.SESSION_KEY
		|| _env__process('SESSION_KEY')
		|| throw__missing__env('SESSION_KEY')
})
export default env