import {assign,clone} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/db3/tag";
export function refresh__d3__background$filter$highlight__chart(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|refresh__d3__background$filter$highlight__chart`);
  const background__ctx_row$$__d3__selection =
          refresh__d3__chart(ctx, ...ctx$rest$$, {attr$class: "background"})
      , filter__ctx_row$$__d3__selection =
          refresh__d3__chart(ctx, ...ctx$rest$$, {attr$class: "filter"})
      , highlight__ctx_row$$__d3__selection =
          refresh__d3__chart(ctx, ...ctx$rest$$, {attr$class: "highlight"});
  return assign(ctx, {
    background__ctx_row$$__d3__selection: background__ctx_row$$__d3__selection,
    filter__ctx_row$$__d3__selection: filter__ctx_row$$__d3__selection,
    highlight__ctx_row$$__d3__selection: highlight__ctx_row$$__d3__selection
  }, ...ctx$rest$$);
}
export function refresh__d3__chart(ctx, ...ctx$rest$$) {
  const ctx$clone = clone(...arguments)
      , d3__select = ctx$clone.d3__select || ctx$clone.d3__svg
      , attr$class = ctx$clone.attr$class;
  log(`${logPrefix}|refresh__d3__chart`, attr$class, d3__select);
  if (!d3__select) return;
  const ctx$d3__line = ctx.d3__line
      , ctx_row$$ = ctx.ctx_row$$;
  let d3__select$g = d3__select.select(`g.${attr$class}`);
  const isNew__d3__svg$g = d3__select$g.empty();
  if (isNew__d3__svg$g) {
    log(`${logPrefix}|refresh__d3__chart|isNew__d3__svg$g`, attr$class);
    d3__select$g = d3__select
      .append("g")
      .classed(attr$class, true);
    d3__select$g.selectAll("path").data(ctx_row$$)
      .enter()
        .append("path")
        .attr("data-ctx-row-id", ctx_row => ctx_row.ctx_row_id)
        .attr("data-ctx-row-name", ctx_row => ctx_row.name);
  }
  const d3__select$g$path = d3__select$g
          .selectAll("path")
          .attr("d", ctx_row => ctx$d3__line(ctx_row.ctx_cell$$));
  refresh__d3__filter__chart(ctx);
  refresh__d3__highlight__chart(ctx);
  return d3__select$g$path;
}
export function refresh__d3__filter__chart(ctx) {
  log(`${logPrefix}|refresh__d3__filter__chart`);
  const filter__ctx_row$$__d3__selection = ctx.filter__ctx_row$$__d3__selection
      , ctx_row$$filter$$map = ctx.ctx_row$$filter$$map;
  hide__d3__chart(filter__ctx_row$$__d3__selection, ctx_row$$filter$$map);
}
export function refresh__d3__highlight__chart(ctx) {
  log(`${logPrefix}|refresh__d3__highlight__chart`);
  const highlight__ctx_row$$__d3__selection = ctx.highlight__ctx_row$$__d3__selection
      , ctx_row$$filter$$highlight = ctx.ctx_row$$filter$$highlight;
  let ctx_row$map$index = {};
  if (ctx_row$$filter$$highlight) {
    const ctx_row_id = ctx_row$$filter$$highlight.ctx_row_id;
    ctx_row$map$index[ctx_row_id] = ctx_row$$filter$$highlight;
  }
  hide__d3__chart(highlight__ctx_row$$__d3__selection, ctx_row$map$index);
}
function hide__d3__chart(d3__select, ctx_row$$table={}) {
  log(`${logPrefix}|hide__d3__chart`);
  if (d3__select) {
    d3__select
      .classed(
        "hide",
        ctx_row => {
          return !ctx_row || !ctx_row$$table[ctx_row.ctx_row_id];
        })
  }
}