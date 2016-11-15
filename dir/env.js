import env from 'ctx-core/env'
import {assign__env
      , process$env$} from 'ctx-core/env'
import {log,debug} from 'ctx-core/logger/lib'
const {PWD} = env
    , TMP_DIR =
        process$env$('TMP_DIR')
        || `${PWD}/tmp`
    , logPrefix = 'ctx-core/dir/env'
log(logPrefix)
assign__env({TMP_DIR})
export default env