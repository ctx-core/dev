import {assign__agent} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/d3/agent";
export function assign__agent__d3__dimension$$(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__d3__dimension$$`);
  assign__agent(ctx, {
      scope: [
        "d3__margin",
        "d3__width",
        "d3__height",
        "d3__svg$content__paddingLeft",
        "d3__svg$content__width",
        "d3__svg$content__height"],
      key: "agent__d3__dimension$$"
    }, ...agent$ctx$$);
  return ctx;
}