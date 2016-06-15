import {assign,clone,keys} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {log,info,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/koa/lib";
export function app$use__log$request$time() {
  log(`${logPrefix}|app$use__log$request$time`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(function *log$request$time(next){
  const start = new Date;
  try {
    yield next;
  } finally {
    const ms = new Date - start;
    log(`${logPrefix}|log$request$time`, `${ms}ms`, this.method, this.url);
  }
});
}
export function app$use__http$error() {
  log(`${logPrefix}|app$use__http$error`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(function *http$error(next){
    try {
      yield next;
    } catch (error$ctx) {
      const http$error$message = error$ctx.http$error$message || "Error"
          , error$ctx$response$body = error$ctx.response$body
          , response$body = error$ctx$response$body ?
              error$ctx$response$body :
              JSON.stringify({error$message: http$error$message});
      error(`${logPrefix}|app$use__http$error|catch`, response$body);
      this.status = error$ctx.http$status || 500;
      this.body = response$body;
    }
  });
}
export function app$use__echo() {
  log(`${logPrefix}|app$use__echo`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(function *(){
    if (!this.body) {
      info(`${logPrefix}|default|${this.method} ${this.url}`);
      this.body = `${this.method} ${this.url}`;
    }
  });
}
export function *koa$http$api(http$self, ...koa$api$ctx$$) {
  log(`${logPrefix}|koa$http$api`);
  const koa$api$ctx = assign(...koa$api$ctx$$)
      , fn = koa$api$ctx.fn;
  let ctx = {http$self: http$self};
  try {
    yield fn.call(http$self, ctx);
  } catch (error$ctx) {
    error$throw(assign(koa$api$ctx, ctx), error$ctx);
  }
}
export function http$cache(self, cache_control="public, max-age=3600") {
  log(`${logPrefix}|http$cache`);
  self.set("Cache-Control", cache_control);
}
export function http$cache__5min(self) {
  log(`${logPrefix}|http$cache__5min`);
  http$cache(self, "public, max-age=300");
}
export function http$cache__1hour(self) {
  log(`${logPrefix}|http$cache__5min`);
  http$cache(self, "public, max-age=3600");
}
export function http$cache__1day(self) {
  log(`${logPrefix}|http$cache__5min`);
  http$cache(self, "public, max-age=86400");
}
export function koa$set$headers(self, ...ctx$$) {
  log(`${logPrefix}|koa$set$headers`);
  const ctx = assign(...ctx$$)
      , headers = ctx.headers || [];
  keys(headers).forEach(
    header$key =>
      self.set(header$key, headers[header$key]));
}