import {assign} from 'ctx-core/object/lib'
const logPrefix = 'ctx-core/http/lib.mjs'
// {headers: {'Cache-Control': 'public, max-age=3600'}} append
export function $CacheControl__5min() {
  return assign({'Cache-Control': 'public, max-age=300'}, ...arguments)
}
export function $CacheControl__1hour() {
  return assign({'Cache-Control': 'public, max-age=3600'}, ...arguments)
}
export function assign__headers__http(ctx, ...headers$$) {
  const headers = ctx.headers || {}
  assign(headers, ...headers$$)
  ctx.headers = headers
  return ctx
}
export function $ContentType__json() {
  return assign({'Content-Type': 'application/json'}, ...arguments)
}
export function $ContentType__svg() {
  return assign({'Content-Type': 'image/svg+xml'}, ...arguments)
}