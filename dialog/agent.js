import {assign} from "ctx-core/object/lib";
import {assign__agent,assign__array$agent} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/agent";
export function assign__dialog$$_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__dialog$$_agent`);
  assign__array$agent(ctx, {
    key: "dialog$$_agent",
    scope: ["dialog$$"]
  }, ...Agent$ctx$$);
  return ctx;
}
export function assign__dialog_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__dialog_agent`);
  let dialog_agent;
  assign__dialog$$_agent(ctx);
  assign__agent(ctx, {
    key: "dialog_agent",
    scope: ["dialog"],
    init: init
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent$) {
    log(`${logPrefix}|assign__dialog_agent|init`);
    dialog_agent = agent$;
    assign(dialog_agent, {
      remove: remove
    });
    ctx.dialog$$_agent.on("change", dialog$$$on$change);
  }
  function dialog$$$on$change() {
    log(`${logPrefix}|assign__dialog_agent|dialog$$$on$change`);
    const dialog$$ = ctx.dialog$$;
    dialog_agent.set({
      dialog: dialog$$ && dialog$$[0]
    });
  }
  function remove() {
    log(`${logPrefix}|assign__dialog_agent|remove`);
    ctx.dialog$$_agent.remove({dialog$$: ctx.dialog});
  }
}