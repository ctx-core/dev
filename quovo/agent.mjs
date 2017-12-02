import {assign} from 'ctx-core/object/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {rpc__agent} from 'ctx-core/agent/rpc'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/agent'
export function users__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|users__quovo__agent`)
  return quovo__rpc__agent(ctx, {
    key: 'users__quovo__agent',
    scope: ['users__quovo'],
    rpc: ['get__users__quovo']
  }, ...array__ctx__agent)
}
export function user_id__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|user_id__quovo__agent`)
  return ensure__agent(ctx, {
    key: 'user_id__quovo__agent',
    scope: ['user_id__quovo']
  }, ...array__ctx__agent)
}
export function user__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|user__quovo__agent`)
  let agent
  user_id__quovo__agent(ctx)
  users__quovo__agent(ctx)
  return ensure__agent(ctx, {
    key: 'user__quovo__agent',
    scope: ['user__quovo'],
    init
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|user__quovo__agent|init`)
    agent = this
    ctx.user_id__quovo__agent.on('change', on$change__user_id__quovo)
    ctx.users__quovo__agent.on('change', on$change__users__quovo)
  }
  function on$change__user_id__quovo() {
    log(`${logPrefix}|user__quovo__agent|on$change__user_id__quovo`)
    set__agent()
  }
  function on$change__users__quovo() {
    log(`${logPrefix}|user__quovo__agent|on$change__users__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|user__quovo__agent|set__agent`)
    const {user_id__quovo} = ctx
        , users__quovo = ctx.users__quovo || []
    agent.set({
      user__quovo: users__quovo.find(
        user__quovo =>
          user__quovo.id === user_id__quovo)})
  }
}
export function account__user__quovos__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|account__user__quovos__agent`)
  let agent
  user_id__quovo__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'account__user__quovos__agent',
    scope: ['account__user__quovos'],
    rpc: ['get__account__user__quovos'],
    init,
    reset: reset__user_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|account__user__quovos__agent|init`)
    agent = this
    ctx.user_id__quovo__agent.on('change', on$change__user_id__quovo)
  }
  function on$change__user_id__quovo() {
    log(`${logPrefix}|account__user__quovos__agent|on$change__user_id__quovo`)
    agent.restart()
  }
}
export function account_id__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|account_id__quovo__agent`)
  return ensure__agent(ctx, {
    key: 'account_id__quovo__agent',
    scope: ['account_id__quovo']
  }, ...array__ctx__agent)
}
export function account__user__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|account__user__quovo__agent`)
  let agent
  account__user__quovos__agent(ctx)
  account_id__quovo__agent(ctx)
  return ensure__agent(ctx, {
    key: 'account__user__quovo__agent',
    scope: ['account__user__quovo'],
    init
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|account__user__quovo__agent|init`)
    agent = this
    ctx.account__user__quovos__agent.on('change', on$change__account__user__quovos)
    ctx.account_id__quovo__agent.on('change', on$change__account_id__quovo)
    set__agent()
  }
  function on$change__account__user__quovos() {
    log(`${logPrefix}|account__user__quovo__agent|on$change__account__user__quovos`)
    set__agent()
  }
  function on$change__account_id__quovo() {
    log(`${logPrefix}|account__user__quovo__agent|on$change__account_id__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|account__user__quovo__agent|set__agent`)
    const {account_id__quovo,
          account__user__quovos} = ctx
        , account__user__quovo = account__user__quovos && account__user__quovos.find(
            quovo__account =>
              quovo__account.id === account_id__quovo)
    agent.set({
      account__user__quovo
    })
  }
}
export function quovo__account__portfolios__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|quovo__account__portfolios__agent`)
  let agent
  account_id__quovo__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'quovo__account__portfolios__agent',
    scope: ['quovo__account__portfolios'],
    rpc: ['get__quovo__account__portfolios'],
    init,
    reset: reset__account_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|quovo__account__portfolios__agent|init`)
    agent = this
    ctx.account_id__quovo__agent.on('change', on$change__account_id__quovo)
    set__agent()
  }
  function on$change__account_id__quovo() {
    log(`${logPrefix}|quovo__account__portfolios__agent|on$change__account_id__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|quovo__account__portfolios__agent|set__agent`)
    agent.set({
      quovo__account__portfolios: null
    })
    agent.reset()
  }
}
export function portfolio_id__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|portfolio_id__quovo__agent`)
  return ensure__agent(ctx, {
    key: 'portfolio_id__quovo__agent',
    scope: ['portfolio_id__quovo']
  }, ...array__ctx__agent)
}
export function portfolio__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|portfolio__quovo__agent`)
  let agent
  quovo__account__portfolios__agent(ctx)
  portfolio_id__quovo__agent(ctx)
  return ensure__agent(ctx, {
    key: 'portfolio__quovo__agent',
    scope: ['portfolio__quovo'],
    init
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|portfolio__quovo__agent|init`)
    agent = this
    ctx.quovo__account__portfolios__agent.on('change', on$change__quovo__account__portfolios)
    ctx.portfolio_id__quovo__agent.on('change', on$change__portfolio_id__quovo)
  }
  function on$change__quovo__account__portfolios() {
    log(`${logPrefix}|portfolio__quovo__agent|on$change__quovo__account__portfolios`)
    set__agent()
  }
  function on$change__portfolio_id__quovo() {
    log(`${logPrefix}|portfolio__quovo__agent|on$change__portfolio_id__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|portfolio__quovo__agent|set__agent`)
    const {portfolio_id__quovo,
          quovo__account__portfolios} = ctx
        , portfolio__quovo = quovo__account__portfolios && quovo__account__portfolios.find(
            portfolio__quovo =>
              portfolio__quovo.id === portfolio_id__quovo)
    agent.set({
      portfolio__quovo
    })
  }
}
export function portfolio_history__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|portfolio_history__quovo__agent`)
  let agent
  portfolio_id__quovo__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'portfolio_history__quovo__agent',
    scope: ['portfolio_history__quovo'],
    rpc: ['get__portfolio_history__quovo'],
    init,
    reset: reset__portfolio_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|portfolio_history__quovo__agent|init`)
    agent = this
    ctx.portfolio_id__quovo__agent.on('change', on$change__portfolio_id__quovo)
  }
  function on$change__portfolio_id__quovo() {
    log(`${logPrefix}|portfolio_history__quovo__agent|on$change__portfolio_id__quovo`)
    agent.reset()
  }
}
export function positions__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|positions__quovo__agent`)
  let agent
  account_id__quovo__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'positions__quovo__agent',
    scope: ['positions__quovo'],
    rpc: ['get__positions__quovo'],
    init,
    reset: reset__account_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|positions__quovo__agent|init`)
    agent = this
    ctx.account_id__quovo__agent.on('change', set__agent)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|positions__quovo__agent|set__agent`)
    agent.set({positions__quovo: null})
    agent.reset()
  }
}
export function portfolio__positions__quovo__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|portfolio__positions__quovo__agent`)
  let agent
  portfolio_id__quovo__agent(ctx)
  positions__quovo__agent(ctx)
  return ensure__agent(ctx, {
    key: 'portfolio__positions__quovo__agent',
    scope: ['portfolio__positions__quovo']
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|portfolio__positions__quovo__agent|init`)
    agent = this
    ctx.portfolio_id__quovo__agent.on('change', on$change__portfolio_id__quovo)
    ctx.positions__quovo__agent.on('change', on$change__positions__quovo)
    set__agent()
  }
  function on$change__portfolio_id__quovo() {
    log(`${logPrefix}|portfolio__positions__quovo__agent|on$change__portfolio_id__quovo`)
    set__agent()
  }
  function on$change__positions__quovo() {
    log(`${logPrefix}|portfolio__positions__quovo__agent|on$change__positions__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|portfolio__positions__quovo__agent|set__agent`)
    const {portfolio__quovo,
          positions__quovo} = ctx
        , portfolio_id__quovo = portfolio__quovo && portfolio__quovo.id
        , portfolio__positions__quovo =
            positions__quovo
            && positions__quovo.filter(
              quovo$position =>
                quovo$position.portfolio == portfolio_id__quovo)
    agent.set({
      portfolio__positions__quovo: portfolio__positions__quovo
    })
  }
}
export function quovo__iframe__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|quovo__iframe__agent`)
  let agent
  user_id__quovo__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'quovo__iframe__agent',
    scope: ['quovo__iframe$url'],
    rpc: ['post__user__quovo__iframe__token'],
    init,
    reset: reset__user_id__quovo
  }, ...array__ctx__agent)
  function init() {
    log(`${logPrefix}|quovo__iframe__agent|init`)
    agent = this
    ctx.user_id__quovo__agent.on('change', on$change__user_id__quovo)
    set__agent()
  }
  function on$change__user_id__quovo() {
    log(`${logPrefix}|quovo__iframe__agent|on$change__user_id__quovo`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|set__agent`)
    agent.reset()
  }
}
export function quovo__rpc__agent(ctx, ...array__ctx__agent) {
  log(`${logPrefix}|quovo__rpc__agent`)
  let agent
  return rpc__agent(ctx, {
            $ctx__rpc: $ctx__rpc,
            reset: reset__quovo,
            init
          }, ...array__ctx__agent)
  function init() {
    agent = this
    log(`${logPrefix}|quovo__rpc__agent|init`, agent.key)
    const authentication__agent = ctx[ctx.authentication$key__quovo__agent]
    authentication__agent.on('change', on$change__authentication)
  }
  function $ctx__rpc(ctx__reset, ...ctx__reset$$) {
    log(`${logPrefix}|quovo__rpc__agent|$ctx__rpc`, agent.key)
    return assign(ctx__reset, {
      authentication: ctx[ctx.quovo__authentication__scope$],
      user_id__quovo: ctx.user_id__quovo,
      account_id__quovo: ctx.account_id__quovo,
      portfolio_id__quovo: ctx.portfolio_id__quovo
    }, ...ctx__reset$$)
  }
  function on$change__authentication() {
    log(`${logPrefix}|on$change__authentication`, agent.key)
    agent.reset()
  }
}
async function reset__quovo() {
  const agent = this
  log(`${logPrefix}|reset__quovo`, agent.key)
  let {ctx} = agent
  if (ctx[ctx.quovo__authentication__scope$]) {
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