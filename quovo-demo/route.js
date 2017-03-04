import {assign} from 'ctx-core/object/lib'
import {mount__router} from 'ctx-core/route/tag'
import {
  start__routes,
  $routeset as $routeset__core,
  $route as $route__core,
  assign__routes} from 'ctx-core/route/lib'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/route'
export function mount__router__quovo(tag, ...ctx__route$$) {
  log(`${logPrefix}|mount__router__quovo`)
  mount__router(tag, {
    assign__routes: assign__routes__quovo
  }, ...ctx__route$$)
  start__routes(false)
  return tag
}
export function assign__routes__quovo() {
  log(`${logPrefix}|$routes`)
  let ctx = assign(...arguments)
  return assign__routes(
    ctx,
    ...$routeset(ctx, {
        path: 'quovo/users/*',
        route: 'user__quovo',
        fn: $route__user__quovo.bind(ctx)}),
    ...$route(ctx, {
        path: 'quovo/users/*/accounts/*',
        route: 'account__user__quovo',
        fn: $route__account__user__quovo.bind(ctx)}),
    ...$routeset(ctx, {
        path: 'quovo/users/*/accounts/*/portfolios/*',
        route: 'portfolio__account__user__quovo',
        fn: $route__portfolio__account__user__quovo.bind(ctx)}),
    ...$routeset(ctx, {
        path: 'quovo/users/*/accounts/*/portfolios/*/history',
        route: 'portfolio_history__account__user__quovo',
        fn: $route__portfolio__account__user__quovo.bind(ctx)}),
    ...$routeset(ctx, {
        path: 'quovo/users/*/sync',
        route: 'sync__user__quovo',
        fn: $route__user__quovo.bind(ctx)}),
    ...$routeset(ctx, {
        path: 'quovo',
        route: 'quovo'})
  )
}
function $route__user__quovo(ctx__route, user_id__quovo) {
  info(`${logPrefix}|$route__user__quovo`)
  assign(ctx__route, {
    user_id__quovo: parseInt(user_id__quovo) || null,
    tile__route__user__quovo: true
  })
}
function $route__account__user__quovo(ctx__route, user_id__quovo, account_id__quovo) {
  info(`${logPrefix}|$route__account__user__quovo`)
  assign(ctx__route, {
    user_id__quovo: parseInt(user_id__quovo) || null,
    account_id__quovo: parseInt(account_id__quovo) || null,
    tile__route__user__quovo: true,
    tile__route__quovo__account: true
  })
}
function $route__portfolio__account__user__quovo(ctx__route, user_id__quovo, account_id__quovo, portfolio_id__quovo) {
  info(`${logPrefix}|$route__portfolio__account__user__quovo`)
  assign(ctx__route, {
    user_id__quovo: parseInt(user_id__quovo) || null,
    account_id__quovo: parseInt(account_id__quovo) || null,
    portfolio_id__quovo: parseInt(portfolio_id__quovo) || null,
    tile__route__user__quovo: true,
    tile__route__quovo__account: true,
    tile__route__portfolio__quovo: true
  })
}
function $routeset(ctx, ...routectx__set$$) {
  log(`${logPrefix}|$routeset`)
  return $routeset__core(ctx, {$route}, ...routectx__set$$)
}
function $route(ctx, ...ctx__route$$) {
  log(`${logPrefix}|$route`)
  return $route__core(ctx, {$ctx__set}, ...ctx__route$$)
}
function $ctx__set() {
  log(`${logPrefix}|$ctx__set`)
  return assign({
    route__quovo: null,
    route__account__user__quovo: null,
    route__portfolio__account__user__quovo: null,
    route__portfolio_history__account__user__quovo: null,
    route__user__quovo: null,
    route__sync__user__quovo: null,
    tile__route__user__quovo: null,
    tile__route__quovo__account: null,
    tile__route__portfolio__quovo: null,
    user_id__quovo: null,
    account_id__quovo: null,
    portfolio_id__quovo: null
  }, ...arguments)
}