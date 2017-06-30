import {change__agents as _change__agents} from 'ctx-core/agent/lib'
import {ensure__router} from 'ctx-core/route/lib'
import {route__agent} from 'ctx-core/route/agent'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/route'
export function mount__router__quovo(ctx, ...ctx__route$$) {
  log(`${logPrefix}|mount__router__quovo`)
  route__agent(ctx)
  ensure__router(ctx)
    .add(
      new RegExp('quovo/users/(.*)'),
      route__user__quovo)
    .add(
      new RegExp('quovo/users/(.*)/accounts/(.*)'),
      route__account__user__quovo())
    .add(
      new RegExp('quovo/users/(.*)/accounts/(.*)/portfolios/(.*)/history'),
      route__portfolio__account__user__quovo)
    .add(
      new RegExp('quovo/users/(.*)/sync'),
      route__sync__user__quovo)
    .add(
      new RegExp('quovo'),
      route__quovo)
    .listen()
  return ctx
  function route__quovo() {
    log(`${logPrefix}|route__quovo`)
    ctx.route__agent.set({
      route: 'quovo'
    })
  }
  function route__user__quovo(_user_id__quovo) {
    log(`${logPrefix}|route__user__quovo`)
    _route__user__quovo('user__quovo', _user_id__quovo)
  }
  function route__sync__user__quovo(_user_id__quovo) {
    log(`${logPrefix}|route__sync__user__quovo`)
    _route__user__quovo('sync__user__quovo', _user_id__quovo)
  }
  function _route__user__quovo(route, _user_id__quovo) {
    log(`${logPrefix}|_route__user__quovo`)
    const user_id__quovo = parseInt(_user_id__quovo) || null
    ctx.route__agent.set({
      route,
      query__route: {
        user_id__quovo
      }
    })
    change__agents(ctx, {
      user_id__quovo,
      tile__route__user__quovo: true
    })
  }
  function route__account__user__quovo(_user_id__quovo, _account_id__quovo) {
    info(`${logPrefix}|route__account__user__quovo`)
    const user_id__quovo = parseInt(_user_id__quovo) || null
        , account_id__quovo = parseInt(_account_id__quovo) || null
    ctx.route__agent.set({
      route: 'account__user__quovo',
      query__route: {
        user_id__quovo,
        account_id__quovo
      }
    })
    change__agents(ctx, {
      user_id__quovo,
      account_id__quovo,
      tile__route__user__quovo: true,
      tile__route__quovo__account: true
    })
  }
  function route__portfolio__account__user__quovo(_user_id__quovo, _account_id__quovo, _portfolio_id__quovo) {
    info(`${logPrefix}|route__portfolio__account__user__quovo`)
    const user_id__quovo = parseInt(_user_id__quovo) || null
        , account_id__quovo = parseInt(_account_id__quovo) || null
        , portfolio_id__quovo = parseInt(_portfolio_id__quovo) || null
    ctx.route__agent.set({
      route: 'portfolio__account__user__quovo',
      query__route: {
        user_id__quovo,
        account_id__quovo,
        portfolio_id__quovo
      }
    })
    change__agents(ctx, {
      user_id__quovo,
      account_id__quovo,
      portfolio_id__quovo,
      tile__route__user__quovo: true,
      tile__route__quovo__account: true,
      tile__route__portfolio__quovo: true
    })
  }
}
function change__agents() {
  log(`${logPrefix}|change__agents`)
  return _change__agents({
    tile__route__user__quovo: null,
    tile__route__quovo__account: null,
    tile__route__portfolio__quovo: null,
    user_id__quovo: null,
    account_id__quovo: null,
    portfolio_id__quovo: null
  }, ...arguments)
}