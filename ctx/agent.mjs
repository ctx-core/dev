import {reinit__agent} from 'ctx-core/agent/lib'
import observable from 'ctx-core/observable/observable'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/ctx/agent.mjs'
export function ensure__agent__agents(ctx) {
  if (ctx.agent__agents) return ctx.agent__agents
  const agent = {ctx}
      , reinit = reinit__agent
  observable(agent)
  reinit.call(agent, {
    key: 'agent__agents',
    scope: ['agents', 'agents__by__scope'],
    reset,
    add,
    $agents__change
  })
  return agent
  function reset() {
    log(`${logPrefix}|ensure__agent__agents|reset`)
    const agents = []
        , agents__by__scope = {}
    for (let key in ctx) {
      const maybe__agent = ctx[key]
          , type__maybe__agent =
              maybe__agent
              && maybe__agent.type
      if (type__maybe__agent === 'agent') {
        add__(maybe__agent, agents, agents__by__scope)
      }
    }
    agent.set({agents, agents__by__scope})
  }
  function add(agent__) {
    log(`${logPrefix}|ensure__agent__agents|add`)
    const {agents, agents__by__scope} = ctx
    add__(agent__, agents, agents__by__scope)
    return agent
  }
  function add__(agent__, agents, agents__by__scope) {
    const {scope} = agent__
    agents.push(agent__)
    for (let i=0; i < scope.length; i++) {
      const scope__ = scope[i]
      agents__by__scope[scope__] =
        agents__by__scope[scope__]
        || []
      agents__by__scope[scope__].push(agent__)
    }
  }
  function $agents__change(ctx__change) {
    const {agents__by__scope} = ctx
        , set__agents__change = new Set()
    for (let scope__ in ctx__change) {
      const agents__ =
              agents__by__scope[scope__]
              || []
      for (let i=0; i < agents__.length; i++) {
        const agent__ = agents__[i]
        set__agents__change.add(agent__)
      }
    }
    return Array.from(set__agents__change)
  }
}