import {clone} from "ctx-core/object/lib";
import {
  ensure__agent__ctx_rows,
  ensure__agent__ctx_row,
  ensure__agent__columns,
  ensure__agent__ctx_rows$filter,
  ensure__agent__ctx_row_id,
  ensure__agent__ctx_rows$filter$highlight
} from "ctx-core/table/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "msci_demo/tag";
export function mount__table(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__msci_demo$table`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , columns__on$change = mount$ctx.columns__on$change
      , ctx_rows__on$change = mount$ctx.ctx_rows__on$change
      , ctx_row__on$change = mount$ctx.ctx_row__on$change
      , ctx_rows$filter__on$change = mount$ctx.ctx_rows$filter__on$change
      , ctx_row_id__on$change = mount$ctx.ctx_row_id__on$change
      , ctx_rows$filter$highlight__on$change = mount$ctx.ctx_rows$filter$highlight__on$change;
  ensure__agent__ctx_row_id(ctx);
  ensure__agent__ctx_rows(ctx);
  ensure__agent__ctx_row(ctx);
  ensure__agent__columns(ctx);
  ensure__agent__ctx_rows$filter(ctx);
  ensure__agent__ctx_rows$filter$highlight(ctx);
  tag.on("mount", on$mount);
  tag.on("unmount", on$unmount);
  return tag;
  function on$mount() {
    log(`${logPrefix}|on$mount`);
    if (columns__on$change) ctx.agent__columns.on("change", columns__on$change);
    if (ctx_row_id__on$change) ctx.agent__ctx_row_id.on("change", ctx_row_id__on$change);
    if (ctx_rows__on$change) ctx.agent__ctx_rows.on("change", ctx_rows__on$change);
    if (ctx_row__on$change) ctx.agent__ctx_row.on("change", ctx_row__on$change);
    if (ctx_rows$filter__on$change) ctx.agent__ctx_rows$filter.on("change", ctx_rows$filter__on$change);
    if (ctx_rows$filter$highlight__on$change) ctx.agent__ctx_rows$filter$highlight.on("change", ctx_rows$filter$highlight__on$change);
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`);
    if (columns__on$change) ctx.agent__columns.off("change", columns__on$change);
    if (ctx_rows$filter__on$change) ctx.agent__ctx_rows$filter.off("change", ctx_rows$filter__on$change);
    if (ctx_rows__on$change) ctx.agent__ctx_rows.off("change", ctx_rows__on$change);
    if (ctx_row__on$change) ctx.agent__ctx_row.off("change", ctx_row__on$change);
    if (ctx_row_id__on$change) ctx.agent__ctx_row_id.off("change", ctx_row_id__on$change);
    if (ctx_rows$filter$highlight__on$change) ctx.agent__ctx_rows$filter$highlight.off("change", ctx_rows$filter$highlight__on$change);
  }
}