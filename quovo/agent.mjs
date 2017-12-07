import {assign} from 'ctx-core/object/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {ensure__agent__rpc} from 'ctx-core/agent/rpc'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/agent'
export function agent__users__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__users__quovo`)
  return agent__rpc__quovo(ctx, {
    key: 'agent__users__quovo',
    scope: ['users__quovo'],
    rpc: ['get__users__quovo']
  }, ...array__ctx__agent)
}
export function agent__user_id__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__user_id__quovo`)
  return ensure__agent(ctx, {
    key: 'agent__user_id__quovo',
    scope: ['user_id__quovo']
  }, ...array__ctx__agent)
}
export function agent__user__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__user__quovo`)
  let agent
  agent__user_id__quovo(ctx)
  agent__users__quovo(ctx)
  return ensure__agent(ctx, {
    key: 'agent__user__quovo',
    scope: ['user__quovo'],
    init
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__user__quovo|init`)
    agent = this
    ctx.agent__user_id__quovo.on('change',
      onchange__user_id__quovo)
    ctx.agent__users__quovo.on('change',
      onchange__users__quovo)
  }
  function onchange__user_id__quovo() {
    log(`${logPrefix}|agent__user__quovo|onchange__user_id__quovo`)
    set__agent()
  }
  function onchange__users__quovo() {
    log(`${logPrefix}|agent__user__quovo|onchange__users__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|agent__user__quovo|set__agent`)
    const {user_id__quovo} = ctx
        , users__quovo =
            ctx.users__quovo
            || []
    agent.set({
      user__quovo: users__quovo.find(
        user__quovo =>
          user__quovo.id === user_id__quovo)})
  }
}
export function agent__account__user__quovos(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__account__user__quovos`)
  let agent
  agent__user_id__quovo(ctx)
  return agent__rpc__quovo(ctx, {
    key: 'agent__account__user__quovos',
    scope: ['account__user__quovos'],
    rpc: ['get__account__user__quovos'],
    init,
    reset: reset__user_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__account__user__quovos|init`)
    agent = this
    ctx.agent__user_id__quovo.on('change',
      onchange__user_id__quovo)
  }
  function onchange__user_id__quovo() {
    log(`${logPrefix}|agent__account__user__quovos|onchange__user_id__quovo`)
    agent.restart()
  }
}
export function agent__account_id__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__account_id__quovo`)
  return ensure__agent(ctx, {
    key: 'agent__account_id__quovo',
    scope: ['account_id__quovo']
  }, ...array__ctx__agent)
}
export function agent__account__user__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__account__user__quovo`)
  let agent
  agent__account__user__quovos(ctx)
  agent__account_id__quovo(ctx)
  return ensure__agent(ctx, {
    key: 'agent__account__user__quovo',
    scope: ['account__user__quovo'],
    init
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__account__user__quovo|init`)
    agent = this
    ctx.agent__account__user__quovos.on('change',
      onchange__account__user__quovos)
    ctx.agent__account_id__quovo.on('change',
      onchange__account_id__quovo)
    set__agent()
  }
  function onchange__account__user__quovos() {
    log(`${logPrefix}|agent__account__user__quovo|onchange__account__user__quovos`)
    set__agent()
  }
  function onchange__account_id__quovo() {
    log(`${logPrefix}|agent__account__user__quovo|onchange__account_id__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|agent__account__user__quovo|set__agent`)
    const { account_id__quovo
          , account__user__quovos
          } = ctx
        , account__user__quovo =
            account__user__quovos
            &&  account__user__quovos.find(
                  quovo__account =>
                    quovo__account.id === account_id__quovo)
    agent.set({
      account__user__quovo
    })
  }
}
export function agent__account__portfolios__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__account__portfolios__quovo`)
  let agent
  agent__account_id__quovo(ctx)
  return agent__rpc__quovo(ctx, {
    key: 'agent__account__portfolios__quovo',
    scope: ['quovo__account__portfolios'],
    rpc: ['get__quovo__account__portfolios'],
    init,
    reset: reset__account_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__account__portfolios__quovo|init`)
    agent = this
    ctx.agent__account_id__quovo.on('change',
      onchange__account_id__quovo)
    set__agent()
  }
  function onchange__account_id__quovo() {
    log(`${logPrefix}|agent__account__portfolios__quovo|onchange__account_id__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|agent__account__portfolios__quovo|set__agent`)
    agent.set({
      quovo__account__portfolios: null
    })
    agent.reset()
  }
}
export function agent__portfolio_id__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__portfolio_id__quovo`)
  return ensure__agent(ctx, {
    key: 'agent__portfolio_id__quovo',
    scope: ['portfolio_id__quovo']
  }, ...array__ctx__agent)
}
export function agent__portfolio__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__portfolio__quovo`)
  let agent
  agent__account__portfolios__quovo(ctx)
  agent__portfolio_id__quovo(ctx)
  return ensure__agent(ctx, {
    key: 'agent__portfolio__quovo',
    scope: ['portfolio__quovo'],
    init
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__portfolio__quovo|init`)
    agent = this
    ctx.agent__account__portfolios__quovo.on('change',
      onchange__quovo__account__portfolios)
    ctx.agent__portfolio_id__quovo.on('change',
      onchange__portfolio_id__quovo)
  }
  function onchange__quovo__account__portfolios() {
    log(`${logPrefix}|agent__portfolio__quovo|onchange__quovo__account__portfolios`)
    set__agent()
  }
  function onchange__portfolio_id__quovo() {
    log(`${logPrefix}|agent__portfolio__quovo|onchange__portfolio_id__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|agent__portfolio__quovo|set__agent`)
    const { portfolio_id__quovo
          , quovo__account__portfolios
          } = ctx
        , portfolio__quovo =
            quovo__account__portfolios
            &&  quovo__account__portfolios.find(
                  portfolio__quovo =>
                    portfolio__quovo.id === portfolio_id__quovo)
    agent.set({
      portfolio__quovo
    })
  }
}
export function agent__portfolio_history__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__portfolio_history__quovo`)
  let agent
  agent__portfolio_id__quovo(ctx)
  return agent__rpc__quovo(ctx, {
    key: 'agent__portfolio_history__quovo',
    scope: ['portfolio_history__quovo'],
    rpc: ['get__portfolio_history__quovo'],
    init,
    reset: reset__portfolio_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__portfolio_history__quovo|init`)
    agent = this
    ctx.agent__portfolio_id__quovo.on('change',
      onchange__portfolio_id__quovo)
  }
  function onchange__portfolio_id__quovo() {
    log(`${logPrefix}|agent__portfolio_history__quovo|onchange__portfolio_id__quovo`)
    agent.reset()
  }
}
export function agent__positions__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__positions__quovo`)
  let agent
  agent__account_id__quovo(ctx)
  return agent__rpc__quovo(ctx, {
    key: 'agent__positions__quovo',
    scope: ['positions__quovo'],
    rpc: ['get__positions__quovo'],
    init,
    reset: reset__account_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__positions__quovo|init`)
    agent = this
    ctx.agent__account_id__quovo.on(
      'change',
      set__agent)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|agent__positions__quovo|set__agent`)
    agent.set({positions__quovo: null})
    agent.reset()
  }
}
export function agent__portfolio__positions__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__portfolio__positions__quovo`)
  let agent
  agent__portfolio_id__quovo(ctx)
  agent__positions__quovo(ctx)
  return ensure__agent(ctx, {
    key: 'agent__portfolio__positions__quovo',
    scope: ['portfolio__positions__quovo']
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__portfolio__positions__quovo|init`)
    agent = this
    ctx.agent__portfolio_id__quovo.on('change',
      onchange__portfolio_id__quovo)
    ctx.agent__positions__quovo.on('change',
      onchange__positions__quovo)
    set__agent()
  }
  function onchange__portfolio_id__quovo() {
    log(`${logPrefix}|agent__portfolio__positions__quovo|onchange__portfolio_id__quovo`)
    set__agent()
  }
  function onchange__positions__quovo() {
    log(`${logPrefix}|agent__portfolio__positions__quovo|onchange__positions__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|agent__portfolio__positions__quovo|set__agent`)
    const {portfolio__quovo,
          positions__quovo} = ctx
        , portfolio_id__quovo =
            portfolio__quovo && portfolio__quovo.id
        , portfolio__positions__quovo =
            positions__quovo
            &&  positions__quovo.filter(
                  quovo$position =>
                    quovo$position.portfolio == portfolio_id__quovo)
    agent.set({
      portfolio__positions__quovo:
        portfolio__positions__quovo
    })
  }
}
export function agent__iframe__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__iframe__quovo`)
  let agent
  agent__user_id__quovo(ctx)
  return agent__rpc__quovo(ctx, {
    key: 'agent__iframe__quovo',
    scope: ['url__iframe__quovo'],
    rpc: ['post__user__quovo__iframe__token'],
    init,
    reset: reset__user_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|agent__iframe__quovo|init`)
    agent = this
    ctx.agent__user_id__quovo.on('change',
      onchange__user_id__quovo)
    set__agent()
  }
  function onchange__user_id__quovo() {
    log(`${logPrefix}|agent__iframe__quovo|onchange__user_id__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|set__agent`)
    agent.reset()
  }
}
export function agent__rpc__quovo(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|agent__rpc__quovo`)
  let agent
  return ensure__agent__rpc(ctx, {
    $ctx__rpc: $ctx__rpc,
    reset: reset__quovo,
    init
  }, ...array__ctx__agent)
  function init() {
    agent = this
    log(`${logPrefix}|agent__rpc__quovo|init`, agent.key)
    const agent__authentication =
            ctx[ctx.key__agent__authentication__quovo]
    agent__authentication.on('change',
      onchange__authentication)
  }
  function $ctx__rpc(ctx__reset, ...ctx__reset$$) {
    log(`${logPrefix}|agent__rpc__quovo|$ctx__rpc`, agent.key)
    return assign(ctx__reset, {
      authentication: ctx[ctx.scope$__authentication__quovo],
      user_id__quovo: ctx.user_id__quovo,
      account_id__quovo: ctx.account_id__quovo,
      portfolio_id__quovo: ctx.portfolio_id__quovo
    }, ...ctx__reset$$)
  }
  function onchange__authentication() {
    log(`${logPrefix}|onchange__authentication`, agent.key)
    agent.reset()
  }
}
async function reset__quovo() {
  const agent = this
  log(`${logPrefix}|reset__quovo`, agent.key)
  let {ctx} = agent
  if (ctx[ctx.scope$__authentication__quovo]) {
    return agent.reset__rpc(...arguments)
  } else {
    agent.clear()
    return
  }
}
async function reset__user_id__quovo() {
  log(`${logPrefix}|reset__user_id__quovo`)
  const agent = this
  let {ctx} = agent
  if (ctx.user_id__quovo) {
    return reset__quovo.call(agent, ...arguments)
  } else {
    agent.clear()
    return
  }
}
async function reset__account_id__quovo() {
  log(`${logPrefix}|reset__account_id__quovo`)
  const agent = this
  let {ctx} = agent
  if (ctx.account_id__quovo) {
    return reset__quovo.call(agent, ...arguments)
  } else {
    agent.clear()
    return
  }
}
async function reset__portfolio_id__quovo() {
  log(`${logPrefix}|reset__portfolio_id__quovo`)
  const agent = this
  let {ctx} = agent
  if (ctx.portfolio_id__quovo) {
    return reset__quovo.call(agent, ...arguments)
  } else {
    agent.clear()
    return
  }
}