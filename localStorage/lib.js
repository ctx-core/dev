import {assign} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/localStorage/lib";
export function load__localStorage$ctx() {
  log(`${logPrefix}|load__localStorage$ctx`);
  const localStorage$ctx$json = localStorage.getItem("ctx")
      , ctx = localStorage$ctx$json ? JSON.parse(localStorage$ctx$json) : {};
  return ctx;
}
export function assign__localStorage$ctx() {
  log(`${logPrefix}|assign__localStorage$ctx`);
  const ctx = assign(load__localStorage$ctx(), ...arguments);
  set__localStorage$ctx(ctx);
  return ctx;
}
export function set__localStorage$ctx(ctx) {
  log(`${logPrefix}|set__localStorage$ctx`);
  localStorage.setItem("ctx", JSON.stringify(ctx));
  return ctx;
}
export function remove__localStorage$ctx(...args) {
  log(`${logPrefix}|remove__localStorage$ctx`);
  let ctx = load__localStorage$ctx();
  args.forEach(
    key =>
      delete ctx[key]);
  set__localStorage$ctx(ctx);
  return ctx;
}