import {assign} from 'ctx-core/object/lib'
import {
  fetch$get__users,
  fetch$get__accounts,
  fetch$get__brokerages,
  fetch$get__portfolio__history,
  fetch$get__portfolios,
  fetch$get__positions
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
export function *export__quovo__data(ctx={}, ...ctx$rest$$) {
  const key = 'export__quovo__data'
  log(`${logPrefix}|${key}`)
  return yield run__rpc(...arguments, {
    key,
    whitelist: [
      'quovo__access_token',
      'quovo__user_id',
      'quovo__accounts',
      'quovo__brokerages',
      'quovo__portfoliosctx$$',
      'quovo__positions',
      'quovo__users'
    ],
    required: [
    ],
    rpc: $rpc(ctx, rpc)
  })
  function *rpc() {
    log(`${logPrefix}|${key}|rpc`)
    // map
    const ctxRequests = yield [
            fetch$get__accounts(ctx),
            fetch$get__brokerages(ctx),
            assign__quovo__portfoliosctx$$(ctx),
            fetch$get__positions(ctx),
            fetch$get__users(ctx)
          ]
    // reduce
    assign(ctx, ...ctxRequests)
    return ensure__public_keys(ctx, {
      quovo__access_token: ctx.quovo__access_token,
      quovo__user_id: ctx.quovo__user_id,
      quovo__accounts: ctx.quovo__accounts,
      quovo__brokerages: ctx.quovo__brokerages,
      quovo__portfoliosctx$$: ctx.quovo__portfoliosctx$$,
      quovo__positions: ctx.quovo__positions,
      quovo__users: ctx.quovo__users
    })
  }
}
function *assign__quovo__portfoliosctx$$(ctx) {
  log(`${logPrefix}|quovo__portfoliosctx$$`)
  yield fetch$get__portfolios(ctx)
  const {quovo__portfolios} = ctx
        // parallel
      , table$quovo__portfolio__portfolio$history$ctx =
          yield (
            quovo__portfolios.map(quovo__portfolio => {
              return fetch$get__portfolio__history({
                quovo__user_id: ctx.quovo__user_id,
                quovo__account_id: ctx.quovo__account_id,
                quovo__portfolio,
                quovo__portfolio_id: quovo__portfolio.id
              })
            }))
      , quovo__portfoliosctx$$ =
          table$quovo__portfolio__portfolio$history$ctx
            .map(
              quovo__portfolio$ctx => {
                return {
                  quovo__portfolio: quovo__portfolio$ctx.quovo__portfolio,
                  quovo__portfolio_id: quovo__portfolio$ctx.quovo__portfolio_id,
                  quovo__portfolio__history: quovo__portfolio$ctx.quovo__portfolio__history
                }
              })
  return ensure__public_keys(ctx, {
    quovo__portfoliosctx$$
  })
}