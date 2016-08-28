import {assign} from 'ctx-core/object/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {rpc__agent} from 'ctx-core/agent/rpc'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/agent'
export function quovo__users__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__users__agent`)
  return quovo__rpc__agent(ctx, {
    key: 'quovo__users__agent',
    scope: ['quovo__users'],
    rpc: ['get__quovo__users']
  }, ...agent$ctx$$)
}
export function quovo__user_id__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__user_id__agent`)
  return ensure__agent(ctx, {
    key: 'quovo__user_id__agent',
    scope: ['quovo__user_id']
  }, ...agent$ctx$$)
}
export function quovo__user__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__user__agent`)
  let agent
  quovo__user_id__agent(ctx)
  quovo__users__agent(ctx)
  return ensure__agent(ctx, {
    key: 'quovo__user__agent',
    scope: ['quovo__user'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__user__agent|init`)
    agent = this
    ctx.quovo__user_id__agent.pick__on({on$change__quovo__user_id})
    ctx.quovo__users__agent.pick__on({on$change__quovo__users})
  }
  function on$change__quovo__user_id() {
    log(`${logPrefix}|quovo__user__agent|on$change__quovo__user_id`)
    set__agent()
  }
  function on$change__quovo__users() {
    log(`${logPrefix}|quovo__user__agent|on$change__quovo__users`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|quovo__user__agent|set__agent`)
    const {quovo__user_id} = ctx
        , quovo__users = ctx.quovo__users || []
    agent.set({
      quovo__user: quovo__users.find(
        quovo__user =>
          quovo__user.id === quovo__user_id)})
  }
}
export function quovo__user__accounts__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__user__accounts__agent`)
  let agent
  quovo__user_id__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'quovo__user__accounts__agent',
    scope: ['quovo__user__accounts'],
    rpc: ['get__quovo__user__accounts'],
    init,
    reset: reset__quovo__user_id
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__user__accounts__agent|init`)
    agent = this
    ctx.quovo__user_id__agent.pick__on({on$change__quovo__user_id})
  }
  function on$change__quovo__user_id() {
    log(`${logPrefix}|quovo__user__accounts__agent|on$change__quovo__user_id`)
    agent.restart()
  }
}
export function quovo__account_id__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__account_id__agent`)
  return ensure__agent(ctx, {
    key: 'quovo__account_id__agent',
    scope: ['quovo__account_id']
  }, ...agent$ctx$$)
}
export function quovo__user__account__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__user__account__agent`)
  let agent
  quovo__user__accounts__agent(ctx)
  quovo__account_id__agent(ctx)
  return ensure__agent(ctx, {
    key: 'quovo__user__account__agent',
    scope: ['quovo__user__account'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__user__account__agent|init`)
    agent = this
    ctx.quovo__user__accounts__agent.pick__on({on$change__quovo__user__accounts})
    ctx.quovo__account_id__agent.pick__on({on$change__quovo__account_id})
    set__agent()
  }
  function on$change__quovo__user__accounts() {
    log(`${logPrefix}|quovo__user__account__agent|on$change__quovo__user__accounts`)
    set__agent()
  }
  function on$change__quovo__account_id() {
    log(`${logPrefix}|quovo__user__account__agent|on$change__quovo__account_id`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|quovo__user__account__agent|set__agent`)
    const {quovo__account_id,
          quovo__user__accounts} = ctx
        , quovo__user__account = quovo__user__accounts && quovo__user__accounts.find(
            quovo__account =>
              quovo__account.id === quovo__account_id)
    agent.set({
      quovo__user__account
    })
  }
}
export function quovo__account__portfolios__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__account__portfolios__agent`)
  let agent
  quovo__account_id__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'quovo__account__portfolios__agent',
    scope: ['quovo__account__portfolios'],
    rpc: ['get__quovo__account__portfolios'],
    init,
    reset: reset__quovo__account_id
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__account__portfolios__agent|init`)
    agent = this
    ctx.quovo__account_id__agent.pick__on({on$change__quovo__account_id})
    set__agent()
  }
  function on$change__quovo__account_id() {
    log(`${logPrefix}|quovo__account__portfolios__agent|on$change__quovo__account_id`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|quovo__account__portfolios__agent|set__agent`)
    agent.set({
      quovo__account__portfolios: null
    })
    agent.reset__co()
  }
}
export function quovo__portfolio_id__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__portfolio_id__agent`)
  return ensure__agent(ctx, {
    key: 'quovo__portfolio_id__agent',
    scope: ['quovo__portfolio_id']
  }, ...agent$ctx$$)
}
export function quovo__portfolio__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__portfolio__agent`)
  let agent
  quovo__account__portfolios__agent(ctx)
  quovo__portfolio_id__agent(ctx)
  return ensure__agent(ctx, {
    key: 'quovo__portfolio__agent',
    scope: ['quovo__portfolio'],
    init
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__portfolio__agent|init`)
    agent = this
    ctx.quovo__account__portfolios__agent.pick__on({on$change__quovo__account__portfolios})
    ctx.quovo__portfolio_id__agent.pick__on({on$change__quovo__portfolio_id})
  }
  function on$change__quovo__account__portfolios() {
    log(`${logPrefix}|quovo__portfolio__agent|on$change__quovo__account__portfolios`)
    set__agent()
  }
  function on$change__quovo__portfolio_id() {
    log(`${logPrefix}|quovo__portfolio__agent|on$change__quovo__portfolio_id`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|quovo__portfolio__agent|set__agent`)
    const {quovo__portfolio_id,
          quovo__account__portfolios} = ctx
        , quovo__portfolio = quovo__account__portfolios && quovo__account__portfolios.find(
            quovo__portfolio =>
              quovo__portfolio.id === quovo__portfolio_id)
    agent.set({
      quovo__portfolio
    })
  }
}
export function quovo__portfolio__history__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__portfolio__history__agent`)
  let agent
  quovo__portfolio_id__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'quovo__portfolio__history__agent',
    scope: ['quovo__portfolio__history'],
    rpc: ['get__quovo__portfolio__history'],
    init,
    reset: reset__quovo__portfolio_id
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__portfolio__history__agent|init`)
    agent = this
    ctx.quovo__portfolio_id__agent.pick__on({on$change__quovo__portfolio_id})
  }
  function on$change__quovo__portfolio_id() {
    log(`${logPrefix}|quovo__portfolio__history__agent|on$change__quovo__portfolio_id`)
    agent.reset__co()
  }
}
export function quovo__positions__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__positions__agent`)
  let agent
  quovo__account_id__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'quovo__positions__agent',
    scope: ['quovo__positions'],
    rpc: ['get__quovo__positions'],
    init,
    reset: reset__quovo__account_id
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__positions__agent|init`)
    agent = this
    ctx.quovo__account_id__agent.on('change', set__agent)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|quovo__positions__agent|set__agent`)
    agent.set({quovo__positions: null})
    agent.reset__co()
  }
}
export function quovo__portfolio__positions__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__portfolio__positions__agent`)
  let agent
  quovo__portfolio_id__agent(ctx)
  quovo__positions__agent(ctx)
  return ensure__agent(ctx, {
    key: 'quovo__portfolio__positions__agent',
    scope: ['quovo__portfolio__positions']
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__portfolio__positions__agent|init`)
    agent = this
    ctx.quovo__portfolio_id__agent.pick__on({on$change__quovo__portfolio_id})
    ctx.quovo__positions__agent.pick__on({on$change__quovo__positions})
    set__agent()
  }
  function on$change__quovo__portfolio_id() {
    log(`${logPrefix}|quovo__portfolio__positions__agent|on$change__quovo__portfolio_id`)
    set__agent()
  }
  function on$change__quovo__positions() {
    log(`${logPrefix}|quovo__portfolio__positions__agent|on$change__quovo__positions`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|quovo__portfolio__positions__agent|set__agent`)
    const {quovo__portfolio,
          quovo__positions} = ctx
        , quovo__portfolio_id = quovo__portfolio && quovo__portfolio.id
        , quovo__portfolio__positions =
            quovo__positions
            && quovo__positions.filter(
              quovo$position =>
                quovo$position.portfolio == quovo__portfolio_id)
    agent.set({
      quovo__portfolio__positions: quovo__portfolio__positions
    })
  }
}
export function quovo__iframe__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__iframe__agent`)
  let agent
  quovo__user_id__agent(ctx)
  return quovo__rpc__agent(ctx, {
    key: 'quovo__iframe__agent',
    scope: ['quovo__iframe$url'],
    rpc: ['post__quovo__user__iframe__token'],
    init,
    reset: reset__quovo__user_id
  }, ...agent$ctx$$)
  function init() {
    log(`${logPrefix}|quovo__iframe__agent|init`)
    agent = this
    ctx.quovo__user_id__agent.pick__on({on$change__quovo__user_id})
    set__agent()
  }
  function on$change__quovo__user_id() {
    log(`${logPrefix}|quovo__iframe__agent|on$change__quovo__user_id`)
    set__agent()
  }
  function set__agent() {
    log(`${logPrefix}|set__agent`)
    agent.reset__co()
  }
}
export function quovo__rpc__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|quovo__rpc__agent`)
  let agent
  return rpc__agent(ctx, {
            new__rpc$ctx: new__rpc$ctx,
            reset: reset__quovo,
            init
          }, ...agent$ctx$$)
  function init() {
    agent = this
    log(`${logPrefix}|quovo__rpc__agent|init`, agent.key)
    const authentication__agent = ctx[ctx.authentication$key__quovo__agent]
    authentication__agent.pick__on({on$change__authentication})
  }
  function new__rpc$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|quovo__rpc__agent|new__rpc$ctx`, agent.key)
    return assign(reset$ctx, {
      authentication: ctx[ctx.quovo__authentication__scope$],
      quovo__user_id: ctx.quovo__user_id,
      quovo__account_id: ctx.quovo__account_id,
      quovo__portfolio_id: ctx.quovo__portfolio_id
    }, ...reset$ctx$rest$$)
  }
  function on$change__authentication() {
    log(`${logPrefix}|on$change__authentication`, agent.key)
    agent.reset__co()
  }
}
function *reset__quovo() {
  const agent = this
  log(`${logPrefix}|reset__quovo`, agent.key)
  let {ctx} = agent
  if (ctx[ctx.quovo__authentication__scope$]) {
    return yield agent.reset__rpc(...arguments)
  } else {
    return yield agent.reset__clear()
  }
}
function *reset__quovo__user_id() {
  log(`${logPrefix}|reset__quovo__user_id`)
  const agent = this
  let {ctx} = agent
  if (ctx.quovo__user_id) {
    return yield reset__quovo.call(agent, ...arguments)
  } else {
    return yield agent.reset__clear()
  }
}
function *reset__quovo__account_id() {
  log(`${logPrefix}|reset__quovo__account_id`)
  const agent = this
  let {ctx} = agent
  if (ctx.quovo__account_id) {
    return yield reset__quovo.call(agent, ...arguments)
  } else {
    return yield agent.reset__clear()
  }
}
function *reset__quovo__portfolio_id() {
  log(`${logPrefix}|reset__quovo__portfolio_id`)
  const agent = this
  let {ctx} = agent
  if (ctx.quovo__portfolio_id) {
    return yield reset__quovo.call(agent, ...arguments)
  } else {
    return yield agent.reset__clear()
  }
}