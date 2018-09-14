import env, { assign__env } from '@ctx-core/env/env.mjs'
import '@ctx-core/version__app/env.mjs'
import { _FETCH_URL } from './package.mjs'
assign__env({
	FETCH_URL: _FETCH_URL()
})
export default env
