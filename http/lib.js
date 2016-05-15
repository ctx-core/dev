import {assign,clone} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {log,info,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/http/lib";
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
          , error$json = JSON.stringify({error$message: http$error$message});
      error(`${logPrefix}|app$use__http$error|catch`, error$json);
      this.status = error$ctx.http$status || 500;
      this.body = error$json;
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
export function *http$api(http$self, ...http$api$ctx$$) {
  log(`${logPrefix}|http$api`);
  const http$api$ctx = assign(...http$api$ctx$$)
      , fn = http$api$ctx.fn;
  let ctx = {http$self: http$self};
  try {
    yield fn.call(http$self, ctx);
  } catch (error$ctx) {
    error$throw(assign(http$api$ctx, ctx), error$ctx);
  }
}
let html$ctx$fn$$ = [];
export function assign__html$ctx$fn() {
  log(`${logPrefix}|assign__html$ctx$fn`);
  html$ctx$fn$$.push(...arguments);
}
export function html$ctx(ctx, ...html$ctx$$) {
  log(`${logPrefix}|html$ctx`);
  let html$ctx$ = {};
  html$ctx$fn$$.forEach(
    html$ctx$fn => assign(html$ctx$, html$ctx$fn(ctx, html$ctx$)));
  assign(html$ctx$, ...html$ctx$$);
  return html$ctx$;
}