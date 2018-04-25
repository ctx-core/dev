import	env
			, { assign__env
				, _env__process} from 'ctx-core/env.mjs'
import 'ctx-core/version__app/env.mjs'
import cdnjs from 'ctx-core/fetch/cdnjs.json'
const FETCH_URL =
				env.FETCH_URL
				|| _env__process('FETCH_URL')
				|| `https://cdnjs.cloudflare.com/ajax/libs/fetch/${cdnjs.version}/fetch.js`
assign__env({
	FETCH_URL
})
export default env