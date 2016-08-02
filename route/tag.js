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
      , on$change__route$query = mount$ctx.on$change__route$query;
  agent__route$name(ctx);
  agent__route$query(ctx);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|mount__route|on$mount`);
    ctx.agent__route$query.on("change", on$change__route$query);
    if (on$change__route$name) ctx.agent__route$name.on("change", on$change__route$name);
    schedule__update__ctx(tag);
  }
  function on$unmount() {
    log(`${logPrefix}|mount__route|on$unmount`);
    ctx.agent__route$query.off("change", on$change__route$query);
    if (on$change__route$name) ctx.agent__route$name.off("change", on$change__route$name);
  }
  function on$change__route$name() {
    log(`${logPrefix}|mount__router|on$change__route$name`);
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