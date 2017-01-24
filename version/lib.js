export function $version(ctx) {
  return ctx && (ctx.CACHE_VERSION || ctx.VERSION) || Math.random()
}