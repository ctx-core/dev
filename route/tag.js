import {clone} from "ctx-core/object/lib";
import {assign__agent__route$name} from "ctx-core/route/lib";
import {assign__agent__route$query$map} from "ctx-core/route/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/tag";
export function route$name__tag$mount(tag, ...mount$ctx$$) {
  log(`${logPrefix}|route$name__tag$mount`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , route$query$map__on$change = mount$ctx.route$query$map__on$change;
  assign__agent__route$name(ctx);
  assign__agent__route$query$map(ctx);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|route$name__tag$mount|on$mount`);
    ctx.agent__route$query$map.on("change", route$query$map__on$change);
    if (route$name__on$change) ctx.agent__route$name.on("change", route$name__on$change);
    setTimeout(() => tag.ctx$update(), 0);
  }
  function on$unmount() {
    log(`${logPrefix}|route$name__tag$mount|on$unmount`);
    ctx.agent__route$query$map.off("change", route$query$map__on$change);
    if (route$name__on$change) ctx.agent__route$name.off("change", route$name__on$change);
  }
  function route$name__on$change() {
    log(`${logPrefix}|router__tag$mount|route$name__on$change`);
    tag.ctx$update();
  }
}
export function router__tag$mount(tag, ...mount$ctx$$) {
  log(`${logPrefix}|router__tag$mount`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , assign__routes__fn = mount$ctx.assign__routes__fn;
  route$name__tag$mount(tag, ...mount$ctx$$);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|on$mount`);
    if (assign__routes__fn) assign__routes__fn(ctx);
    riot.route.exec();
  }
  function on$unmount() {
    log(`${logPrefix}|router__tag$mount|on$unmount`);
    riot.route.stop();
  }
}