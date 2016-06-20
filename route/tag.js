import {clone} from "ctx-core/object/lib";
import {assign__route$name_agent} from "ctx-core/route/lib";
import {assign__route$query$map_agent} from "ctx-core/route/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/tag";
export function route$name__tag$mount(tag, ...mount$ctx$$) {
  log(`${logPrefix}|route$name__tag$mount`);
  let ctx = tag.ctx;
  assign__route$name_agent(ctx);
  assign__route$query$map_agent(ctx);
  const mount$ctx = clone(...mount$ctx$$)
      , route$query$map$on$change = mount$ctx.route$query$map$on$change;
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|route$name__tag$mount|on$mount`);
    ctx.route$query$map_agent.on("change", route$query$map$on$change);
    if (route$name$on$change) ctx.route$name_agent.on("change", route$name$on$change);
    setTimeout(() => tag.assign__ctx$update(), 0);
  }
  function on$unmount() {
    log(`${logPrefix}|route$name__tag$mount|on$unmount`);
    ctx.route$query$map_agent.off("change", route$query$map$on$change);
    if (route$name$on$change) ctx.route$name_agent.off("change", route$name$on$change);
  }
  function route$name$on$change() {
    log(`${logPrefix}|router__tag$mount|route$name$on$change`);
    tag.assign__ctx$update();
  }
}
export function router__tag$mount(tag, ...mount$ctx$$) {
  log(`${logPrefix}|router__tag$mount`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , assign__routes$fn = mount$ctx.assign__routes$fn;
  route$name__tag$mount(tag, ...mount$ctx$$);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|on$mount`);
    if (assign__routes$fn) assign__routes$fn(ctx);
    riot.route.exec();
  }
  function on$unmount() {
    log(`${logPrefix}|router__tag$mount|on$unmount`);
    riot.route.stop();
  }
}