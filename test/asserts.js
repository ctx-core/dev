import {error$throw} from "ctx-core/error/lib"
import {log,debug} from "ctx-core/logger/lib";
import equal from "deep-equal";
const tab = "              "
    , logPrefix = "ctx-core/test/asserts";
export function assert$equal(ctx) {
  const error$message$header = ctx.error$message$header
      , error$message$header$ = error$message$header ? `${tab}${error$message$header}\n` : ""
      , fn$error$message = ctx.fn$error ||
          (ctx =>
            `\n${error$message$header$}${tab}${JSON.stringify(ctx.actual)} should == ${JSON.stringify(ctx.expected)}`);
  if (!equal(ctx.actual, ctx.expected)) {
    log(`${logPrefix}|assertEqual|error`);
    error$throw(ctx, {error$message: fn$error$message(ctx)});
  }
}
export function error$msg__multiline$json(ctx) {
  return `${JSON.stringify(ctx.actual)}\n${tab}should equal\n${tab}${JSON.stringify(ctx.expected)}`;
}
export function assert$match(ctx) {
  const match = ctx.match
      , actual = ctx.actual
      , fn$error$message = ctx.fn$error ||
          (ctx =>
            `${ctx.actual} should match ${ctx.match}`);
  if (typeof match === "string") {
    if (actual.indexOf(match) == -1) {
      log(`${logPrefix}|assert$match|string|error`);
      error$throw(ctx, {error$message: fn$error$message(ctx)});
    }
  } else if (typeof match === "object") {
    if (!match.test(actual)) {
      log(`${logPrefix}|assert$match|object|error`);
      error$throw(ctx, {error$message: fn$error$message(ctx)});
    }
  }
}