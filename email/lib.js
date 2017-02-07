import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/email/lib'
export function valid__email(email) {
  log(`${logPrefix}|valid__email`)
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}