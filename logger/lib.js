import {
  debug as lib$debug,
  log as lib$log,
  info as lib$info,
  warn as lib$warn,
  error as lib$error} from "js-console-color";
const isLocalhostServer = (typeof window === "undefined") && !!(process.env.LOCALHOST);
export function debug(...args) {
  return lib$debug(...arg$$first().concat(args));
}
export function log(...args) {
  return lib$log(...arg$$first().concat(args));
}
export function info(...args) {
  return lib$info(...arg$$first().concat(args));
}
export function warn(...args) {
  return lib$warn(...arg$$first().concat(args));
}
export function error(...args) {
  return lib$error(...arg$$first().concat(args));
}
let arg$$first$;
function arg$$first() {
  if (!arg$$first$) {
    if (isLocalhostServer) {
      arg$$first$ = () => [(new Date()).toISOString()];
    } else {
      arg$$first$ = () => [];
    }
  }
  return arg$$first$();
}