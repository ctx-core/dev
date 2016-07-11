import {assign__agent} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/d3/agent";
export function assign__agent__d3$dimension$$(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__d3$dimension$$`);
  assign__agent(ctx, {
      scope: [
        "d3$margin",
        "d3$width",
        "d3$height",
        "d3$svg$content__paddingLeft",
        "d3$svg$content__width",
        "d3$svg$content__height"],
      key: "agent__d3$dimension$$"
    }, ...agent$ctx$$);
  return ctx;
}