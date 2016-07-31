import {assign,clone} from "ctx-core/object/lib";
import {fetch} from "ctx-core/fetch/lib";
import {agent__fetch} from "ctx-core/agent/fetch";
import {contentType__json} from "ctx-core/http/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/agent/rpc";
export function agent__rpc(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__rpc`);
  return agent__fetch(ctx, {
    reset: reset__rpc,
    reset__rpc: reset__rpc,
    new__rpc$ctx: new__rpc$ctx,
    reset__fetch__assign: reset__fetch__assign
  }, ...agent$ctx$$);
}
export function *reset__rpc() {
  log(`${logPrefix}|reset__rpc`);
  const agent = this;
  let rpc$ctx = agent.new__rpc$ctx({rpc: agent.rpc}, ...arguments)
    , fetch$ctx = {
        body: JSON.stringify(rpc$ctx)
      };
  return yield agent.reset__fetch(fetch$ctx);
}
export function new__rpc$ctx() {
  log(`${logPrefix}|new__rpc$ctx`);
  return assign(...arguments);
}
export function *reset__fetch__assign(fetch$ctx) {
  log(`${logPrefix}|reset__fetch__assign`);
  const agent = this;
  let ctx = agent.ctx;
  const response$ctx = yield http$post__rpc(ctx, fetch$ctx)
      , response$json = yield response$ctx.response.json();
  return yield agent.reset__assign(response$json);
}
// TODO: Extract authentication
export function *http$post__rpc(ctx, fetch$ctx) {
  log(`${logPrefix}|http$post__rpc`);
  return yield fetch(
    ctx,
    {
      method: "POST",
      path: "/rpc"
    },
    fetch$ctx,
    {headers: clone(
      contentType__json,
      fetch$ctx.headers)});
}