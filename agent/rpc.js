import {assign,clone} from "ctx-core/object/lib";
import {fetch} from "ctx-core/fetch/lib";
import {ensure__agent,new__fetch$ctx__agent} from "ctx-core/agent/lib";
import {assign__http$headers,contentType__json} from "ctx-core/http/lib";
import {
  ensure__table__debounce,
  assign$key__table__debounce,
  call$key__table__debounce} from "ctx-core/debounce/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/agent/rpc";
export function ensure__agent__rpc(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__rpc`);
  return ensure__agent(ctx, {
    reset: reset__rpc,
    reset__rpc: reset__rpc,
    new__fetch$ctx: new__fetch$ctx__agent,
    new__rpc$ctx: new__rpc$ctx,
    reset__do: reset__do__fetch__rpc,
    reset__assign__rpc: reset__assign__rpc
  }, ...agent$ctx$$);
}
export function *reset__rpc() {
  log(`${logPrefix}|reset__rpc`);
  const agent = this
      , key = agent.key
      , reset$ctx = clone(...arguments)
      , rpc = agent.rpc;
  let ctx = agent.ctx;
  ensure__table__debounce(ctx);
  let table__debounce = ctx.table__debounce;
  const rpc$ctx = agent.new__rpc$ctx(reset$ctx, {
          rpc: rpc,
          log: `${logPrefix}|reset__rpc|POST /rpc|${key}|${JSON.stringify(rpc)}`
        })
      , rpc$ctx$json = JSON.stringify(rpc$ctx);
  if (table__debounce[rpc$ctx$json]) {
    log(`${logPrefix}|reset__rpc|noop`, key, rpc);
    return yield agent.reset__noop();}
  try {
    log(`${logPrefix}|reset__rpc|try`, key, rpc);
    assign$key__table__debounce(ctx, rpc$ctx$json);
    return yield agent.reset__do(rpc$ctx);
  } finally {
    call$key__table__debounce(ctx, rpc$ctx$json);
  }
}
export function new__rpc$ctx() {
  log(`${logPrefix}|new__rpc$ctx`);
  return assign(...arguments);
}
export function *reset__do__fetch__rpc(rpc$ctx) {
  log(`${logPrefix}|reset__do__fetch__rpc`);
  const agent = this;
  let ctx = agent.ctx;
  const response$ctx = yield http$post__rpc(ctx, rpc$ctx);
  return yield agent.reset__assign__rpc(response$ctx);
}
// TODO: Extract authentication
export function *http$post__rpc(ctx, rpc$ctx) {
  log(`${logPrefix}|http$post__rpc`);
  const rpc$json = (typeof rpc$ctx === "string") ?
          rpc$ctx :
          JSON.stringify(rpc$ctx);
  return yield fetch.http$post(
    ctx,
    new__fetch$ctx__agent(assign__http$headers({
      path: "/rpc",
      body: rpc$json
    }, contentType__json)));
}
export function *reset__assign__rpc(response$ctx) {
  log(`${logPrefix}|reset__assign__rpc`);
  const agent = this
      , response$json = yield response$ctx.response.json();
  return yield agent.reset__assign(response$json);
}