import {assign__agent} from "ctx-core/agent/lib";
import {assign__agent__route$name} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/agent";
export {assign__agent__route$name};
export function assign__agent__route$fragment(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__agent__route$fragment`);
  assign__agent(ctx, {
    key: "agent__route$fragment",
    scope: ["route$fragment"]
  }, ...Agent$ctx$$);
  return ctx;
}
export function assign__agent__route$query$map(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__agent__route$query$map`);
  assign__agent(ctx, {
    key: "agent__route$query$map",
    scope: ["route$query$map"]
  }, ...Agent$ctx$$);
  return ctx;
}