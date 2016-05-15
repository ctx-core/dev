import {error$throw} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/promise/lib";
export function catch$error$throw(promise, ctx) {
  log(`${logPrefix}|catch$error$throw`);
  return promise
    .catch(
      error$ctx =>
        error$throw(ctx, error$ctx));
}