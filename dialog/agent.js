import {assign} from "ctx-core/object/lib";
import {
  ensure__agent,
  change__agents} from "ctx-core/agent/lib";
import {agent__array} from "ctx-core/agent/array";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/agent";
export function agent__dialogs(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__dialogs`);
  return agent__array(ctx, {
    key: "agent__dialogs",
    scope: ["dialogs"]
  }, ...agent$ctx$$);
}
export function agent__dialog(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__dialog`);
  let agent;
  agent__dialogs(ctx);
  return ensure__agent(ctx, {
    key: "agent__dialog",
    scope: ["dialog"],
    init: init
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__dialog|init`);
    agent = this;
    assign(agent, {
      remove: remove
    });
    ctx.agent__dialogs.on("change", on$change__dialogs);
  }
  function on$change__dialogs() {
    log(`${logPrefix}|agent__dialog|on$change__dialogs`);
    const dialogs = ctx.dialogs;
    change__agents(ctx, {
      dialog: dialogs && dialogs[0]
    });
  }
  function remove() {
    log(`${logPrefix}|agent__dialog|remove`);
    ctx.agent__dialogs.remove({dialogs: ctx.dialog});
  }
}