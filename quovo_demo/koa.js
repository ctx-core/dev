import "ctx-core/quovo_demo/env";
import {assign} from "ctx-core/object/lib";
import {koa$http$api} from "ctx-core/koa/lib";
import {quovo_demo$html} from "ctx-core/quovo_demo/html";
import koa$route from "koa-route";
import "ctx-core/quovo/cmd";
import {log,info,debug} from "ctx-core/logger/lib"
const logPrefix = "quovo_demo/koa";
export function app$use__quovo_demo() {
  log(`${logPrefix}|app$use__quovo_demo`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(koa$route.get("/test.quovo", function *() {
    this.redirects("/quovo_demo");
  }));
  app.use(koa$route.get("/quovo-demo", http$get$quovo_demo));
  app.use(koa$route.get("/quovo_demo", redirects$quovo$demo));
  app.use(koa$route.get("/quovo_test", redirects$quovo$demo));
}
function *redirects$quovo$demo() {
  this.redirects("/quovo-demo");
}
//GET /quovo_demo
export function *http$get$quovo_demo() {
  info(`${logPrefix}|http$get$quovo_demo`);
  return yield koa$http$api(this, {
    fn: function *(ctx) {
      log(`${logPrefix}|http$get$quovo_demo|fn`);
      this.body = quovo_demo$html(ctx);
    }
  });
}