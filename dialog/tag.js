import {agent__dialogs,agent__dialog} from "ctx-core/dialog/agent";
import {route} from "ctx-core/route/lib";
import {agent__route$fragment} from "ctx-core/route/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/tag";
export function mount__dialog(tag) {
  log(`${logPrefix}|mount__dialog`);
  let ctx = tag.ctx;
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|mount__dialog|on$mount`);
    agent__dialogs(ctx);
    agent__dialog(ctx);
    agent__route$fragment(ctx);
    ctx.agent__route$fragment.on("change", refresh__agent__route$fragment);
    ctx.agent__dialog.on("change", on$change__dialog);
    refresh__agent__route$fragment();
  }
  function on$unmount() {
    log(`${logPrefix}|mount__dialog|on$unmount`);
    ctx.agent__route$fragment.off("change", refresh__agent__route$fragment);
    ctx.agent__dialog.off("change", on$change__dialog);
  }
  function refresh__agent__route$fragment() {
    log(`${logPrefix}|mount__dialog|refresh__agent__route$fragment`);
    reload__dialog();
  }
  function on$change__dialog() {
    log(`${logPrefix}|mount__dialog|on$change__dialog`);
    if (!ctx.dialog) {
      route(ctx, ctx.route$path);
    }
    debug(`${logPrefix}|mount__dialog|on$change__dialog|1`);
    tag.update__ctx();
  }
  function reload__dialog() {
    log(`${logPrefix}|mount__dialog|reload__dialog`);
    const route$query = ctx.route$query
        , route$dialog = route$query && route$query.dialog
        , table__route$dialog = ctx.table__route$dialog
        , dialog = table__route$dialog && table__route$dialog[route$dialog]
        , dialog$tag$name = dialog && dialog.tag$name
        , agent__dialogs = ctx.agent__dialogs
        , ctx$dialog = ctx.dialog;
    if (ctx$dialog && (ctx$dialog.tag$name !== dialog$tag$name)) {
      agent__dialogs.remove({dialogs: ctx$dialog});
    }
    if (dialog && (dialog !== ctx$dialog)) {
      agent__dialogs.push({
        dialogs: dialog
      });
    }
    return ctx;
  }
}