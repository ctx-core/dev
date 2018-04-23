import {$atob} from 'ctx-core/atob/lib.mjs'
import {throw__bad_credentials} from 'ctx-core/error/lib.mjs'
import {$now__millis} from 'ctx-core/time/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/jwt/lib.mjs'
export function $token__jwt__authorization__header(authorization__header) {
  const array__authorization__header =
          authorization__header
          && authorization__header.split(/^Bearer */)
      , token__jwt =
          array__authorization__header
          && array__authorization__header[1]
  return token__jwt
}
export function validate__current__jwt(token__jwt) {
  log(`${logPrefix}|validate__current__jwt`)
  const exp__token__jwt = $exp__token__jwt(token__jwt)
      , exp__token__jwt__millis =
          exp__token__jwt * 1000
      , now__millis = $now__millis()
  if (now__millis > exp__token__jwt__millis) {
    throw__bad_credentials(ctx, {
      error_message:
        'Expired token__jwt'
    })
  }
}
export function $exp__token__jwt(token__jwt) {
  const atob = $atob()
      , data__jwt =
          JSON.parse(
            atob(
              token__jwt.split('.')[1]))
      , {exp} = data__jwt
  return exp
}