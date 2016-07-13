import {assign,clone,pick__keys$public} from "ctx-core/object/lib";
import {call__koa$http} from "ctx-core/koa/lib";
import {cmd__delegate} from "./lib";
import koa$route from "koa-route";
import {log,info,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/cmd/koa";
export default function app$use__http$post__cmd() {
  log(`${logPrefix}|app$use__http$post__cmd`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(koa$route.post("/cmd", http$post__cmd));
}
//POST /cmd
// runs cmd in parallel
export function *http$post__cmd() {
  yield call__koa$http(this, function *(ctx) {
    info(`${logPrefix}|http$post__cmd`);
    const request$ctx = clone(this.request.body, {
      http$request: this.request,
      session: this.session
    });
    const response$ctx = yield cmd__delegate(request$ctx);
    this.body = JSON.stringify(pick__keys$public(response$ctx));
  });
}