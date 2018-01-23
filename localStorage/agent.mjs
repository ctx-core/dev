import {log,warn,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/localStorage/agent.mjs'
export function init__localStorage__agent(agent, scope__) {
  log(`${logPrefix}|init__localStorage__agent`, scope__)
  const json = localStorage.getItem(scope__)
  if (json) {
    let value = {}
    try {
      value[scope__] = JSON.parse(json)
    } catch(e) {
      warn(`${logPrefix}|init__localStorage__agent|error|JSON.parse`)
      warn(e)
    }
    agent.set(value)
  }
  return agent
}
export function store__localStorage__agent(agent, scope__) {
  log(`${logPrefix}|store__localStorage__agent`, scope__)
  const {ctx} = agent
      , value = ctx[scope__]
  if (value == null) {
    localStorage.removeItem(scope__)
  } else {
    localStorage.setItem(scope__, JSON.stringify(value))
  }
  return agent
}