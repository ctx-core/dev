import {assign,assign__keys$public} from "ctx-core/object/lib";
import {
  http$get$user$$,
  http$get$account$$,
  http$get$brokerage$$,
  http$get$portfolio$history,
  http$get$portfolio$$,
  http$get$position$$
} from "ctx-core/quovo/fetch";
import {delegate$cmd$map__assign,cmd$api} from "ctx-core/cmd/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "quovo_demo/cmd";
delegate$cmd$map__assign({
  dataExport$cmd: dataExport$cmd
});
export function *dataExport$cmd(ctx={}, ...ctx$rest$$) {
  const cmd$key = "dataExport$cmd";
  log(`${logPrefix}|${cmd$key}`);
  return yield cmd$api(...arguments, {
    cmd$key: cmd$key,
    cmd$api$whitelist: [
      "quovo$access_token",
      "quovo$user$id",
      "quovo$account$$",
      "quovo$brokerage$$",
      "quovo$portfolio$$ctx$$",
      "quovo$position$$",
      "quovo$user$$"
    ],
    cmd$api$required: [
    ],
    cmd$fn: cmd$fn
  });
  function cmd$fn() {
    log(`${logPrefix}|${cmd$key}|cmd$fn`);
    // map
    const ctxRequests = yield [
            http$get$account$$(ctx),
            http$get$brokerage$$(ctx),
            quovo$portfolio$$ctx$$(ctx),
            http$get$position$$(ctx),
            http$get$user$$(ctx)
          ];
    // reduce
    assign(ctx, ...ctxRequests);
    return assign__keys$public(ctx, {
      quovo$access_token: ctx.quovo$access_token,
      quovo$user$id: ctx.quovo$user$id,
      quovo$account$$: ctx.quovo$account$$,
      quovo$brokerage$$: ctx.quovo$brokerage$$,
      quovo$portfolio$$ctx$$: ctx.quovo$portfolio$$ctx$$,
      quovo$position$$: ctx.quovo$position$$,
      quovo$user$$: ctx.quovo$user$$
    });
  }
}
function *quovo$portfolio$$ctx$$(ctx) {
  log(`${logPrefix}|quovo$portfolio$$ctx$$`);
  yield http$get$portfolio$$(ctx);
  const quovo$portfolio$$ = ctx.quovo$portfolio$$
        // parallel
      , map$quovo$portfolio$$ctx$$ = yield quovo$portfolio$$.map(quovo$portfolio => {
          return http$get$portfolio$history({
            quovo$user$id: ctx.quovo$user$id,
            quovo$account$id: ctx.quovo$account$id,
            quovo$portfolio: quovo$portfolio,
            quovo$portfolio$id: quovo$portfolio.id
          });
        })
      , quovo$portfolio$$ctx$$ = map$quovo$portfolio$$ctx$$.map(
          quovo$portfolio$ctx => {
            return {
              quovo$portfolio: quovo$portfolio$ctx.quovo$portfolio,
              quovo$portfolio$id: quovo$portfolio$ctx.quovo$portfolio$id,
              quovo$portfolio$history: quovo$portfolio$ctx.quovo$portfolio$history
            };
          });
  return assign__keys$public(ctx, {
    quovo$portfolio$$ctx$$: quovo$portfolio$$ctx$$
  });
}