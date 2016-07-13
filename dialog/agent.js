import {assign} from "ctx-core/object/lib";
import {assign__agent,assign__agent__array} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/agent";
export function assign__agent__dialog$$(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__dialog$$`);
  assign__agent__array(ctx, {
    key: "agent__dialog$$",
    scope: ["dialog$$"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__dialog(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__dialog`);
  let agent__dialog;
  assign__agent__dialog$$(ctx);
  assign__agent(ctx, {
    key: "agent__dialog",
    scope: ["dialog"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__dialog|init`);
    agent__dialog = agent;
    assign(agent__dialog, {
      remove: remove
    });
    ctx.agent__dialog$$.on("change", dialog$$__on$change);
  }
  function dialog$$__on$change() {
    log(`${logPrefix}|assign__agent__dialog|dialog$$__on$change`);
    const dialog$$ = ctx.dialog$$;
    agent__dialog.set({
      dialog: dialog$$ && dialog$$[0]
    });
  }
  function remove() {
    log(`${logPrefix}|assign__agent__dialog|remove`);
    ctx.agent__dialog$$.remove({dialog$$: ctx.dialog});
  }
}