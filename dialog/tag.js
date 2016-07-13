import {assign__agent__dialog$$,assign__agent__dialog} from "ctx-core/dialog/agent";
import {route} from "ctx-core/route/lib";
import {assign__agent__route$fragment} from "ctx-core/route/agent";
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
    assign__agent__dialog$$(ctx);
    assign__agent__dialog(ctx);
    assign__agent__route$fragment(ctx);
    ctx.agent__route$fragment.on("change", agent__route$fragment$refresh);
    ctx.agent__dialog.on("change", dialog__on$change);
    agent__route$fragment$refresh();
  }
  function on$unmount() {
    log(`${logPrefix}|mount__dialog|on$unmount`);
    ctx.agent__route$fragment.off("change", agent__route$fragment$refresh);
    ctx.agent__dialog.off("change", dialog__on$change);
  }
  function agent__route$fragment$refresh() {
    log(`${logPrefix}|mount__dialog|agent__route$fragment$refresh`);
    reload_dialog();
    tag.ctx$update();
  }
  function dialog__on$change() {
    log(`${logPrefix}|mount__dialog|dialog__on$change`);
    if (!ctx.dialog) {
      route(ctx, ctx.route$path);
    }
  }
  function reload_dialog() {
    log(`${logPrefix}|mount__dialog|reload_dialog`);
    const route$query$map = ctx.route$query$map
        , route$dialog = route$query$map && route$query$map.dialog
        , route$dialog$map = ctx.route$dialog$map
        , dialog = route$dialog$map && route$dialog$map[route$dialog]
        , dialog$tag$name = dialog && dialog.tag$name
        , agent__dialog$$ = ctx.agent__dialog$$
        , ctx$dialog = ctx.dialog;
    if (ctx$dialog && (ctx$dialog.tag$name !== dialog$tag$name)) {
      agent__dialog$$.remove({dialog$$: ctx$dialog});
    }
    if (dialog && (dialog !== ctx$dialog)) {
      agent__dialog$$.push({
        dialog$$: dialog
      });
    }
    return ctx;
  }
}
export function dialog__assign__ctx$update__defer(tag) {
  log(`${logPrefix}|mount__dialog|dialog__assign__ctx$update__defer`);
  setTimeout(() => {
    tag.show = true;
    tag.ctx$update();
  }, 100); // TODO: Use events instead of hard-coded timeout
}