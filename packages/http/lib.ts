import { assign } from '@ctx-core/object'
// { headers: { 'Cache-Control': 'public, max-age=3600' } } append
export function _CacheControl__5min() {
	return assign({ 'Cache-Control': 'public, max-age=300' }, ...arguments)
}
export function _CacheControl__1hour() {
	return assign({ 'Cache-Control': 'public, max-age=3600' }, ...arguments)
}
export function assign__headers__http(ctx, ...a1__headers) {
	const headers = ctx.headers || {}
	assign(headers, ...a1__headers)
	ctx.headers = headers
	return ctx
}
export function _ContentType__json() {
	return assign({ 'Content-Type': 'application/json' }, ...arguments)
}
export function _ContentType__svg() {
	return assign({ 'Content-Type': 'image/svg+xml' }, ...arguments)
}
export function throw__internal_server_error() {
  throw 'Internal server error'
}
export function _send__302(res) {
	res.writeHead(302, { Location: '/auth/password/reset' })
	res.end('')
}
