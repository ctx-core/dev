import { throw__missing__env } from '@ctx-core/env/env.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/auth0/env.js'
log(logPrefix)
if (!process.env.AUTH0_CLIENT_ID) throw__missing__env('AUTH0_CLIENT_ID')
if (!process.env.AUTH0_DOMAIN) throw__missing__env('AUTH0_DOMAIN')
