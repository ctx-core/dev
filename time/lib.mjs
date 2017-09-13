export function $now__millis() {
  return new Date().getTime()
}
export function timedout(start, timout_ms) {
  return new Date().getTime() >= (start.getTime() + timout_ms)
}