import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/localStorage/agent.mjs'
export function init__agent__localStorage(agent) {
  log(`${logPrefix}|init__agent__localStorage`, agent.key)
  const {scope} = agent
      , scope$0 = scope[0]
      , json = localStorage.getItem(scope$0)
  if (json) {
    let $ = {}
    $[scope$0] = JSON.parse(json)
    agent.set($)
  }
  return agent
}
export function store__agent__localStorage(agent) {
  log(`${logPrefix}|store__agent__localStorage`, agent.key)
  const {ctx,scope} = agent
      , key = scope[0]
      , value = ctx[key]
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.removeItem(key)
  }
  return agent
}