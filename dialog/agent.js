import {assign} from "ctx-core/object/lib";
import {assign__agent,assign__array$agent} from "ctx-core/agent/lib";
import {array$last} from "ctx-core/array/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/agent";
export function assign__dialog$$_agent() {
  log(`${logPrefix}|assign__dialog$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.dialog$$_agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__dialog$$_agent|init`);
    assign__array$agent(ctx, {
      key$agent: "dialog$$_agent",
      agent$keys: ["dialog$$"]
    });
  }
}
export function assign__dialog_agent() {
  log(`${logPrefix}|assign__dialog_agent`);
  let ctx = assign(...arguments)
    , dialog_agent = ctx.dialog_agent;
  if (!dialog_agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__dialog_agent|init`);
    assign__dialog$$_agent(ctx);
    assign__agent(ctx, {
      key$agent: "dialog_agent",
      agent$keys: ["dialog"]
    });
    dialog_agent = ctx.dialog_agent;
    assign(dialog_agent, {
      remove: remove
    });
    ctx.dialog$$_agent.on("change", dialog$$_agent$on$change);
  }
  function dialog$$_agent$on$change() {
    log(`${logPrefix}|assign__dialog_agent|dialog$$_agent$on$change`);
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