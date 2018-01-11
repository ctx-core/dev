import {get__cookie
      , set__cookie
      , remove__cookie} from 'ctx-core/cookie/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/cookie/agent.mjs'
export function init__cookie__agent(agent) {
  log(`${logPrefix}|init__cookie__agent`, agent.key)
  const {scope} = agent
      , key = scope[0]
      , json = get__cookie(key)
  if (json) {
    let $ = {}
    $[key] = JSON.parse(json)
    agent.set($)
  }
  return agent
}
export function store__cookie__agent(agent, opts={}) {
  log(`${logPrefix}|store__cookie__agent`, agent.key)
  const {ctx,scope} = agent
      , key = scope[0]
      , value = ctx[key]
  if (value) {
    set__cookie(key, JSON.stringify(value), opts)
  } else {
    remove__cookie(key, opts)
  }
  return agent
}