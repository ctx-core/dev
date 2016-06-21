import {assign,clone} from "ctx-core/object/lib";
import {array$map,array$sort$$fn,array$sort$$binary$indexOf,array$sort$$key$$fn} from "ctx-core/array/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/table/lib";
export function fn$ctx_row(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|fn$ctx_row`);
  const ctx$clone = clone(ctx, ...ctx$rest$$)
      , row$source = ctx$clone.row$source
      , ctx_column$$ = ctx$clone.ctx_column$$
      , column$$reverse$$ = ctx$clone.column$$reverse$$ || (ctx_column$$ && ctx_column$$.reverse())
      , row = column$$reverse$$ && column$$reverse$$.reduce((memo, column) => {
          const cell$value = parseFloat(memo[column]);
          memo[column] = isNaN(cell$value) ? null : cell$value;
          return memo;
        }, row$source)
      , row_index = ctx$clone.row_index
      , ctx_cell$$ = ctx_column$$ && ctx_column$$.map(
          ctx_column => {
            const column = ctx_column.column
                , cell$value = row[column]
                , column$display = ctx_column.column$display;
            return {
              column: column,
              column$display: column$display,
              row: row,
              cell$value: cell$value
            };})
      , ctx_cell$$map$column = ctx_cell$$ && array$map(ctx_cell$$, "column");
  return {
    row: row,
    ctx_row_index: row_index,
    ctx_cell$$: ctx_cell$$,
    ctx_cell$$map$column: ctx_cell$$map$column
  };
}
// TODO: refactor
export function assign__ctx_cell$$cell_rank() {
  log(`${logPrefix}|assign__ctx_cell$$cell_rank`);
  const ctx = assign(...arguments)
      , ctx_row$$ = ctx.ctx_row$$
      , column$$ = ctx.column$$
      , ctx_cell$$map$column$$__ctx_row$$map$column = fn__ctx_cell$$map$column$$__ctx_row$$map$column()
      , ctx_cell$$__ctx_row$$sort$$map$column = fn$ctx_cell$$__ctx_row$$sort$$map$column()
      , array$sort = array$sort$$fn();
  ctx_row$$forEach$fn(ctx_row$$);
  function fn__ctx_cell$$map$column$$__ctx_row$$map$column() {
    return column$$ && column$$.reduce(
      (memo, column) => {
        memo[column] = ctx_row$$.map(
          ctx_row =>
            ctx_row.ctx_cell$$map$column[column]);
        return memo; }, {})
  }
  function fn$ctx_cell$$__ctx_row$$sort$$map$column() {
    return column$$ && column$$.reduce(
      (memo, column) => {
        const ctx_cell$$map$column$$ = ctx_cell$$map$column$$__ctx_row$$map$column[column];
        memo[column] = ctx_cell$$map$column$$
          .sort(array$sort$$key$$fn("cell$value"));
        return memo; }, {})
  }
  function ctx_row$$forEach$fn(ctx_row$$) {
    if (ctx_row$$) {
      ctx_row$$.forEach(
        ctx_row =>
          ctx_cell$$forEach(ctx_row.ctx_cell$$));
    }
  }
  function ctx_cell$$forEach(ctx_cell$$) {
    if (ctx_cell$$) {
      ctx_cell$$.forEach(
        ctx_cell => {
          const column = ctx_cell.column
              , cell$value = ctx_cell.cell$value
              , ctx_cell$$ = ctx_cell$$__ctx_row$$sort$$map$column[column]
              , cell$rank = ctx_cell$$rank(ctx_cell$$, cell$value);
          ctx_cell.cell$rank = cell$rank;
        }
      );
    }
  }
  function ctx_cell$$rank(ctx_cell$$, cell$value) {
    return ctx_cell$$.length - array$sort$$binary$indexOf(
      ctx_cell$$,
      (ctx_cell_1, ctx_cell_1$index) => {
        const ctx_cell_1$cell_value = ctx_cell_1.cell$value
            , array$sort_1 = array$sort(cell$value, ctx_cell_1$cell_value);
        if (array$sort_1) {
          return array$sort_1;
        } else {
          const ctx_cell_1$next = ctx_cell$$[ctx_cell_1$index + 1];
          if (!ctx_cell_1$next)
            return 0;
          const ctx_cell_1$next$cell_value = ctx_cell_1$next.cell$value;
          if (ctx_cell_1$cell_value != ctx_cell_1$next$cell_value)
            return 0;
          return 1;
        } })
  }
}
export function ctx_row$$filter$$not_contains$ctx_row_index() {
  log(`${logPrefix}|ctx_row$$filter$$not_contains$ctx_row_index`);
  const ctx = assign(...arguments)
      , ctx_row_index = ctx.ctx_row_index
      , ctx_row = ctx.ctx_row
      , ctx_row$$filter$$ = ctx.ctx_row$$filter$$
      , ctx_row$$filter$$find$ctx_row_index = ctx_row$$filter$$ &&
          ctx_row$$filter$$.find(
            ctx_row =>
              ctx_row.ctx_row_index == ctx_row_index);
  return ctx_row_index != null &&
    ctx_row != null &&
    ctx_row$$filter$$find$ctx_row_index == null;
}