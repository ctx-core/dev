import env, { assign__env } from '@ctx-core/env/env'
import '@ctx-core/version__app/env.js'
import { _FETCH_URL } from './package.js'
assign__env({
	FETCH_URL: _FETCH_URL()
})
export default env
