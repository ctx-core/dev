import {assign,clone,pick$keys$public} from "ctx-core/object/lib";
import {http$api} from "ctx-core/http/lib";
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
export function *post$cmd() {
  yield http$api(this, {
    fn: function *(ctx) {
      const request$ctx = clone(this.request.body, {
        http$request: this.request,
        session: this.session
      });
      info(`${logPrefix}|post$cmd`);
      const response$ctx = yield delegate$cmd(request$ctx);
      this.body = JSON.stringify(pick$keys$public(response$ctx));
    }
  });
}