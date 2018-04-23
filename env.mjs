if (typeof window === 'object') {
  throw 'env cannot be run in browser environments'
}
require('ctx-core/package/lib.js').verify__version__node()
import {assign,clone} from 'ctx-core/object/lib.mjs'
import {throw__error} from 'ctx-core/error/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/env.mjs'
log(logPrefix)
export const env__process = process.env
if (!env__process.NODE_ENV) {
  require('dotenv').config()
  if (!env__process.NODE_ENV) {
    throw__missing__env('NODE_ENV')
  }
}
const localhost = $env__process('LOCALHOST')
    , isLocalhost = !!localhost
    , WEB_CONCURRENCY =
        $env__process('WEB_CONCURRENCY')
        || 4
    , NODE_ENV = $env__process('NODE_ENV')
let env = clone(env__process, {
  noJson: () => {},
  isDevelopment: NODE_ENV == 'development',
  isLocalhost: !!isLocalhost,
  isProduction: NODE_ENV == 'production',
  isTest: NODE_ENV == 'test',
  NODE_ENV: NODE_ENV,
  PORT: env__process.PORT || 3002,
  WEB_CONCURRENCY
})
env.minify =
  !env.isLocalhost
  && !env.isTest
export default env
export {env}
export function assign__env() {
  return assign(env, ...arguments)
}
export function assign__ctx__env(ctx) {
  return assign(ctx, env)
}
export function $env__process(...keys) {
  for (let i=0; i < keys.length; i++) {
    const key = keys[i]
        , env__process__ = env__process[key]
    if (env__process__ ) return env__process__
  }
}
export function throw__missing__env(name__env) {
  const error_message = [
          `${name__env} environment variable not set.`,
          `development: make sure ${name__env} is set in your .env file`,
          `heroku: make sure ${name__env} is set using \`heroku config:set\``
        ].join('\n')
  throw__error({}, {error_message})
}