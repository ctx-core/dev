/**
 * Agent methods for dialogs.
 * @module ctx-core/dialog/agent
 */
import {clone,entries} from "ctx-core/object/lib";
import {
  clone__array$concat,
  array$compact,
  array$last} from "ctx-core/array/lib";
import {ensure__agent} from "ctx-core/agent/lib";
import {array__agent} from "ctx-core/agent/array";
import {layers__agent} from "ctx-core/layer/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/agent";
/**
 * An agent acting on an array in the ctx.
 * @typedef {module:ctx-core/agent/array~array__agent} dialogs__agent
 * @property {function} push - Push the scoped ctx dialog values to the ctx.
 * @example
 * let dialog = {tag$name: "ctx-dialog"};
 * dialog__agent.push({dialogs: dialog});
 * dialog__agent.remove({dialogs: dialog});
 */
/**
 * Ensures an agent that acts on an array of layers.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~agent$ctx} agent$ctx
 * @returns {module:ctx-core/dialog/agent~dialogs__agent}
 */
export function dialogs__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|dialogs__agent`);
  const agent$ctx = clone(...agent$ctx$$);
  layers__agent(ctx);
  return array__agent(ctx, {
    key: "dialogs__agent",
    scope: ["dialogs"],
    push: push,
    remove: remove,
    zIndex: zIndex,
    has__tag$name: has__tag$name,
    findBy__tag$name: findBy__tag$name
  }, agent$ctx);
  function push(...push$ctx$$) {
    log(`${logPrefix}|dialogs__agent|push`);
    const agent = this
        , scope$ = agent.scope$()
        , push$ctx = clone__array$concat(...push$ctx$$)
        , dialogs__push = push$ctx[scope$]
        , layers = dialogs__push.map(
            dialog => {
              dialog.layer = dialog.layer || {};
              return dialog.layer;
            });
    ctx.layers__agent.push({
      layers: layers
    });
    agent.push__array__agent(...push$ctx$$);
    return agent;
  }
  function remove(...remove$ctx$$) {
    log(`${logPrefix}|dialogs__agent|remove`);
    const agent = this
        , scope$ = agent.scope$()
        , remove$ctx$ = clone__array$concat(...remove$ctx$$)
        , remove__dialogs = array$compact((remove$ctx$[scope$] || []).map(
            dialog => {
              return typeof dialog === "string"
                ? agent.findBy__tag$name(dialog)
                : dialog;
            }
          ))
        , layers__remove = remove__dialogs.map(
            dialog =>
              dialog.layer);
    let remove$ctx = {};
    remove$ctx[scope$] = remove__dialogs;
    ctx.layers__agent.remove({
      layers: layers__remove
    });
    agent.remove__array__agent(remove$ctx);
    return agent;
  }
  function zIndex(tag$name) {
    log(`${logPrefix}|zIndex`);
    const agent = this
        , dialog = agent.findBy__tag$name(tag$name)
        , layer = dialog && dialog.layer;
    return (layer && layer.zIndex) || -1;
  }
  function has__tag$name(tag$name) {
    log(`${logPrefix}|dialogs__agent|has__tag$name`, tag$name);
    const agent = this;
    return !!(agent.findBy__tag$name(tag$name));
  }
  function findBy__tag$name(tag$name) {
    log(`${logPrefix}|dialogs__agent|findBy__tag$name`, tag$name);
    const agent = this;
    return agent.$().find(
      dialog =>
        dialog.tag$name === tag$name);
  }
}
/**
 * A representation of a dialog.
 * @typedef dialog
 * @property {module:ctx-core/layer/lib~layer} layer
 */
/**
 * The first dialog in ctx.dialogs
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~agent$ctx}
 * @returns {module:ctx-core/dialog/agent~dialog}
 */
export function dialog__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|dialog__agent`);
  dialogs__agent(ctx);
  return ensure__agent(ctx, {
    key: "dialog__agent",
    scope: ["dialog"],
    init: init,
    remove: remove
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|dialog__agent|init`);
    ctx.dialogs__agent.on("change", on$change__dialogs);
  }
  function on$change__dialogs() {
    log(`${logPrefix}|dialog__agent|on$change__dialogs`);
    const agent = this
        , dialogs = ctx.dialogs
        , dialog = array$last(dialogs);
    if (agent.$() !== dialog) {
      agent.set({
        dialog: dialog
      });
    }
  }
  function remove() {
    log(`${logPrefix}|dialog__agent|remove`);
    ctx.dialogs__agent.remove({
      dialogs: ctx.dialog
    });
  }
}