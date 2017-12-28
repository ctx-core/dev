export function $now__millis() {
  return new Date().getTime()
}
export function timedout(start, timout_ms) {
  return new Date().getTime() >= (start.getTime() + timout_ms)
}
export function $timestamp__ms() {
  const performance = typeof window === 'object' && window
      , now = performance && performance.now
      , timing = performance && performance.timing
      , navigationStart = timing && timing.navigationStart
      , timestamp__ms =
          now && navigationStart
          ? now() + navigationStart
          : Date.now()
  return timestamp__ms
}