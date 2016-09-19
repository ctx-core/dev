import {assign,clone} from 'ctx-core/object/lib'
import {
  array$obj,
  sort$fn__array,
  rank__binarySort__array,
  new__key$sort__array} from 'ctx-core/array/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/table/lib'
export function new__row$ctx(ctx, ...ctx$rest$$) {
  const ctx$clone = clone(ctx, ...ctx$rest$$)
      , {
        row$source,
        row_index,
        column$ctx$$} = ctx$clone
      , row = row$source
      , cell$ctx$$ = column$ctx$$ && column$ctx$$.map(
          (column$ctx, column_index) => {
            const {column,column$display} = column$ctx
                , cell$value = row[column]
            return {
              index: [row_index, column_index],
              column,
              column$display,
              row,
              cell$value
            }})
      , table__column__cell$ctx$$ = cell$ctx$$ && array$obj(cell$ctx$$, 'column')
  return {
    row,
    row_id: row_index,
    cell$ctx$$,
    table__column__cell$ctx$$
  }
}
// TODO: refactor
export function each__decorate__row$ctx$$(ctx, ...decorate$ctx$$) {
  log(`${logPrefix}|each__decorate__row$ctx$$`)
  const decorate$ctx = clone(...decorate$ctx$$)
      , {row$ctx$$} = decorate$ctx
      , {columns} = ctx
      , table__column__row$ctx$$ = new__table__column__row$ctx$$()
      , table__column__row$ctx$$sort__cell$value = new__table__column__row$ctx$$sort__cell$value()
      , array$sort = sort$fn__array()
  if (row$ctx$$) {
    row$ctx$$.forEach(
      row$ctx =>
        each__decorate__cell$ctx$$(row$ctx.cell$ctx$$))
  }
  function new__table__column__row$ctx$$() {
    return columns && columns.reduce(
      (memo, column) => {
        memo[column] = row$ctx$$.map(
          row$ctx =>
            row$ctx.table__column__cell$ctx$$[column])
        return memo }, {})
  }
  function new__table__column__row$ctx$$sort__cell$value() {
    return columns && columns.reduce(
      (memo, column) => {
        const table__column__cell$ctx$$ = table__column__row$ctx$$[column]
        memo[column] = table__column__cell$ctx$$
          .sort(new__key$sort__array('cell$value'))
        return memo }, {})
  }
  function each__decorate__cell$ctx$$(cell$ctx$$) {
    if (cell$ctx$$) {
      cell$ctx$$.forEach(
        ctx_cell => {
          const {column,cell$value} = ctx_cell
              , cell$ctx$$ = table__column__row$ctx$$sort__cell$value[column]
              , cell$rank = get__cell$rank(cell$ctx$$, cell$value)
          assign(ctx_cell, {cell$rank})
        }
      )
    }
  }
  function get__cell$rank(cell$ctx$$, cell$value) {
    return cell$ctx$$.length - rank__binarySort__array(
      cell$ctx$$,
      (ctx_cell_1, ctx_cell_1$index) => {
        const ctx_cell_1$cell_value = ctx_cell_1.cell$value
            , array$sort_1 = array$sort(cell$value, ctx_cell_1$cell_value)
        if (array$sort_1) {
          return array$sort_1
        } else {
          const ctx_cell_1$next = cell$ctx$$[ctx_cell_1$index + 1]
          if (!ctx_cell_1$next)
            return 0
          const ctx_cell_1$next$cell_value = ctx_cell_1$next.cell$value
          if (ctx_cell_1$cell_value != ctx_cell_1$next$cell_value)
            return 0
          return 1
        } })
  }
}
export function not_contains__row$ctx$$__row_id$filter() {
  log(`${logPrefix}|not_contains__row$ctx$$__row_id$filter`)
  const ctx = assign(...arguments)
      , {
        row_id,
        row$ctx,
        row$ctx$$__filter} = ctx
      , row$ctx$$__filter__find$row_id =
          row$ctx$$__filter
          && row$ctx$$__filter.find(
              row$ctx =>
                row$ctx.row_id == row_id)
  return
    row_id != null
    && row$ctx != null
    && row$ctx$$__filter__find$row_id == null
}