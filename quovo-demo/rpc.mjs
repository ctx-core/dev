import {assign} from 'ctx-core/object/lib'
import {
  fetch__get__users,
  fetch__get__accounts,
  fetch__get__brokerages,
  fetch__get__portfolio__history,
  fetch__get__portfolios,
  fetch__get__positions
} from 'ctx-core/quovo/fetch'
import {
  assign__table__name__rpc,
  run__rpc,
  ensure__public_keys} from 'ctx-core/rpc/lib'
import {$rpc} from 'ctx-core/quovo/rpc'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/rpc'
assign__table__name__rpc({
  rpc__export__quovo__data: export__quovo__data
})
export function export__quovo__data(ctx={}, ...ctx$rest$$) {
  const key = 'export__quovo__data'
  log(`${logPrefix}|${key}`)
  return run__rpc(...arguments, {
    key,
    whitelist: [
      'access_token__quovo',
      'user_id__quovo',
      'accounts__quovo',
      'brokerages__quovo',
      'array__ctx__portfolio__quovo',
      'positions__quovo',
      'users__quovo'
    ],
    required: [
    ],
    rpc: $rpc(ctx, rpc)
  })
  async function rpc() {
    log(`${logPrefix}|${key}|rpc`)
    // map
    const array__ctx__requests = await Promise.all([
            fetch__get__accounts(ctx),
            fetch__get__brokerages(ctx),
            assign__array__ctx__portfolio__quovo(ctx),
            fetch__get__positions(ctx),
            fetch__get__users(ctx)
          ])
    // reduce
    assign(ctx, ...array__ctx__requests)
    return ensure__public_keys(ctx, {
      access_token__quovo: ctx.access_token__quovo,
      user_id__quovo: ctx.user_id__quovo,
      accounts__quovo: ctx.accounts__quovo,
      brokerages__quovo: ctx.brokerages__quovo,
      array__ctx__portfolio__quovo: ctx.array__ctx__portfolio__quovo,
      positions__quovo: ctx.positions__quovo,
      users__quovo: ctx.users__quovo
    })
  }
}
async function assign__array__ctx__portfolio__quovo(ctx) {
  log(`${logPrefix}|array__ctx__portfolio__quovo`)
  await fetch__get__portfolios(ctx)
  const {portfolios__quovo} = ctx
        // parallel
      , ctx__portfolio_history =
          await Promise.all(
            portfolios__quovo.map(portfolio__quovo => {
              return fetch__get__portfolio__history({
                user_id__quovo: ctx.user_id__quovo,
                account_id__quovo: ctx.account_id__quovo,
                portfolio__quovo,
                portfolio_id__quovo: portfolio__quovo.id
              })
            }))
      , array__ctx__portfolio__quovo =
          ctx__portfolio_history
            .map(
              ctx__portfolio__quovo => {
                return {
                  portfolio__quovo: ctx__portfolio__quovo.portfolio__quovo,
                  portfolio_id__quovo: ctx__portfolio__quovo.portfolio_id__quovo,
                  portfolio_history__quovo: ctx__portfolio__quovo.portfolio_history__quovo
                }
              })
  return ensure__public_keys(ctx, {
    array__ctx__portfolio__quovo
  })
}