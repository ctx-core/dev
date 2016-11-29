import env,{process$env$} from 'ctx-core/env'
import {assign} from 'ctx-core/object/lib'
import {$version__papaparse} from 'ctx-core/papaparse/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/papaparse/lib'
log(`${logPrefix}|assign__url__papaparse`)
assign(env, {
  PAPAPARSE__URL:
    process$env$('PAPAPARSE_URL')
    || `https://cdnjs.cloudflare.com/ajax/libs/PapaParse/${$version__papaparse()}/papaparse.js`
})
