import {clone} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/authentication/tag";
export function authentication__tag$mount(tag, ...opts$ctx$$) {
  log(`${logPrefix}|authentication__tag$mount`);
  let ctx = tag.ctx;
  const opts$ctx = clone(...opts$ctx$$)
      , authentication_agent = opts$ctx.authentication_agent;
  if (!authentication_agent) error$throw(ctx, "Missing opts$ctx.authentication_agent");
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|on$mount`);
    authentication_agent.on("change", authentication$on$change);
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`);
    authentication_agent.off("change", authentication$on$change);
  }
  function authentication$on$change() {
    log(`${logPrefix}|authentication$on$change`);
    tag.ctx$update();
  }
}