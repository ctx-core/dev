export function $hostname(ctx) {
  const hostname =
          ( typeof window === 'object'
            && window.location.hostname)
          || ''
  return hostname
}
export function $pathname(ctx) {
  const pathname =
          ( typeof window === 'object'
            && window.location.pathname)
          || ''
  return pathname
}