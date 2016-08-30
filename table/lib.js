import {assign,clone} from 'ctx-core/object/lib'
import {
  array$table,
  array$sort__fn,
  array$sort__binary$indexOf,
  new__array$sort__key} from 'ctx-core/array/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/table/lib'
export function new__ctx_row(ctx, ...ctx$rest$$) {
  const ctx$clone = clone(ctx, ...ctx$rest$$)
      , {
        row$source,
        ctx_columns} = ctx$clone
      , columns$reverse =
          ctx$clone.columns$reverse
          || (ctx_columns && ctx_columns.reverse())
      , row = columns$reverse && columns$reverse.reduce((memo, column) => {
          const cell$value = parseFloat(memo[column])
          memo[column] = isNaN(cell$value) ? null : cell$value
          return memo
        }, row$source)
      , {row_index} = ctx$clone
      , ctx_cells = ctx_columns && ctx_columns.map(
          ctx_column => {
            const {column,column$display} = ctx_column
                , cell$value = row[column]
            return {
              column,
              column$display,
              row,
              cell$value
            }})
      , table__column__ctx_cells = ctx_cells && array$table(ctx_cells, 'column')
  return {
    row,
    ctx_row_id: row_index,
    ctx_cells,
    table__column__ctx_cells
  }
}
// TODO: refactor
export function each__decorate__ctx_rows(ctx, ...decorate$ctx$$) {
  log(`${logPrefix}|each__decorate__ctx_rows`)
  const decorate$ctx = clone(...decorate$ctx$$)
      , {ctx_rows} = decorate$ctx
      , {columns} = ctx
      , table__column__ctx_rows = new__table__column__ctx_rows()
      , table__column__ctx_rows$sort__cell$value = new__table__column__ctx_rows$sort__cell$value()
      , array$sort = array$sort__fn()
  if (ctx_rows) {
    ctx_rows.forEach(
      ctx_row =>
        each__decorate__ctx_cells(ctx_row.ctx_cells))
  }
  function new__table__column__ctx_rows() {
    return columns && columns.reduce(
      (memo, column) => {
        memo[column] = ctx_rows.map(
          ctx_row =>
            ctx_row.table__column__ctx_cells[column])
        return memo }, {})
  }
  function new__table__column__ctx_rows$sort__cell$value() {
    return columns && columns.reduce(
      (memo, column) => {
        const table__column__ctx_cells = table__column__ctx_rows[column]
        memo[column] = table__column__ctx_cells
          .sort(new__array$sort__key('cell$value'))
        return memo }, {})
  }
  function each__decorate__ctx_cells(ctx_cells) {
    if (ctx_cells) {
      ctx_cells.forEach(
        ctx_cell => {
          const {column,cell$value} = ctx_cell
              , ctx_cells = table__column__ctx_rows$sort__cell$value[column]
              , cell$rank = get__cell$rank(ctx_cells, cell$value)
          assign(ctx_cell, {cell$rank})
        }
      )
    }
  }
  function get__cell$rank(ctx_cells, cell$value) {
    return ctx_cells.length - array$sort__binary$indexOf(
      ctx_cells,
      (ctx_cell_1, ctx_cell_1$index) => {
        const ctx_cell_1$cell_value = ctx_cell_1.cell$value
            , array$sort_1 = array$sort(cell$value, ctx_cell_1$cell_value)
        if (array$sort_1) {
          return array$sort_1
        } else {
          const ctx_cell_1$next = ctx_cells[ctx_cell_1$index + 1]
          if (!ctx_cell_1$next)
            return 0
          const ctx_cell_1$next$cell_value = ctx_cell_1$next.cell$value
          if (ctx_cell_1$cell_value != ctx_cell_1$next$cell_value)
            return 0
          return 1
        } })
  }
}
export function not_contains__ctx_rows$filter__ctx_row_id() {
  log(`${logPrefix}|not_contains__ctx_rows$filter__ctx_row_id`)
  const ctx = assign(...arguments)
      , {
        ctx_row_id,
        ctx_row,
        ctx_rows$filter} = ctx
      , ctx_rows$filter__find$ctx_row_id =
          ctx_rows$filter
          && ctx_rows$filter.find(
              ctx_row =>
                ctx_row.ctx_row_id == ctx_row_id)
  debug(`${logPrefix}|not_contains__ctx_rows$filter__ctx_row_id|1`, {ctx_row_id, ctx_row, ctx_rows$filter__find$ctx_row_id, "ctx_row_id != null": ctx_row_id != null, "ctx_row != null": ctx_row != null, "ctx_rows$filter__find$ctx_row_id == null": ctx_rows$filter__find$ctx_row_id == null})
  return
    ctx_row_id != null
    && ctx_row != null
    && ctx_rows$filter__find$ctx_row_id == null
}