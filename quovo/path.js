import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/path";
export function path__quovo$user(ctx, quovo$user) {
  const quovo$user$id = quovo$user ?
          quovo$user.id :
          ctx.quovo$user$id;
  return (
    quovo$user$id &&
    `quovo/users/${quovo$user$id}`
  ) || "";
}
export function path__quovo$user$sync() {
  const path__quovo$user$ = path__quovo$user(...arguments);
  return (
    path__quovo$user$ &&
    `${path__quovo$user$}/sync`
  ) || "";
}
export function path__quovo$user$account(ctx, quovo$account) {
  const quovo$account$id = quovo$account ?
          quovo$account.id :
          ctx.quovo$account$id;
  return (
    quovo$account$id &&
    `${path__quovo$user(ctx)}/accounts/${quovo$account$id}`
  ) || "";
}
export function path__quovo$user$account$portfolio(ctx, quovo$portfolio) {
  const quovo$portfolio$id = quovo$portfolio ?
          quovo$portfolio.id :
          ctx.quovo$portfolio$id;
  return (
    quovo$portfolio$id &&
    `${path__quovo$user$account(ctx)}/portfolios/${quovo$portfolio$id}`
  ) || "";
}
export function path__quovo$user$account$portfolio$history() {
  const path__quovo$user$account$portfolio$ = path__quovo$user$account$portfolio(...arguments);
  return (
    path__quovo$user$account$portfolio$ &&
    `${path__quovo$user$account$portfolio$}/history`
  ) || "";
}