import {tag__assign} from 'ctx-core/riot/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/color-bar/ctx-quartile-color-bar'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag)
  const {opts} = tag
      , { agentkey } = opts
      , {ctx} = tag
      , agent = agentkey && ctx[agentkey]
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    if (agent) agent.on('change', on$change__agent)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    if (agent) agent.off('change', on$change__agent)
  }
  function on$change__agent() {
    log(`${logPrefix}|on$change__agent`)
    tag.update__ctx()
  }
}