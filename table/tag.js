import {clone} from "ctx-core/object/lib";
import {
  agent__ctx_rows,
  agent__ctx_row,
  agent__columns,
  agent__ctx_rows$filter,
  agent__ctx_row_id,
  agent__ctx_rows$filter$highlight
} from "ctx-core/table/agent";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "msci_demo/tag";
export function mount__table(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__table`);
  let ctx = tag.ctx;
  const mount$ctx = clone(...mount$ctx$$)
      , columns__on$change = mount$ctx.columns__on$change
      , ctx_rows__on$change = mount$ctx.ctx_rows__on$change
      , ctx_row__on$change = mount$ctx.ctx_row__on$change
      , ctx_rows$filter__on$change = mount$ctx.ctx_rows$filter__on$change
      , ctx_row_id__on$change = mount$ctx.ctx_row_id__on$change
      , ctx_rows$filter$highlight__on$change = mount$ctx.ctx_rows$filter$highlight__on$change;
  agent__ctx_row_id(ctx);
  agent__ctx_rows(ctx);
  agent__ctx_row(ctx);
  agent__columns(ctx);
  agent__ctx_rows$filter(ctx);
  agent__ctx_rows$filter$highlight(ctx);
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