import co from "co";
import {promise$catch} from "ctx-core/promise/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/co/lib";
export function co__promise$catch(ctx, fn, ...args) {
  log(`${logPrefix}|co__promise$catch`);
  return promise$catch(ctx, co.wrap(fn)(...args));
}