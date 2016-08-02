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
      , on$change__columns = mount$ctx.on$change__columns
      , on$change__ctx_rows = mount$ctx.on$change__ctx_rows
      , on$change__ctx_row = mount$ctx.on$change__ctx_row
      , on$change__ctx_rows$filter = mount$ctx.on$change__ctx_rows$filter
      , on$change__ctx_row_id = mount$ctx.on$change__ctx_row_id
      , on$change__ctx_rows$filter$highlight = mount$ctx.on$change__ctx_rows$filter$highlight;
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
    if (on$change__columns) ctx.agent__columns.on("change", on$change__columns);
    if (on$change__ctx_row_id) ctx.agent__ctx_row_id.on("change", on$change__ctx_row_id);
    if (on$change__ctx_rows) ctx.agent__ctx_rows.on("change", on$change__ctx_rows);
    if (on$change__ctx_row) ctx.agent__ctx_row.on("change", on$change__ctx_row);
    if (on$change__ctx_rows$filter) ctx.agent__ctx_rows$filter.on("change", on$change__ctx_rows$filter);
    if (on$change__ctx_rows$filter$highlight) ctx.agent__ctx_rows$filter$highlight.on("change", on$change__ctx_rows$filter$highlight);
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`);
    if (on$change__columns) ctx.agent__columns.off("change", on$change__columns);
    if (on$change__ctx_rows$filter) ctx.agent__ctx_rows$filter.off("change", on$change__ctx_rows$filter);
    if (on$change__ctx_rows) ctx.agent__ctx_rows.off("change", on$change__ctx_rows);
    if (on$change__ctx_row) ctx.agent__ctx_row.off("change", on$change__ctx_row);
    if (on$change__ctx_row_id) ctx.agent__ctx_row_id.off("change", on$change__ctx_row_id);
    if (on$change__ctx_rows$filter$highlight) ctx.agent__ctx_rows$filter$highlight.off("change", on$change__ctx_rows$filter$highlight);
  }
}