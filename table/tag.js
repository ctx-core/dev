import {clone} from "ctx-core/object/lib";
import {
  assign__agent__ctx_row$$,
  assign__agent__ctx_row,
  assign__agent__column$$,
  assign__agent__ctx_row$$filter$$,
  assign__agent__ctx_row_id,
  assign__agent__ctx_row$$filter$$highlight
} from "ctx-core/table/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "msci_demo/tag";
export function mount__table(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__msci_demo$table`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , column$$__on$change = mount$ctx.column$$__on$change
      , ctx_row$$__on$change = mount$ctx.ctx_row$$__on$change
      , ctx_row__on$change = mount$ctx.ctx_row__on$change
      , ctx_row$$filter$$__on$change = mount$ctx.ctx_row$$filter$$__on$change
      , ctx_row_id__on$change = mount$ctx.ctx_row_id__on$change
      , ctx_row$$filter$$highlight__on$change = mount$ctx.ctx_row$$filter$$highlight__on$change;
  assign__agent__ctx_row_id(ctx);
  assign__agent__ctx_row$$(ctx);
  assign__agent__ctx_row(ctx);
  assign__agent__column$$(ctx);
  assign__agent__ctx_row$$filter$$(ctx);
  assign__agent__ctx_row$$filter$$highlight(ctx);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|on$mount`);
    if (column$$__on$change) ctx.agent__column$$.on("change", column$$__on$change);
    if (ctx_row_id__on$change) ctx.agent__ctx_row_id.on("change", ctx_row_id__on$change);
    if (ctx_row$$__on$change) ctx.agent__ctx_row$$.on("change", ctx_row$$__on$change);
    if (ctx_row__on$change) ctx.agent__ctx_row.on("change", ctx_row__on$change);
    if (ctx_row$$filter$$__on$change) ctx.agent__ctx_row$$filter$$.on("change", ctx_row$$filter$$__on$change);
    if (ctx_row$$filter$$highlight__on$change) ctx.agent__ctx_row$$filter$$highlight.on("change", ctx_row$$filter$$highlight__on$change);
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`);
    if (column$$__on$change) ctx.agent__column$$.off("change", column$$__on$change);
    if (ctx_row$$filter$$__on$change) ctx.agent__ctx_row$$filter$$.off("change", ctx_row$$filter$$__on$change);
    if (ctx_row$$__on$change) ctx.agent__ctx_row$$.off("change", ctx_row$$__on$change);
    if (ctx_row__on$change) ctx.agent__ctx_row.off("change", ctx_row__on$change);
    if (ctx_row_id__on$change) ctx.agent__ctx_row_id.off("change", ctx_row_id__on$change);
    if (ctx_row$$filter$$highlight__on$change) ctx.agent__ctx_row$$filter$$highlight.off("change", ctx_row$$filter$$highlight__on$change);
  }
}