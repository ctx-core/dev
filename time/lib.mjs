export function _now__millis() {
  return new Date().getTime()
}
export const $now__millis = _now__millis
export function timedout(start, timout_ms) {
  return new Date().getTime() >= (start.getTime() + timout_ms)
}
export function _timestamp__ms() {
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
export const $timestamp__ms = _timestamp__ms
/**
 *
 * @param date
 * @returns {string}
 * @see {@link https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site#answer-3177838}
 */
export function _text__time__since(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
}