import env, { assign__env } from '@ctx-core/env/env.mjs'
import '@ctx-core/version__app/env.mjs'
import cdnjs from './cdnjs.json'
assign__env({
	FETCH_URL: _FETCH_URL()
})
export default env
export function _FETCH_URL() {
	return `https://cdnjs.cloudflare.com/ajax/libs/fetch/${cdnjs.version}/fetch.js`
}