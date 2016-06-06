import co from "co";
import {catch$error$throw} from "ctx-core/promise/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/co/lib";
export function co$catch$error$throw(ctx, fn) {
  log(`${logPrefix}|co$catch$error$throw`);
  return catch$error$throw(ctx, co(fn));
}