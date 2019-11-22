import { throw__missing__env } from '@ctx-core/env/env'
import { _AUTH0_URL } from './package'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/auth0/env'
log(logPrefix)
export const AUTH0_URL = _AUTH0_URL()
if (!process.env.AUTH0_CLIENT_ID) throw__missing__env('AUTH0_CLIENT_ID')
if (!process.env.AUTH0_DOMAIN) throw__missing__env('AUTH0_DOMAIN')
