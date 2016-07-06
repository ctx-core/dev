import {clone} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/authentication/tag";
export function authentication__tag$mount(tag, ...opts$ctx$$) {
  log(`${logPrefix}|authentication__tag$mount`);
  let ctx = tag.ctx;
  const opts$ctx = clone(...opts$ctx$$)
      , agent__authentication = opts$ctx.agent__authentication;
  if (!agent__authentication) throw__error(ctx, "Missing opts$ctx.agent__authentication");
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|on$mount`);
    agent__authentication.on("change", authentication__on$change);
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`);
    agent__authentication.off("change", authentication__on$change);
  }
  function authentication__on$change() {
    log(`${logPrefix}|authentication__on$change`);
    tag.ctx$update();
  }
}