import "ctx-core/basic_auth/env";
import {assign} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import koa$basic$auth from "koa-basic-auth";
import env from "ctx-core/basic_auth/env";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/basic_auth/lib";
export function app$use__basic_auth() {
  log(`${logPrefix}|app$use__basic_auth`);
  const ctx = assign(...arguments)
      , app = ctx.app;
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
        throw__error(error$ctx);
      }
    }
  });
  app.use(koa$basic$auth({name: env.BASIC_AUTH_LOGIN, pass: env.BASIC_AUTH_PASSWORD}));
}