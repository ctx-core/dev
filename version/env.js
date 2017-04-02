import env from 'ctx-core/env'
import {assign__env
      , $env__process} from 'ctx-core/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'auth/env'
log(logPrefix)
const RELEASE_VERSION =
        $env__process(
          'HEROKU_RELEASE_VERSION',
          'RELEASE_VERSION')
    , SOURCE_VERSION = $env__process('SOURCE_VERSION')
    , CACHE_VERSION =
        $env__process('CACHE_VERSION')
        || (RELEASE_VERSION && RELEASE_VERSION.replace('v', ''))
        || SOURCE_VERSION
        || Math.random().toString()
assign__env({
  RELEASE_VERSION,
  SOURCE_VERSION,
  CACHE_VERSION
})
export default env