import {assign,clone} from "ctx-core/object/lib";
import riot from "riot";
import {fn$url$anchor} from "ctx-core/dom/lib";
import {agent$$trigger$change} from "ctx-core/agent/lib";
import {log,error,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dom/riot";
export function riot$route$url$anchor(route$fn) {
  log(`${logPrefix}|riot$route$url$anchor`);
  const route = riot.route.create();
  route("*", anchor => {
    try {
      log(`${logPrefix}|riot$route$url$anchor|route|*`, anchor);
      if (route$fn) fn$url$anchor__route$fn$(route$fn);
    } catch (e) {
      error(e);
      throw e;
    }
  });
  return route;
}
export function fn$url$anchor__route$fn$(route$fn) {
  log(`${logPrefix}|fn$url$anchor__route$fn`);
  route$fn(fn$url$anchor());
}
export function route$url$anchor$fn(tag) {
  log(`${logPrefix}|route$url$anchor$fn`);
  return (anchor$ctx) => {
    log(`${logPrefix}|route$url$anchor$fn|fn`, tag.ctx, anchor$ctx);
    agent$$trigger$change(tag.ctx, anchor$ctx);
  }
}