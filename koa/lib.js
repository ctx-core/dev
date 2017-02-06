import {assign} from 'ctx-core/object/lib'
import {throw__error} from 'ctx-core/error/lib'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/koa/lib'
export function app$use__log__request$time() {
  log(`${logPrefix}|app$use__log__request$time`)
  const ctx = assign(...arguments)
      , {app} = ctx
  app.use(function *log__request$time(next){
    const start = new Date()
    try {
      yield next
    } finally {
      const ms = new Date - start
      info(`${logPrefix}|log__request$time`, `${ms}ms`, this.method, this.url)
    }
  })
}
export function app$use__echo(ctx) {
  log(`${logPrefix}|app$use__echo`)
  const {app} = ctx
  app.use(function *(){
    if (!this.body) {
      const {method, url} = this
      info(`${logPrefix}|default|${method} ${url}`)
      this.body = `${method} ${url}`
    }
  })
}
export function *$gen__koa(koa, fn) {
  log(`${logPrefix}|$gen__koa`)
  const ctx = {koa}
  try {
    yield fn.call(koa, ctx)
  } catch (error$ctx) {
    throw__error(ctx, error$ctx)
  }
  return ctx
}
export function http$cache(self, cache_control='public, max-age=3600') {
  log(`${logPrefix}|http$cache`)
  self.set('Cache-Control', cache_control)
}
export function http$cache__5min(self) {
  log(`${logPrefix}|http$cache__5min`)
  http$cache(self, 'public, max-age=300')
}
export function http$cache__1hour(self) {
  log(`${logPrefix}|http$cache__5min`)
  http$cache(self, 'public, max-age=3600')
}
export function http$cache__1day(self) {
  log(`${logPrefix}|http$cache__5min`)
  http$cache(self, 'public, max-age=86400')
}
export function set__headers(self, ...ctx$$) {
  log(`${logPrefix}|set__headers`)
  const ctx = assign(...ctx$$)
      , {headers=[]} = ctx
  for (let key in headers) {
    self.set(key, headers[key])
  }
}