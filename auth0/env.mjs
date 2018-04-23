import  env
      , { $env__process
        , throw__missing__env
        , assign__env} from 'ctx-core/env.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/auth0/env.mjs'
log(logPrefix)
if (!env.AUTH0_CLIENT_ID) throw__missing__env('AUTH0_CLIENT_ID')
if (!env.AUTH0_DOMAIN) throw__missing__env('AUTH0_DOMAIN')
const AUTH0_URL =
        env.AUTH0_URL
        || $env__process('AUTH0_URL')
        || 'https://cdn.auth0.com/js/auth0/8.4.0/auth0.min.js'
    , AUTH0_LOCK_URL =
        env.AUTH0_LOCK_URL
        || $env__process('AUTH0_LOCK_URL')
        || 'https://cdn.auth0.com/js/lock/10.13.0/lock.min.js'
assign__env({
  AUTH0_URL,
  AUTH0_LOCK_URL
})
export default env