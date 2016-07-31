import {clone} from "ctx-core/object/lib";
import {schedule__update__ctx} from "ctx-core/tag/lib";
import {agent__route$name} from "ctx-core/route/lib";
import {agent__route$query} from "ctx-core/route/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/tag";
export function mount__route(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__route`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , route$query__on$change = mount$ctx.route$query__on$change;
  agent__route$name(ctx);
  agent__route$query(ctx);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|mount__route|on$mount`);
    ctx.agent__route$query.on("change", route$query__on$change);
    if (route$name__on$change) ctx.agent__route$name.on("change", route$name__on$change);
    schedule__update__ctx(tag);
  }
  function on$unmount() {
    log(`${logPrefix}|mount__route|on$unmount`);
    ctx.agent__route$query.off("change", route$query__on$change);
    if (route$name__on$change) ctx.agent__route$name.off("change", route$name__on$change);
  }
  function route$name__on$change() {
    log(`${logPrefix}|mount__router|route$name__on$change`);
    tag.update__ctx();
  }
}
export function mount__router(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__router`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , assign__routes = mount$ctx.assign__routes;
  mount__route(tag, ...mount$ctx$$);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|on$mount`);
    if (assign__routes) assign__routes(ctx);
    riot.route.exec();
  }
  function on$unmount() {
    log(`${logPrefix}|mount__router|on$unmount`);
    riot.route.stop();
  }
}