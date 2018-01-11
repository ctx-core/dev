import env, {$env__process} from 'ctx-core/env'
import {assign} from 'ctx-core/object/lib'
import {$version__papaparse} from 'ctx-core/papaparse/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/papaparse/env.mjs'
log(logPrefix)
const PAPAPARSE__URL =
        env.PAPAPARSE__URL
        || $env__process('PAPAPARSE_URL')
        || `https://cdnjs.cloudflare.com/ajax/libs/PapaParse/${$version__papaparse()}/papaparse.js`
assign(env, {
  PAPAPARSE__URL
})
export default env