import env from 'ctx-core/env.mjs'
import {assign__env
      , $env__process} from 'ctx-core/env.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/version__app/env.mjs'
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