import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {mount__router__quovo} from 'ctx-core/quovo-demo/route'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo-demo/quovo-demo-page.mjs'
export function init(tag) {
  log(`${logPrefix}|init`)
  const {ctx} = tag
  tag__assign(tag)
  mount__router__quovo(ctx)
}