import env from 'ctx-core/env.mjs'
import {assign__env
      , _env__process} from 'ctx-core/env.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const {PWD} = env
    , TMP_DIR =
        env.TMP_DIR
        || _env__process('TMP_DIR')
        || `${PWD}/tmp`
    , logPrefix = 'ctx-core/dir/env'
log(logPrefix)
assign__env({TMP_DIR})
export default env