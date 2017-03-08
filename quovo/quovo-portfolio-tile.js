import {tag__assign} from 'ctx-core/riot/tag'
import {mount__route} from 'ctx-core/route/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-tile'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  mount__route(tag, {
    on$change__route
  })
  function on$change__route() {
    log(`${logPrefix}|on$change__route`)
    tag.update()
  }
}