import {clone} from "ctx-core/object/lib";
import {assign__agent__route$name} from "ctx-core/route/lib";
import {assign__agent__route$query$map} from "ctx-core/route/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/tag";
export function mount__route$name(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__route$name`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , route$query$map__on$change = mount$ctx.route$query$map__on$change;
  assign__agent__route$name(ctx);
  assign__agent__route$query$map(ctx);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|mount__route$name|on$mount`);
    ctx.agent__route$query$map.on("change", route$query$map__on$change);
    if (route$name__on$change) ctx.agent__route$name.on("change", route$name__on$change);
    setTimeout(() => tag.ctx$update(), 0);
  }
  function on$unmount() {
    log(`${logPrefix}|mount__route$name|on$unmount`);
    ctx.agent__route$query$map.off("change", route$query$map__on$change);
    if (route$name__on$change) ctx.agent__route$name.off("change", route$name__on$change);
  }
  function route$name__on$change() {
    log(`${logPrefix}|mount__router|route$name__on$change`);
    tag.ctx$update();
  }
}
export function mount__router(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__router`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , assign__routes__fn = mount$ctx.assign__routes__fn;
  mount__route$name(tag, ...mount$ctx$$);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|on$mount`);
    if (assign__routes__fn) assign__routes__fn(ctx);
    riot.route.exec();
  }
  function on$unmount() {
    log(`${logPrefix}|mount__router|on$unmount`);
    riot.route.stop();
  }
}