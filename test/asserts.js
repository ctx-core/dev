import {throw__error} from "ctx-core/error/lib"
import {log,debug} from "ctx-core/logger/lib";
import equal from "deep-equal";
const tab = "              "
    , logPrefix = "ctx-core/test/asserts";
export function assert__equal(ctx) {
  const error_message$header = ctx.error_message$header
      , error_message$header$ = error_message$header ? `${tab}${error_message$header}\n` : ""
      , new__error_message = ctx.new__error ||
          (ctx =>
            `\n${error_message$header$}${tab}${JSON.stringify(ctx.actual)} should == ${JSON.stringify(ctx.expected)}`);
  if (!equal(ctx.actual, ctx.expected)) {
    log(`${logPrefix}|assertEqual|error`);
    throw__error(ctx, {error_message: new__error_message(ctx)});
  }
}
export function error$msg__multiline$json(ctx) {
  return `${JSON.stringify(ctx.actual)}\n${tab}should equal\n${tab}${JSON.stringify(ctx.expected)}`;
}
export function assert__match(ctx) {
  const match = ctx.match
      , actual = ctx.actual
      , new__error_message = ctx.new__error ||
          (ctx =>
            `${ctx.actual} should match ${ctx.match}`);
  if (typeof match === "string") {
    if (actual.indexOf(match) == -1) {
      log(`${logPrefix}|assert__match|string|error`);
      throw__error(ctx, {error_message: new__error_message(ctx)});
    }
  } else if (typeof match === "object") {
    if (!match.test(actual)) {
      log(`${logPrefix}|assert__match|object|error`);
      throw__error(ctx, {error_message: new__error_message(ctx)});
    }
  }
}