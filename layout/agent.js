/**
 * agents for html layout
 * @module ctx-core/layout/agent
 */
import {ensure__agent} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/layout/agent";
export function opened__sidebar__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|opened__sidebar__agent`);
  return ensure__agent(ctx, {
    key: "opened__sidebar__agent",
    scope: ["opened__sidebar"]
  }, ...agent$ctx$$);
}