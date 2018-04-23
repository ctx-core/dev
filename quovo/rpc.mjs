import {
  fetch__get__accounts,
  fetch__get__user__accounts,
  fetch__get__brokerages,
  fetch__post__user__accounts,
  fetch__delete__account,
  fetch__post__account__sync,
  fetch__get__account__sync,
  fetch__get__accounts__challenges,
  fetch__put__accounts__challenges,
  fetch__post__user__iframe_token,
  fetch__get__portfolios,
  fetch__get__accounts__portfolios,
  fetch__get__portfolio__history,
  fetch__get__positions,
  fetch__get__users,
  fetch__post__users
} from 'ctx-core/quovo/fetch.mjs'
import {assert__authorization} from 'ctx-core/auth/lib.mjs'
import {assign__table__name__rpc,run__rpc} from 'ctx-core/rpc/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/rpc.mjs'
log(logPrefix)
assign__table__name__rpc({
  get__accounts__quovo,
  get__account__user__quovos,
  post__brokerages__quovo,
  post__user__quovo__iframe__token,
  get__portfolios__quovo,
  get__quovo__account__portfolios,
  get__portfolio_history__quovo,
  get__positions__quovo,
  post__users__quovo,
  get__users__quovo
})
export function get__accounts__quovo(ctx) {
  const key = 'get__accounts__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'accounts__quovo'
    ],
    required: [],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.accounts__quovo) return
    await fetch__get__accounts(ctx__rpc)
    return {accounts__quovo: ctx__rpc.accounts__quovo}
  }
}
export function get__account__user__quovos(ctx) {
  const key = 'get__account__user__quovos'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account__user__quovos',
      'user_id__quovo'
    ],
    required: [
      'user_id__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.account__user__quovos) return
    if (ctx__rpc.user_id__quovo) {
      await fetch__get__user__accounts(ctx__rpc)
    }
    return {account__user__quovos: ctx__rpc.account__user__quovos}
  }
}
export function post__accounts__quovo(ctx) {
  const key = 'post__accounts__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__account',
      'account_id__quovo',
      'user_id__quovo',
      'username__brokerage__quovo',
      'password__brokerage__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.quovo__account || ctx__rpc.account_id__quovo) return
    const {brokerage_id__quovo,
          username__brokerage__quovo,
          password__brokerage__quovo} = ctx__rpc
    await fetch__post__user__accounts(ctx__rpc, {
      body: JSON.stringify({
        brokerage: brokerage_id__quovo,
        username: username__brokerage__quovo,
        password: password__brokerage__quovo
      })
    })
    return {
      quovo__account: ctx__rpc.quovo__account,
      account_id__quovo: ctx__rpc.account_id__quovo}
  }
}
export function delete__account__quovo(ctx) {
  const key = 'delete__account__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`, ctx__rpc.account_id__quovo)
    if (!ctx__rpc.account_id__quovo) return
    await fetch__delete__account(ctx__rpc)
    return {
      quovo__account: null,
      account_id__quovo: null
    }
  }
}
export function post__sync__account__quovo(ctx) {
  const key = 'post__sync__account__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo',
      'body'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (!ctx__rpc.account_id__quovo) return
    await fetch__post__account__sync(ctx__rpc)
    return {
      quovo__account__sync: ctx__rpc.quovo__account__sync
    }
  }
}
export async function get__sync__account__user__quovo(ctx) {
  const key = 'get__sync__account__user__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (!ctx__rpc.account_id__quovo) return
    await fetch__post__account__sync(ctx__rpc)
    await fetch__get__account__sync(ctx__rpc)
    return {
      quovo__account__sync: ctx__rpc.quovo__account__sync}
  }
}
export function get__challenges__account__quovo(ctx) {
  const key = 'get__challenges__account__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (!ctx__rpc.account_id__quovo) return
    await fetch__get__accounts__challenges(ctx__rpc)
    return {
      quovo__account__challenges: ctx__rpc.quovo__account__challenges}
  }
}
export function put__challenges__account__quovo(ctx) {
  const key = 'put__challenges__account__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (!ctx__rpc.account_id__quovo) return
    await fetch__put__accounts__challenges(ctx__rpc)
    return {
      quovo__account__challenges: ctx__rpc.quovo__account__challenges}
  }
}
export async function post__brokerages__quovo(ctx) {
  const key = 'post__brokerages__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.brokerages__quovo) return
    await fetch__get__brokerages(ctx__rpc)
    return {brokerages__quovo: ctx__rpc.brokerages__quovo}
  }
}
export function post__user__quovo__iframe__token(ctx) {
  const key = 'post__user__quovo__iframe__token'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo',
      'user_id__quovo',
      'token__iframe__quovo',
      'url__iframe__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.token__iframe__quovo && ctx__rpc.url__iframe__quovo) return
    await fetch__post__user__iframe_token(ctx__rpc)
    return {
      token__iframe__quovo: ctx__rpc.token__iframe__quovo,
      url__iframe__quovo: ctx__rpc.url__iframe__quovo
    }
  }
}
export function get__portfolio_history__quovo(ctx) {
  const key = 'get__portfolio_history__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'portfolio_id__quovo',
      'portfolio_history__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.portfolio_history__quovo) return
    await fetch__get__portfolio__history(ctx__rpc)
    return {portfolio_history__quovo: ctx__rpc.portfolio_history__quovo}
  }
}
export function get__portfolios__quovo(ctx) {
  const key = 'get__portfolios__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo',
      'portfolios__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.portfolios__quovo) return
    await fetch__get__portfolios(ctx__rpc)
    return {portfolios__quovo: ctx__rpc.portfolios__quovo}
  }
}
export function get__quovo__account__portfolios(ctx) {
  const key = 'get__quovo__account__portfolios'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo',
      'quovo__account__portfolios'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.quovo__account__portfolios) return
    await fetch__get__accounts__portfolios(ctx__rpc)
    return {quovo__account__portfolios: ctx__rpc.quovo__account__portfolios}
  }
}
export function get__positions__quovo(ctx) {
  const key = 'get__positions__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'account_id__quovo',
      'portfolio_id__quovo',
      'positions__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.positions__quovo) return
    await fetch__get__positions(ctx__rpc)
    return {positions__quovo: ctx__rpc.positions__quovo}
  }
}
export function get__users__quovo(ctx) {
  const key = 'get__users__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'users__quovo'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    if (ctx__rpc.users__quovo) return
    await fetch__get__users(ctx__rpc)
    return {users__quovo: ctx__rpc.users__quovo}
  }
}
export function post__users__quovo(ctx) {
  const key = 'post__users__quovo'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'body'
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc(ctx__rpc) {
    log(`${logPrefix}|${key}|rpc`)
    await fetch__post__users(ctx__rpc)
    return {
      user__quovo: ctx__rpc.user__quovo,
      user_id__quovo: ctx__rpc.user_id__quovo
    }
  }
}
export function $rpc(ctx, rpc) {
  log(`${logPrefix}|$rpc`)
  return async () => {
    await assert__authorization(ctx)
    return rpc(...arguments)
  }
}