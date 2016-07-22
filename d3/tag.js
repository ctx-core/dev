import {assign,clone} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/db3/tag";
export function refresh__d3__background$filter$highlight__chart(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|refresh__d3__background$filter$highlight__chart`);
  const d3__selection__background =
          refresh__d3__chart(ctx, ...ctx$rest$$, {attr$class: "background"})
      , d3__selection__filter =
          refresh__d3__chart(ctx, ...ctx$rest$$, {attr$class: "filter"})
      , d3__selection__highlight =
          refresh__d3__chart(ctx, ...ctx$rest$$, {attr$class: "highlight"});
  return assign(ctx, {
    d3__selection__background: d3__selection__background,
    d3__selection__filter: d3__selection__filter,
    d3__selection__highlight: d3__selection__highlight
  }, ...ctx$rest$$);
}
export function refresh__d3__chart(ctx, ...ctx$rest$$) {
  const ctx$clone = clone(...arguments)
      , d3__select = ctx$clone.d3__select || ctx$clone.d3__svg
      , attr$class = ctx$clone.attr$class;
  log(`${logPrefix}|refresh__d3__chart`, attr$class, d3__select);
  if (!d3__select) return;
  const ctx$d3__line = ctx.d3__line
      , ctx_rows = ctx.ctx_rows;
  let d3__select$g = d3__select.select(`g.${attr$class}`);
  const isNew__d3__svg$g = d3__select$g.empty();
  if (isNew__d3__svg$g) {
    log(`${logPrefix}|refresh__d3__chart|isNew__d3__svg$g`, attr$class);
    d3__select$g = d3__select
      .append("g")
      .classed(attr$class, true);
    d3__select$g.selectAll("path").data(ctx_rows)
      .enter()
        .append("path")
        .attr("data-ctx-row-id", ctx_row => ctx_row.ctx_row_id)
        .attr("data-ctx-row-name", ctx_row => ctx_row.name);
  }
  const d3__select$g$path = d3__select$g
          .selectAll("path")
          .attr("d", ctx_row => ctx$d3__line(ctx_row.ctx_cells));
  refresh__d3__filter__chart(ctx);
  refresh__d3__highlight__chart(ctx);
  return d3__select$g$path;
}
export function refresh__d3__filter__chart(ctx) {
  log(`${logPrefix}|refresh__d3__filter__chart`);
  const d3__selection__filter = ctx.d3__selection__filter
      , table__ctx_rows$filter = ctx.table__ctx_rows$filter;
  hide__d3__chart(d3__selection__filter, table__ctx_rows$filter);
}
export function refresh__d3__highlight__chart(ctx) {
  log(`${logPrefix}|refresh__d3__highlight__chart`);
  const d3__selection__highlight = ctx.d3__selection__highlight
      , ctx_rows$filter$highlight = ctx.ctx_rows$filter$highlight;
  let table__index__ctx_row = {};
  if (ctx_rows$filter$highlight) {
    const ctx_row_id = ctx_rows$filter$highlight.ctx_row_id;
    table__index__ctx_row[ctx_row_id] = ctx_rows$filter$highlight;
  }
  hide__d3__chart(d3__selection__highlight, table__index__ctx_row);
}
function hide__d3__chart(d3__select, table__ctx_row_id__ctx_row={}) {
  log(`${logPrefix}|hide__d3__chart`);
  if (d3__select) {
    d3__select
      .classed(
        "hide",
        ctx_row => {
          return !ctx_row || !table__ctx_row_id__ctx_row[ctx_row.ctx_row_id];
        })
  }
}