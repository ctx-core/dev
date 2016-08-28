import {
  http$get__accounts,
  http$get__user__accounts,
  http$get__brokerages,
  http$post__user__accounts,
  http$delete__account,
  http$post__account__sync,
  http$get__account__sync,
  http$get__accounts__challenges,
  http$put__accounts__challenges,
  http$post__user__iframe_token,
  http$get__portfolios,
  http$get__accounts__portfolios,
  http$get__portfolio__history,
  http$get__positions,
  http$get__users,
  http$post__users
} from 'ctx-core/quovo/fetch'
import {assert__authorization} from 'ctx-core/auth/lib'
import {assign__table__name__rpc,run__rpc} from 'ctx-core/rpc/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/rpc'
log(logPrefix)
assign__table__name__rpc({
  get__quovo__accounts,
  get__quovo__user__accounts,
  post__quovo__brokerages,
  post__quovo__user__iframe__token,
  get__quovo__portfolios,
  get__quovo__account__portfolios,
  get__quovo__portfolio__history,
  get__quovo__positions,
  post__quovo__users,
  get__quovo__users
})
export function *get__quovo__accounts(ctx) {
  const key = 'get__quovo__accounts'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__accounts'
    ],
    required: [],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__accounts) return
    yield http$get__accounts(rpc$ctx)
    return {quovo__accounts: rpc$ctx.quovo__accounts}
  }
}
export function *get__quovo__user__accounts(ctx) {
  const key = 'get__quovo__user__accounts'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__user__accounts',
      'quovo__user_id'
    ],
    required: [
      'quovo__user_id'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__user__accounts) return
    if (rpc$ctx.quovo__user_id) {
      yield http$get__user__accounts(rpc$ctx)
    }
    return {quovo__user__accounts: rpc$ctx.quovo__user__accounts}
  }
}
export function *post__quovo__accounts(ctx) {
  const key = 'post__quovo__accounts'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account',
      'quovo__account_id',
      'quovo__user_id',
      'quovo$brokerage$username',
      'quovo$brokerage$password'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__account || rpc$ctx.quovo__account_id) return
    const {quovo$brokerage$id,
          quovo$brokerage$username,
          quovo$brokerage$password} = rpc$ctx
    yield http$post__user__accounts(rpc$ctx, {
      body: JSON.stringify({
        brokerage: quovo$brokerage$id,
        username: quovo$brokerage$username,
        password: quovo$brokerage$password
      })
    })
    return {
      quovo__account: rpc$ctx.quovo__account,
      quovo__account_id: rpc$ctx.quovo__account_id}
  }
}
export function *delete__quovo__account(ctx) {
  const key = 'delete__quovo__account'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`, rpc$ctx.quovo__account_id)
    if (!rpc$ctx.quovo__account_id) return
    yield http$delete__account(rpc$ctx)
    return {
      quovo__account: null,
      quovo__account_id: null
    }
  }
}
export function *post__quovo__account__sync(ctx) {
  const key = 'post__quovo__account__sync'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id',
      'body'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (!rpc$ctx.quovo__account_id) return
    yield http$post__account__sync(rpc$ctx)
    return {
      quovo__account__sync: rpc$ctx.quovo__account__sync
    }
  }
}
export function *get__quovo__user__account__sync(ctx) {
  const key = 'get__quovo__user__account__sync'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (!rpc$ctx.quovo__account_id) return
    yield http$post__account__sync(rpc$ctx)
    yield http$get__account__sync(rpc$ctx)
    return {
      quovo__account__sync: rpc$ctx.quovo__account__sync}
  }
}
export function *get__quovo__account__challenges(ctx) {
  const key = 'get__quovo__account__challenges'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (!rpc$ctx.quovo__account_id) return
    yield http$get__accounts__challenges(rpc$ctx)
    return {
      quovo__account__challenges: rpc$ctx.quovo__account__challenges}
  }
}
export function *put__quovo__account__challenges(ctx) {
  const key = 'put__quovo__account__challenges'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (!rpc$ctx.quovo__account_id) return
    yield http$put__accounts__challenges(rpc$ctx)
    return {
      quovo__account__challenges: rpc$ctx.quovo__account__challenges}
  }
}
export function *post__quovo__brokerages(ctx) {
  const key = 'post__quovo__brokerages'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__brokerages) return
    yield http$get__brokerages(rpc$ctx)
    return {quovo__brokerages: rpc$ctx.quovo__brokerages}
  }
}
export function *post__quovo__user__iframe__token(ctx) {
  const key = 'post__quovo__user__iframe__token'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id',
      'quovo__user_id',
      'quovo__iframe$token',
      'quovo__iframe$url'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__iframe$token && rpc$ctx.quovo__iframe$url) return
    yield http$post__user__iframe_token(rpc$ctx)
    return {
      quovo__iframe$token: rpc$ctx.quovo__iframe$token,
      quovo__iframe$url: rpc$ctx.quovo__iframe$url
    }
  }
}
export function *get__quovo__portfolio__history(ctx) {
  const key = 'get__quovo__portfolio__history'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__portfolio_id'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__portfolio__history) return
    yield http$get__portfolio__history(rpc$ctx)
    return {quovo__portfolio__history: rpc$ctx.quovo__portfolio__history}
  }
}
export function *get__quovo__portfolios(ctx) {
  const key = 'get__quovo__portfolios'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id',
      'quovo__portfolios'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__portfolios) return
    yield http$get__portfolios(rpc$ctx)
    return {quovo__portfolios: rpc$ctx.quovo__portfolios}
  }
}
export function *get__quovo__account__portfolios(ctx) {
  const key = 'get__quovo__account__portfolios'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id',
      'quovo__account__portfolios'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__account__portfolios) return
    yield http$get__accounts__portfolios(rpc$ctx)
    return {quovo__account__portfolios: rpc$ctx.quovo__account__portfolios}
  }
}
export function *get__quovo__positions(ctx) {
  const key = 'get__quovo__positions'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account_id',
      'quovo__portfolio_id',
      'quovo__positions'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__positions) return
    yield http$get__positions(rpc$ctx)
    return {quovo__positions: rpc$ctx.quovo__positions}
  }
}
export function *get__quovo__users(ctx) {
  const key = 'get__quovo__users'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__users'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    if (rpc$ctx.quovo__users) return
    yield http$get__users(rpc$ctx)
    return {quovo__users: rpc$ctx.quovo__users}
  }
}
export function *post__quovo__users(ctx) {
  const key = 'post__quovo__users'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'body'
    ],
    rpc: new__rpc(ctx, rpc)
  })
  function *rpc(rpc$ctx) {
    log(`${logPrefix}|${key}|rpc`)
    yield http$post__users(rpc$ctx)
    return {
      quovo__user: rpc$ctx.quovo__user,
      quovo__user_id: rpc$ctx.quovo__user_id
    }
  }
}
export function new__rpc(ctx, rpc) {
  log(`${logPrefix}|new__rpc`)
  return function *(){
    yield assert__authorization(ctx)
    return yield rpc(...arguments)
  }
}