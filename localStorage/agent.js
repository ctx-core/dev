import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/localStorage/agent'
export function init__localStorage__agent(agent) {
  log(`${logPrefix}|getItem__localStorage__agent`)
  const {scope} = agent
      , scope$0 = scope[0]
  const json = localStorage.getItem(scope$0)
  if (json) {
    let $ = {}
    $[scope$0] = JSON.parse(json)
    agent.set($)
  }
  return agent
}
export function store__localStorage__agent(agent) {
  log(`${logPrefix}|store__localStorage__agent`)
  const {ctx,scope} = agent
      , scope$0 = scope[0]
      , value = ctx[scope$0]
  if (value) {
    localStorage.setItem(scope$0, JSON.stringify(value))
  } else {
    localStorage.removeItem(scope$0)
  }
  return agent
}