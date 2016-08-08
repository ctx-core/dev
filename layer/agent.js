/**
 * Agent methods for layers.
 * @module ctx-core/layer/agent
 */
import {clone} from "ctx-core/object/lib";
import {
  clone__array$concat,
  array$last} from "ctx-core/array/lib";
import {array__agent} from "ctx-core/agent/array";
import {throw__invalid_state} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/layer/agent";
export function layers__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|layers__agent`);
  const agent$ctx = clone(...agent$ctx$$);
  return array__agent(ctx, {
    key: "layers__agent",
    scope: ["layers"],
    zIndex__base: agent$ctx.zIndex__base || 0,
    load: load,
    push: push,
    top: top,
    zIndex__top: zIndex__top,
  }, ...agent$ctx$$);
  function load() {
    log(`${logPrefix}|layers__agent|load`);
    const agent = this;
    if (agent.scope.every(scope$ => ctx[scope$])) return;
    log(`${logPrefix}|layers__agent|load|load__array`);
    agent.load__array(...arguments);
  }
  function push(...push$ctx$$) {
    log(`${logPrefix}|layers__agent|push`);
    const agent = this
        , push$ctx = clone__array$concat(...push$ctx$$);
    let table__zIndex__top = {};
    agent.scope.forEach(
      scope$ => {
        (push$ctx[scope$] || []).forEach(
          layer => {
            const layer$zIndex = layer.zIndex
                , zIndex__top = isNaN(table__zIndex__top[scope$])
                    ? agent.zIndex__top(scope$)
                      : table__zIndex__top[scope$];
            if (isNaN(layer$zIndex)) {
              layer.zIndex = isNaN(zIndex__top) ?
                agent.zIndex__base :
                zIndex__top + 1;
            } else {
              if (zIndex__top != null && layer$zIndex <= zIndex__top) {
                throw__invalid_state(ctx, {
                  key: scope$,
                  reason: `zIndex must be greater than ctx.${agent.key}.zIndex__top("${scope$}")`
                });
              }
            }
            table__zIndex__top[scope$] = layer.zIndex;
          })});
    agent.push__array__agent(push$ctx);
    return agent;
  }
  function top(key) {
    log(`${logPrefix}|layers__agent|top`);
    const agent = this;
    key = key || agent.scope$();
    const layers = ctx[key];
    return array$last(layers);
  }
  function zIndex__top() {
    log(`${logPrefix}|layers__agent|zIndex__top`);
    const agent = this
        , top = agent.top(...arguments);
    return top && top.zIndex;
  }
}