import {assign,clone,pick$keys$public} from "ctx-core/object/lib";
import {koa$http$api} from "ctx-core/koa/lib";
import {error$throw} from "ctx-core/error/lib";
import {delegate$cmd} from "./lib";
import koa$route from "koa-route";
import {log,info,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/cmd/koa";
export default function app$use__http$post$cmd() {
  log(`${logPrefix}|app$use__http$post$cmd`);
  debug(`${logPrefix}|app$use__http$post$cmd|1`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(koa$route.post("/cmd", post$cmd));
}
//POST /cmd
// runs cmd in parallel
export function *post$cmd() {
  yield koa$http$api(this, {
    fn: function *(ctx) {
      info(`${logPrefix}|post$cmd`);
      const request$ctx = clone(this.request.body, {
        http$request: this.request,
        session: this.session
      });
      const response$ctx = yield delegate$cmd(request$ctx);
      this.body = JSON.stringify(pick$keys$public(response$ctx));
    }
  });
}