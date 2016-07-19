/** @module ctx-core/rpc/koa */
import {assign,pick__public_keys} from "ctx-core/object/lib";
import {call__koa$http} from "ctx-core/koa/lib";
import {delegate__rpc} from "./lib";
import koa$route from "koa-route";
import {log,info,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/rpc/koa";
/**
 * koa handler for POST /rpc
 * @see module:ctx-core/rpc/lib.delegate__rpc
 * @listens {http} listens to http requests
 */
export default function app$use__http$post__rpc() {
  log(`${logPrefix}|app$use__http$post__rpc`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(koa$route.post("/rpc", http$post__rpc));
}
/**
 * HTTP POST /rpc
 */
export function *http$post__rpc(next) {
  yield call__koa$http(this, function *(ctx) {
    info(`${logPrefix}|http$post__rpc`);
    const request$ctx = assign(ctx, this.request.body, {
      request: this.request,
      session: this.session
    });
    info(`${logPrefix}|http$post__rpc|rpc`, JSON.stringify(request$ctx.rpc));
    const response$ctx = yield delegate__rpc(request$ctx);
    this.body = JSON.stringify(pick__public_keys(response$ctx));
  });
}