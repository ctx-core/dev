import {assign,pick} from 'ctx-core/object/lib'
import {throw__unauthorized} from 'ctx-core/error/lib'
import {log,error,debug} from 'ctx-core/logger/lib'
import env from 'ctx-core/env'
const {whitelist_salt} = env
    , logPrefix = 'ctx-core/security/lib'
export function pick__whitelist(ctx, ...keys) {
  log(`${logPrefix}|pick__whitelist`)
  return pick(ctx, ...keys)
}
export function assert__whitelist_salt() {
  log(`${logPrefix}|assert__whitelistSalt`)
  const ctx = assign(...arguments)
  if (ctx.whitelist_salt !== whitelist_salt) {
    error(`${logPrefix}|assert__whitelistSalt|error`)
    throw__unauthorized(ctx)
  }
  return ctx
}
