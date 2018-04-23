import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {agent__authentication} from 'auth/agent.mjs'
import {mount__authentication} from 'ctx-core/auth/tag.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/session/ctx-session.mjs'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  mount__authentication(tag, {agent__authentication})
}