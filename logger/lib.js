import {
  debug as debug__super,
  log as log__super,
  info as info__super,
  warn as warn__super,
  error as error__super} from "js-console-color";
const isLocalhostServer = (typeof window === "undefined") && !!(process.env.LOCALHOST);
export function debug(...args) {
  return debug__super(...arguments$first().concat(args));
}
export function log(...args) {
  return log__super(...arguments$first().concat(args));
}
export function info(...args) {
  return info__super(...arguments$first().concat(args));
}
export function warn(...args) {
  return warn__super(...arguments$first().concat(args));
}
export function error(...args) {
  return error__super(...arguments$first().concat(args));
}
let arguments$first__local;
function arguments$first() {
  if (!arguments$first__local) {
    if (isLocalhostServer) {
      arguments$first__local = () => [(new Date()).toISOString()];
    } else {
      arguments$first__local = () => [];
    }
  }
  return arguments$first__local();
}
export function fn$log(message, fn) {
  return function() {
    log(message);
    return fn.apply(this, arguments);
  };
}