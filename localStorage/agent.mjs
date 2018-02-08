import {log,warn,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/localStorage/agent.mjs'
export function $ctx__set__json__from__localStorage(agent, scope__) {
  log(`${logPrefix}|$ctx__set__json__from__localStorage`)
  const json = localStorage.getItem(scope__)
  if (json) {
    let ctx__set = {}
    try {
      ctx__set[scope__] = JSON.parse(json)
    } catch(e) {
      warn(`${logPrefix}|$ctx__set__json__from__localStorage|error|JSON.parse`)
      warn(e)
    }
    agent.set(ctx__set)
  }
  return agent
}
export function store__json__localStorage(ctx, scope__) {
  log(`${logPrefix}|store__json__localStorage`, scope__)
  const value = ctx[scope__]
  if (value == null) {
    localStorage.removeItem(scope__)
  } else {
    localStorage.setItem(scope__, JSON.stringify(value))
  }
  return ctx
}
export function $ctx__set__from__localStorage(scope__) {
  log(`${logPrefix}|$ctx__set__from__localStorage`, scope__)
  const text = localStorage.getItem(scope__)
      , ctx__set = {}
  if (text) {
    ctx__set[scope__] = text
  }
  return ctx__set
}
export function store__localStorage(ctx, scope__) {
  log(`${logPrefix}|store__localStorage`, scope__)
  const value = ctx[scope__]
  if (value == null) {
    localStorage.removeItem(scope__)
  } else {
    localStorage.setItem(scope__, value)
  }
  return ctx
}