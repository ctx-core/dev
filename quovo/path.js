export function path__quovo__user(ctx, quovo__user) {
  const quovo__user_id =
          quovo__user
          ? quovo__user.id
          : ctx.quovo__user_id
  return (
    quovo__user_id
    && `quovo/users/${quovo__user_id}`
  ) || ''
}
export function path__quovo__user$sync() {
  const path__quovo__user$ = path__quovo__user(...arguments)
  return (
    path__quovo__user$
    && `${path__quovo__user$}/sync`
  ) || ''
}
export function path__quovo__user__account(ctx, quovo__account) {
  const quovo__account_id =
          quovo__account
          ? quovo__account.id
          : ctx.quovo__account_id
  return (
    quovo__account_id
    && `${path__quovo__user(ctx)}/accounts/${quovo__account_id}`
  ) || ''
}
export function path__quovo__user__account$portfolio(ctx, quovo__portfolio) {
  const quovo__portfolio_id =
          quovo__portfolio
          ? quovo__portfolio.id
          : ctx.quovo__portfolio_id
  return (
    quovo__portfolio_id
    && `${path__quovo__user__account(ctx)}/portfolios/${quovo__portfolio_id}`
  ) || ''
}
export function path__quovo__user__account$portfolio$history() {
  const path__quovo__user__account$portfolio$ = path__quovo__user__account$portfolio(...arguments)
  return (
    path__quovo__user__account$portfolio$
    && `${path__quovo__user__account$portfolio$}/history`
  ) || ''
}