import {assign} from "ctx-core/object/lib";
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
    log(`${logPrefix}|log$request$time`, `${ms}ms`, this.method, this.url, JSON.stringify(this.headers));
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
      const error$ctx$string = error$ctx.toString()
          , error$json = error$ctx$string === "[object Object]" ? "Error" : error$ctx$string;
      error(error$json);
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