import "./env";
import {assign} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import koa$basic$auth from "koa-basic-auth";
import koa$sslify from "koa-sslify";
import env from "./env";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/basic_auth/lib";
export function app$use__basic_auth() {
  log(`${logPrefix}|app$use__basic_auth`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  if (!env.isLocalhost) {
    app.use(koa$sslify({trustProtoHeader: true}));
  }
  app.use(function *basic_auth(next){
    log(`${logPrefix}|app$use__basic_auth|basic_auth`);
    try {
      yield next;
    } catch (error$ctx) {
      error(`${logPrefix}|app$use__basic_auth|basic_auth|error`, error$ctx);
      const error$ctx$http$status = error$ctx.http$status;
      if (401 == error$ctx$http$status || error$ctx.toString() === "UnauthorizedError: Unauthorized") {
        this.status = parseInt(error$ctx$http$status) || 401;
        this.set("WWW-Authenticate", "Basic");
        this.body = "unauthorized";
      } else {
        error$throw(error$ctx);
      }
    }
  });
  app.use(koa$basic$auth({name: env.basic_auth$login, pass: env.basic_auth$password}));
}