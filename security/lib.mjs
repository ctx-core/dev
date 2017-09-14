import {pick} from 'ctx-core/object/lib'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/security/lib'
export function pick__whitelist(ctx, ...keys) {
  log(`${logPrefix}|pick__whitelist`)
  return pick(ctx, ...keys)
}