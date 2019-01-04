import env, { _env__process } from '@ctx-core/env/env.js'
import { assign } from '@ctx-core/object/lib.js'
import { _version__papaparse } from './lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/papaparse/env.js'
log(logPrefix)
const PAPAPARSE__URL =
	env.PAPAPARSE__URL
	|| _env__process('PAPAPARSE_URL')
	|| `https://cdnjs.cloudflare.com/ajax/libs/PapaParse/${_version__papaparse()}/papaparse.js`
assign(env, {
	PAPAPARSE__URL
})
export default env