import {clone} from "ctx-core/object/lib";
import {ensure__agent__route$name} from "ctx-core/route/lib";
import {ensure__agent__route$query$table} from "ctx-core/route/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/route/tag";
export function mount__route$name(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__route$name`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , route$query$table__on$change = mount$ctx.route$query$table__on$change;
  ensure__agent__route$name(ctx);
  ensure__agent__route$query$table(ctx);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|mount__route$name|on$mount`);
    ctx.agent__route$query$table.on("change", route$query$table__on$change);
    if (route$name__on$change) ctx.agent__route$name.on("change", route$name__on$change);
    setTimeout(() => tag.update__ctx(), 0);
  }
  function on$unmount() {
    log(`${logPrefix}|mount__route$name|on$unmount`);
    ctx.agent__route$query$table.off("change", route$query$table__on$change);
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
  mount__route$name(tag, ...mount$ctx$$);
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