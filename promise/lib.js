import {throw__error} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/promise/lib";
export function promise$catch(ctx, promise) {
  log(`${logPrefix}|promise$catch`);
  return promise
    .catch(
      error$ctx =>
        throw__error(ctx, error$ctx));
}