import env from 'ctx-core/env'
import {assign__env
      , process$env$} from 'ctx-core/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'auth/env'
log(logPrefix)
const RELEASE_VERSION =
        process$env$(
          'HEROKU_RELEASE_VERSION',
          'RELEASE_VERSION')
    , SOURCE_VERSION = process$env$('SOURCE_VERSION')
    , CACHE_VERSION =
        process$env$('CACHE_VERSION')
        || (RELEASE_VERSION && RELEASE_VERSION.replace('v', ''))
        || SOURCE_VERSION
        || Math.random().toString()
assign__env({
  RELEASE_VERSION,
  SOURCE_VERSION,
  CACHE_VERSION
})
export default env