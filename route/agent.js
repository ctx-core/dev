import {assign} from "ctx-core/object/lib";
import {assign__agent} from "ctx-core/agent/lib";
import {assign__route$name_agent} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/agent";
export {assign__route$name_agent};
export function assign__route$fragment_agent() {
  log(`${logPrefix}|assign__route$fragment_agent`);
  let ctx = assign(...arguments);
  if (!ctx.route$fragment_agent) assign__route$fragment_agent$();
  return ctx;
  function assign__route$fragment_agent$() {
    log(`${logPrefix}|assign__route$fragment_agent$`);
    assign__agent(ctx, {
      key$agent: "route$fragment_agent",
      agent$keys: ["route$fragment"]
    });
  }
}
export function assign__route$query$map_agent() {
  log(`${logPrefix}|assign__route$query$map_agent`);
  let ctx = assign(...arguments);
  if (!ctx.route$query$map_agent) assign__route$query$map_agent$();
  return ctx;
  function assign__route$query$map_agent$() {
    log(`${logPrefix}|assign__route$query$map_agent$`);
    assign__agent(ctx, {
      key$agent: "route$query$map_agent",
      agent$keys: ["route$query$map"]
    });
  }
}