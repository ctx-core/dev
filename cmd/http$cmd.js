import {assign,clone,pick$publicKeys} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {delegate$cmd} from "./lib";
import koa$route from "koa-route";
import {log,info,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/cmd/http";
export default function app$use__http$post$cmd() {
  log(logPrefix);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(koa$route.post("/cmd", post$cmd));
}
//POST /cmd
// runs cmd in parallel
// TODO: security
//   quovo$user$id spoofing
export function *post$cmd() {
  const request$ctx = clone(this.request.body, {
    security$web$request: true
  });
  try {
    info(`${logPrefix}|post$cmd`, JSON.stringify(request$ctx));
    const response$ctx = yield delegate$cmd(request$ctx);
    this.body = JSON.stringify(pick$publicKeys(response$ctx));
  } catch (error$ctx) {
    error$throw(request$ctx, error$ctx);
  }
}