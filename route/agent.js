import {ensure__agent} from "ctx-core/agent/lib";
import {agent__route$name} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/agent";
export {agent__route$name};
export function agent__route$fragment(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__route$fragment`);
  return ensure__agent(ctx, {
    key: "agent__route$fragment",
    scope: ["route$fragment"]
  }, ...agent$ctx$$);
}
export function agent__route$query(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__route$query`);
  return ensure__agent(ctx, {
    key: "agent__route$query",
    scope: ["route$query"]
  }, ...agent$ctx$$);
}