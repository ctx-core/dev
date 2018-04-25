import env, {_env__process} from 'ctx-core/env.mjs'
import {assign} from 'ctx-core/object/lib.mjs'
import {_version__papaparse} from 'ctx-core/papaparse/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/papaparse/env.mjs'
log(logPrefix)
const PAPAPARSE__URL =
				env.PAPAPARSE__URL
				|| _env__process('PAPAPARSE_URL')
				|| `https://cdnjs.cloudflare.com/ajax/libs/PapaParse/${_version__papaparse()}/papaparse.js`
assign(env, {
	PAPAPARSE__URL
})
export default env