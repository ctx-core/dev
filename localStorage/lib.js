import {assign} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/localStorage/lib";
export function localStorage$load() {
  log(`${logPrefix}|localStorage$load`);
  const localStorage$ctx$json = localStorage.getItem("ctx")
      , ctx = localStorage$ctx$json ? JSON.parse(localStorage$ctx$json) : {};
  return ctx;
}
export function localStorage$assign() {
  log(`${logPrefix}|localStorage$assign`);
  const ctx = assign(localStorage$load(), ...arguments);
  localStorage$set(ctx);
  return ctx;
}
export function localStorage$set(ctx) {
  log(`${logPrefix}|localStorage$set`);
  localStorage.setItem("ctx", JSON.stringify(ctx));
  return ctx;
}
export function localStorage$remove(...args) {
  log(`${logPrefix}|localStorage$remove`);
  let ctx = localStorage$load();
  args.forEach(
    key =>
      delete ctx[key]);
  localStorage$set(ctx);
  return ctx;
}