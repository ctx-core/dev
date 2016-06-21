import {assign__agent} from "ctx-core/agent/lib";
import {assign__route$name_agent} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/agent";
export {assign__route$name_agent};
export function assign__route$fragment_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__route$fragment_agent`);
  assign__agent(ctx, {
    key: "route$fragment_agent",
    scope: ["route$fragment"]
  }, ...Agent$ctx$$);
  return ctx;
}
export function assign__route$query$map_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__route$query$map_agent`);
  assign__agent(ctx, {
    key: "route$query$map_agent",
    scope: ["route$query$map"]
  }, ...Agent$ctx$$);
  return ctx;
}