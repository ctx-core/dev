import {ensure__agent__dialogs,ensure__agent__dialog} from "ctx-core/dialog/agent";
import {route} from "ctx-core/route/lib";
import {ensure__agent__route$fragment} from "ctx-core/route/agent";
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
    ensure__agent__dialogs(ctx);
    ensure__agent__dialog(ctx);
    ensure__agent__route$fragment(ctx);
    ctx.agent__route$fragment.on("change", refresh__agent__route$fragment);
    ctx.agent__dialog.on("change", dialog__on$change);
    refresh__agent__route$fragment();
  }
  function on$unmount() {
    log(`${logPrefix}|mount__dialog|on$unmount`);
    ctx.agent__route$fragment.off("change", refresh__agent__route$fragment);
    ctx.agent__dialog.off("change", dialog__on$change);
  }
  function refresh__agent__route$fragment() {
    log(`${logPrefix}|mount__dialog|refresh__agent__route$fragment`);
    reload_dialog();
    tag.update__ctx();
  }
  function dialog__on$change() {
    log(`${logPrefix}|mount__dialog|dialog__on$change`);
    if (!ctx.dialog) {
      route(ctx, ctx.route$path);
    }
  }
  function reload_dialog() {
    log(`${logPrefix}|mount__dialog|reload_dialog`);
    const route$query$table = ctx.route$query$table
        , route$dialog = route$query$table && route$query$table.dialog
        , route$dialog$table = ctx.route$dialog$table
        , dialog = route$dialog$table && route$dialog$table[route$dialog]
        , dialog$tag$name = dialog && dialog.tag$name
        , agent__dialogs = ctx.agent__dialogs
        , ctx$dialog = ctx.dialog;
    if (ctx$dialog && (ctx$dialog.tag$name !== dialog$tag$name)) {
      agent__dialogs.remove({dialog$$: ctx$dialog});
    }
    if (dialog && (dialog !== ctx$dialog)) {
      agent__dialogs.push({
        dialog$$: dialog
      });
    }
    return ctx;
  }
}
export function defer__assign__dialog__update__ctx(tag) {
  log(`${logPrefix}|mount__dialog|defer__assign__dialog__update__ctx`);
  setTimeout(() => {
    tag.show = true;
    tag.update__ctx();
  }, 100); // TODO: Use events instead of hard-coded timeout
}