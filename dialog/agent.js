import {assign} from "ctx-core/object/lib";
import {assign__agent,assign__array$agent} from "ctx-core/agent/lib";
import {array$last} from "ctx-core/array/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/agent";
export function assign__dialog$$_agent() {
  log(`${logPrefix}|assign__dialog$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.dialog$$_agent) assign__dialog$$_agent$();
  return ctx;
  function assign__dialog$$_agent$() {
    log(`${logPrefix}|assign__dialog$$_agent$`);
    assign__array$agent(ctx, {
      key$agent: "dialog$$_agent",
      agent$keys: ["dialog$$"]
    });
  }
}
export function assign__dialog_agent() {
  log(`${logPrefix}|assign__dialog_agent`);
  let ctx = assign(...arguments);
  if (!ctx.dialog_agent) assign__dialog_agent$();
  return ctx;
  function assign__dialog_agent$() {
    log(`${logPrefix}|assign__dialog_agent$`);
    assign__dialog$$_agent(ctx);
    assign__agent(ctx, {
      key$agent: "dialog_agent",
      agent$keys: ["dialog"]
    });
    ctx.dialog$$_agent.on("change", dialog$$_agent$on$change);
  }
  function dialog$$_agent$on$change() {
    log(`${logPrefix}|dialog$$_agent$on$change`);
    ctx.dialog_agent.set({
      dialog: array$last(ctx.dialog$$)
    });
  }
}