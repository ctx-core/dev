export function timedout(start, timout_ms) {
  return new Date().getTime() >= (start.getTime() + timout_ms)
}