import {assign__agent__dialog$$,assign__agent__dialog} from "ctx-core/dialog/agent";
import {route} from "ctx-core/route/lib";
import {assign__agent__route$fragment} from "ctx-core/route/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/dialog/tag";
export function dialog__tag$mount(tag) {
  log(`${logPrefix}|dialog__tag$mount`);
  let ctx = tag.ctx;
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|dialog__tag$mount|on$mount`);
    assign__agent__dialog$$(ctx);
    assign__agent__dialog(ctx);
    assign__agent__route$fragment(ctx);
    ctx.agent__route$fragment.on("change", agent__route$fragment$refresh);
    ctx.agent__dialog.on("change", dialog__on$change);
    agent__route$fragment$refresh();
  }
  function on$unmount() {
    log(`${logPrefix}|dialog__tag$mount|on$unmount`);
    ctx.agent__route$fragment.off("change", agent__route$fragment$refresh);
    ctx.agent__dialog.off("change", dialog__on$change);
  }
  function agent__route$fragment$refresh() {
    log(`${logPrefix}|dialog__tag$mount|agent__route$fragment$refresh`);
    reload_dialog();
    tag.ctx$update();
  }
  function dialog__on$change() {
    log(`${logPrefix}|dialog__tag$mount|dialog__on$change`);
    if (!ctx.dialog) {
      route(ctx, ctx.route$path);
    }
  }
  function reload_dialog() {
    log(`${logPrefix}|dialog__tag$mount|reload_dialog`);
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
  log(`${logPrefix}|dialog__tag$mount|dialog__assign__ctx$update__defer`);
  setTimeout(() => {
    tag.show = true;
    tag.ctx$update();
  }, 100); // TODO: Use events instead of hard-coded timeout
}