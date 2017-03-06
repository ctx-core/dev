import {tag__assign} from 'ctx-core/riot/tag'
import {mount__router__quovo} from 'ctx-core/quovo-demo/route'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/quovo-demo-page'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  mount__router__quovo(tag)
}