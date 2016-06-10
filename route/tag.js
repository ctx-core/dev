import {clone} from "ctx-core/object/lib";
import {assign__route$name_agent} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/tag";
export function tag$mount__route(tag, ...mount$ctx$$) {
  log(`${logPrefix}|tag$mount__route`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , assign__routes$fn = mount$ctx.assign__routes$fn;
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|tag$mount__route|on$mount`);
    assign__route$name_agent(ctx);
    if (assign__routes$fn) assign__routes$fn(ctx);
    ctx.route$name_agent.on("change", route$name_agent$on$change);
    riot.route.exec();
    tag.assign__ctx$update();
  }
  function on$unmount() {
    log(`${logPrefix}|tag$mount__route|on$unmount`);
    ctx.route$name_agent.off("change", route$name_agent$on$change);
    riot.route.stop();
  }
  function route$name_agent$on$change() {
    log(`${logPrefix}|route$name_agent$on$change`);
    tag.assign__ctx$update();
  }
}