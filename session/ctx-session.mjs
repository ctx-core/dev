import {tag__assign} from 'ctx-core/riot/tag'
import {agent__authentication} from 'auth/agent'
import {mount__authentication} from 'ctx-core/auth/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/session/ctx-session'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  mount__authentication(tag, {agent__authentication})
}