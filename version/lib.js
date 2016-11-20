import env from 'ctx-core/version/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/version/lib'
export function $version() {
  return env.CACHE_VERSION
}