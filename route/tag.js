import {clone} from "ctx-core/object/lib";
import {assign__route$name_agent} from "ctx-core/route/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/tag";
export function route__tag$mount(tag, ...mount$ctx$$) {
  log(`${logPrefix}|route__tag$mount`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , assign__route$$fn = mount$ctx.assign__route$$fn;
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|route__tag$mount|on$mount`);
    assign__route$name_agent(ctx);
    if (assign__route$$fn) assign__route$$fn(ctx);
    ctx.route$name_agent.on("change", route$name_agent$on$change);
    riot.route.exec();
    tag.assign__ctx$update();
  }
  function on$unmount() {
    log(`${logPrefix}|route__tag$mount|on$unmount`);
    ctx.route$name_agent.off("change", route$name_agent$on$change);
    riot.route.stop();
  }
  function route$name_agent$on$change() {
    log(`${logPrefix}|route$name_agent$on$change`);
    tag.assign__ctx$update();
  }
}