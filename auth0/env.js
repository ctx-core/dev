import env,{process$env$,throw__env$missing,assign__env} from 'ctx-core/env'
import {assign} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/env'
log(logPrefix)
assign(env, {
  AUTH0_URL:
    process$env$('AUTH0_URL')
    || 'https://cdn.auth0.com/js/lock/10.8/lock.min.js'
})
const AUTH0_CLIENT_ID =
        env.AUTH0_CLIENT_ID
        || process$env$('AUTH0_CLIENT_ID')
        || throw__env$missing('AUTH0_CLIENT_ID')
    , AUTH0_DOMAIN =
        env.AUTH0_DOMAIN
        || process$env$('AUTH0_DOMAIN')
        || throw__env$missing('AUTH0_DOMAIN')
assign__env({
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN
})
export default env