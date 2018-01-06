import {tag__assign} from 'ctx-core/riot/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/color-bar/ctx-color-bar'
log(logPrefix)
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const { agentkey } = tag.opts
      , {ctx} = tag
      , agent = agentkey && ctx[agentkey]
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    if (agent) agent.on('change', __change__agent)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    if (agent) agent.off('change', __change__agent)
  }
  function __change__agent() {
    log(`${logPrefix}|__change__agent`)
    tag.update()
  }
}