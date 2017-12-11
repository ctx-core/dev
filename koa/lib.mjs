import {assign} from 'ctx-core/object/lib'
import send__koa from 'koa-send'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/koa/lib'
export function use__send(app, _opts={}) {
  log(`${logPrefix}|use__send`)
  const opts =
          assign({
            root: './public',
            index: 'index.html'
          }, _opts)
  app.use(send)
  async function send(ctx, next) {
    ctx.compress = true
    try {
      await send__koa(ctx, ctx.path, opts)
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e
      }
    }
    await next()
  }
}
export function use__log__request__time(app) {
  log(`${logPrefix}|use__log__request__time`)
  app.use(log__request$time)
  async function log__request$time(ctx, next) {
    const start = new Date()
    try {
      await next()
    } finally {
      const ms = new Date - start
      info(`${logPrefix}|log__request$time`, `${ms}ms`, ctx.method, ctx.url)
    }
  }
}
export function use__echo(app) {
  log(`${logPrefix}|use__echo`)
  app.use(echo)
  async function echo(ctx) {
    if (!ctx.body) {
      const {method, url} = ctx
      info(`${logPrefix}|default|${method} ${url}`)
      ctx.body = `${method} ${url}`
    }
  }
}
export function set__cache_control(
  self,
  cache_control='public, max-age=3600'
) {
  log(`${logPrefix}|set__cache_control`)
  self.set('Cache-Control', cache_control)
}
export function set__cache_control__5min(self) {
  log(`${logPrefix}|set__cache_control__5min`)
  set__cache_control(self, 'public, max-age=300')
}
export function set__cache_control__1hour(self) {
  log(`${logPrefix}|set__cache_control__5min`)
  set__cache_control(self, 'public, max-age=3600')
}
export function set__cache_control__1day(self) {
  log(`${logPrefix}|set__cache_control__5min`)
  set__cache_control(self, 'public, max-age=86400')
}
export function set__headers(self, ...array__ctx) {
  log(`${logPrefix}|set__headers`)
  const ctx = assign(...array__ctx)
      , {headers=[]} = ctx
  for (let key in headers) {
    self.set(key, headers[key])
  }
}