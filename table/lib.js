import {assign,clone} from "ctx-core/object/lib";
import {array$table,array$sort__fn,array$sort__binary$indexOf,new__array$sort__key} from "ctx-core/array/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/table/lib";
export function new__ctx_row(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|new__ctx_row`);
  const ctx$clone = clone(ctx, ...ctx$rest$$)
      , row$source = ctx$clone.row$source
      , ctx_columns = ctx$clone.ctx_columns
      , columns$reverse = ctx$clone.columns$reverse || (ctx_columns && ctx_columns.reverse())
      , row = columns$reverse && columns$reverse.reduce((memo, column) => {
          const cell$value = parseFloat(memo[column]);
          memo[column] = isNaN(cell$value) ? null : cell$value;
          return memo;
        }, row$source)
      , row_index = ctx$clone.row_index
      , ctx_cells = ctx_columns && ctx_columns.map(
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
      , table__column__ctx_cells = ctx_cells && array$table(ctx_cells, "column");
  return {
    row: row,
    ctx_row_id: row_index,
    ctx_cells: ctx_cells,
    table__column__ctx_cells: table__column__ctx_cells
  };
}
// TODO: refactor
export function assign__ctx_cells$cell_rank() {
  log(`${logPrefix}|assign__ctx_cells$cell_rank`);
  const ctx = assign(...arguments)
      , ctx_rows = ctx.ctx_rows
      , columns = ctx.columns
      , table__column__ctx_rows = new__table__column__ctx_rows()
      , table__column__ctx_rows$sort__cell$value = new__table__column__ctx_rows$sort__cell$value()
      , array$sort = array$sort__fn();
  forEach__ctx_rows(ctx_rows);
  function new__table__column__ctx_rows() {
    return columns && columns.reduce(
      (memo, column) => {
        memo[column] = ctx_rows.map(
          ctx_row =>
            ctx_row.table__column__ctx_cells[column]);
        return memo; }, {})
  }
  function new__table__column__ctx_rows$sort__cell$value() {
    return columns && columns.reduce(
      (memo, column) => {
        const table__column__ctx_cells = table__column__ctx_rows[column];
        memo[column] = table__column__ctx_cells
          .sort(new__array$sort__key("cell$value"));
        return memo; }, {})
  }
  function forEach__ctx_rows(ctx_rows) {
    if (ctx_rows) {
      ctx_rows.forEach(
        ctx_row =>
          forEach__ctx_cells(ctx_row.ctx_cells));
    }
  }
  function forEach__ctx_cells(ctx_cells) {
    if (ctx_cells) {
      ctx_cells.forEach(
        ctx_cell => {
          const column = ctx_cell.column
              , cell$value = ctx_cell.cell$value
              , ctx_cells = table__column__ctx_rows$sort__cell$value[column]
              , cell$rank = ctx_cellsrank(ctx_cells, cell$value);
          ctx_cell.cell$rank = cell$rank;
        }
      );
    }
  }
  function ctx_cellsrank(ctx_cells, cell$value) {
    return ctx_cells.length - array$sort__binary$indexOf(
      ctx_cells,
      (ctx_cell_1, ctx_cell_1$index) => {
        const ctx_cell_1$cell_value = ctx_cell_1.cell$value
            , array$sort_1 = array$sort(cell$value, ctx_cell_1$cell_value);
        if (array$sort_1) {
          return array$sort_1;
        } else {
          const ctx_cell_1$next = ctx_cells[ctx_cell_1$index + 1];
          if (!ctx_cell_1$next)
            return 0;
          const ctx_cell_1$next$cell_value = ctx_cell_1$next.cell$value;
          if (ctx_cell_1$cell_value != ctx_cell_1$next$cell_value)
            return 0;
          return 1;
        } })
  }
}
export function not_contains__ctx_rows$filter__ctx_row_id() {
  log(`${logPrefix}|not_contains__ctx_rows$filter__ctx_row_id`);
  const ctx = assign(...arguments)
      , ctx_row_id = ctx.ctx_row_id
      , ctx_row = ctx.ctx_row
      , ctx_rows$filter = ctx.ctx_rows$filter
      , ctx_rows$filterfind$ctx_row_id = ctx_rows$filter &&
          ctx_rows$filter.find(
            ctx_row =>
              ctx_row.ctx_row_id == ctx_row_id);
  return ctx_row_id != null &&
    ctx_row != null &&
    ctx_rows$filterfind$ctx_row_id == null;
}