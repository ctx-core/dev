import {assign,clone} from "ctx-core/object/lib";
import {array$table,array$sort__fn,array$sort__binary$indexOf,array$sort__key__fn} from "ctx-core/array/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/table/lib";
export function new__ctx_row(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|new__ctx_row`);
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
      , ctx_cell$$map$column = ctx_cell$$ && array$table(ctx_cell$$, "column");
  return {
    row: row,
    ctx_row_id: row_index,
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
      , table__column__ctx_row$$ = new__table__column__ctx_row$$()
      , table__column__ctx_row$$sort__cell$value = new__table__column__ctx_row$$sort__cell$value()
      , array$sort = array$sort__fn();
  ctx_row$$forEach__fn(ctx_row$$);
  function new__table__column__ctx_row$$() {
    return column$$ && column$$.reduce(
      (memo, column) => {
        memo[column] = ctx_row$$.map(
          ctx_row =>
            ctx_row.ctx_cell$$map$column[column]);
        return memo; }, {})
  }
  function new__table__column__ctx_row$$sort__cell$value() {
    return column$$ && column$$.reduce(
      (memo, column) => {
        const ctx_cell$$map$column$$ = table__column__ctx_row$$[column];
        memo[column] = ctx_cell$$map$column$$
          .sort(array$sort__key__fn("cell$value"));
        return memo; }, {})
  }
  function ctx_row$$forEach__fn(ctx_row$$) {
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
              , ctx_cell$$ = table__column__ctx_row$$sort__cell$value[column]
              , cell$rank = ctx_cell$$rank(ctx_cell$$, cell$value);
          ctx_cell.cell$rank = cell$rank;
        }
      );
    }
  }
  function ctx_cell$$rank(ctx_cell$$, cell$value) {
    return ctx_cell$$.length - array$sort__binary$indexOf(
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
export function not_contains__ctx_row$$filter$$__ctx_row_id() {
  log(`${logPrefix}|not_contains__ctx_row$$filter$$__ctx_row_id`);
  const ctx = assign(...arguments)
      , ctx_row_id = ctx.ctx_row_id
      , ctx_row = ctx.ctx_row
      , ctx_row$$filter$$ = ctx.ctx_row$$filter$$
      , ctx_row$$filter$$find$ctx_row_id = ctx_row$$filter$$ &&
          ctx_row$$filter$$.find(
            ctx_row =>
              ctx_row.ctx_row_id == ctx_row_id);
  return ctx_row_id != null &&
    ctx_row != null &&
    ctx_row$$filter$$find$ctx_row_id == null;
}