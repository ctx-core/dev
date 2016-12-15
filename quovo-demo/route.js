import {assign} from 'ctx-core/object/lib'
import {mount__router} from 'ctx-core/route/tag'
import {
  start__routes,
  $routeset as $routeset__core,
  $route as $route__core,
  assign__routes} from 'ctx-core/route/lib'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/route'
export function mount__router__quovo(tag, ...route$ctx$$) {
  log(`${logPrefix}|mount__router__quovo`)
  mount__router(tag, {
    assign__routes: assign__routes__quovo
  }, ...route$ctx$$)
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
        route: 'quovo__user',
        fn: $route__quovo__user.bind(ctx)}),
    ...$route(ctx, {
        path: 'quovo/users/*/accounts/*',
        route: 'quovo__user__account',
        fn: $route__quovo__user__account.bind(ctx)}),
    ...$routeset(ctx, {
        path: 'quovo/users/*/accounts/*/portfolios/*',
        route: 'quovo__user__account$portfolio',
        fn: $route__quovo__user__account__portfolio.bind(ctx)}),
    ...$routeset(ctx, {
        path: 'quovo/users/*/accounts/*/portfolios/*/history',
        route: 'quovo__user__account$portfolio$history',
        fn: $route__quovo__user__account__portfolio.bind(ctx)}),
    ...$routeset(ctx, {
        path: 'quovo/users/*/sync',
        route: 'quovo__user$sync',
        fn: $route__quovo__user.bind(ctx)}),
    ...$routeset(ctx, {
        path: 'quovo',
        route: 'quovo'})
  )
}
function $route__quovo__user(route$ctx, quovo__user_id) {
  info(`${logPrefix}|$route__quovo__user`)
  assign(route$ctx, {
    quovo__user_id: parseInt(quovo__user_id) || null,
    route__quovo__user$tile: true
  })
}
function $route__quovo__user__account(route$ctx, quovo__user_id, quovo__account_id) {
  info(`${logPrefix}|$route__quovo__user__account`)
  assign(route$ctx, {
    quovo__user_id: parseInt(quovo__user_id) || null,
    quovo__account_id: parseInt(quovo__account_id) || null,
    route__quovo__user$tile: true,
    route__quovo__account$tile: true
  })
}
function $route__quovo__user__account__portfolio(route$ctx, quovo__user_id, quovo__account_id, quovo__portfolio_id) {
  info(`${logPrefix}|$route__quovo__user__account__portfolio`)
  assign(route$ctx, {
    quovo__user_id: parseInt(quovo__user_id) || null,
    quovo__account_id: parseInt(quovo__account_id) || null,
    quovo__portfolio_id: parseInt(quovo__portfolio_id) || null,
    route__quovo__user$tile: true,
    route__quovo__account$tile: true,
    route__quovo__portfolio$tile: true
  })
}
function $routeset(ctx, ...routeset$ctx$$) {
  log(`${logPrefix}|$routeset`)
  return $routeset__core(ctx, {$route}, ...routeset$ctx$$)
}
function $route(ctx, ...route$ctx$$) {
  log(`${logPrefix}|$route`)
  return $route__core(ctx, {$set$ctx}, ...route$ctx$$)
}
function $set$ctx() {
  log(`${logPrefix}|$set$ctx`)
  return assign({
    route__quovo: null,
    route__quovo__user__account: null,
    route__quovo__user__account$portfolio: null,
    route__quovo__user__account$portfolio$history: null,
    route__quovo__user: null,
    route__quovo__user$sync: null,
    route__quovo__user$tile: null,
    route__quovo__account$tile: null,
    route__quovo__portfolio$tile: null,
    quovo__user_id: null,
    quovo__account_id: null,
    quovo__portfolio_id: null
  }, ...arguments)
}