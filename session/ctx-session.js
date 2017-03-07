import {tag__assign} from 'ctx-core/riot/tag'
import {authentication__agent} from 'auth/agent'
import {mount__authentication} from 'ctx-core/auth/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/session/ctx-session'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {ctx} = tag
  mount__authentication(tag, {authentication__agent})
}