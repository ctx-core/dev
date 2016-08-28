import co from 'co'
import {promise$catch} from 'ctx-core/promise/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/co/lib'
export function promise$catch__co(ctx, fn, ...args) {
  log(`${logPrefix}|promise$catch__co`)
  return promise$catch(ctx, co.wrap(fn)(...args))
}