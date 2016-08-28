import env from 'ctx-core/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth/lib'
export function assign__assert__authorization() {
  log(`${logPrefix}|assign__assert__authorization`)
  assert__authorization__fn$$().push(...arguments)
}
export function *assert__authorization(ctx, ...rest) {
  log(`${logPrefix}|assert__authorization`)
  yield assert__authorization__fn$$().map(
   assert__authorization =>
     assert__authorization(ctx, ...rest))
}
export function assert__authorization__fn$$() {
  env.assert__authorization__fn$$ = env.assert__authorization__fn$$
    || []
  return env.assert__authorization__fn$$
}