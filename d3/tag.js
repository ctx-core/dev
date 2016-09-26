import {assign,clone} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/d3/tag'
export function refresh__background$filter$highlight__chart__d3(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|refresh__background$filter$highlight__chart__d3`)
  const selection__background__d3 =
          refresh__chart__d3(ctx, ...ctx$rest$$, {class$attr: 'background'})
      , selection__filter__d3 =
          refresh__chart__d3(ctx, ...ctx$rest$$, {class$attr: 'filter'})
      , selection__highlight__d3 =
          refresh__chart__d3(ctx, ...ctx$rest$$, {class$attr: 'highlight'})
  return assign(ctx, {
    selection__background__d3,
    selection__filter__d3,
    selection__highlight__d3
  }, ...ctx$rest$$)
}
export function refresh__chart__d3(ctx, ...ctx$rest$$) {
  const ctx$clone = clone(...arguments)
      , select__d3 =
          ctx$clone.select__d3
          || ctx$clone.svg__d3
      , {class$attr} = ctx$clone
  log(`${logPrefix}|refresh__chart__d3`, class$attr)
  if (!select__d3) return
  log(`${logPrefix}|refresh__chart__d3|select__d3`, class$attr, select__d3)
  const { line__d3
        , rows__data} = ctx
  let select__g__d3 = select__d3.select(`g.${class$attr}`)
  const isNew__g__d3 = select__g__d3.empty()
  if (isNew__g__d3) {
    log(`${logPrefix}|refresh__chart__d3|select__d3|isNew__g__d3`, class$attr)
    select__g__d3 =
      select__d3
        .append('g')
        .classed(class$attr, true)
    select__g__d3
      .selectAll('path')
      .data(rows__data)
      .enter()
        .append('path')
        .attr('data-row-id', row => row.row_id)
        .attr('data-ctx-row-name', row => row.ISSUER_NAME)
  }
  const selectAll__g$path__d3 =
          select__g__d3
            .selectAll('path')
            .attr('d', row => {
              return line__d3(row)
            })
  refresh__d3__filter__chart(ctx)
  refresh__d3__highlight__chart(ctx)
  return selectAll__g$path__d3
}
export function refresh__d3__filter__chart(ctx) {
  log(`${logPrefix}|refresh__d3__filter__chart`)
  const { selection__filter__d3
        , filter__rows__data$table} = ctx
  hide__d3__chart(selection__filter__d3, filter__rows__data$table)
}
export function refresh__d3__highlight__chart(ctx) {
  log(`${logPrefix}|refresh__d3__highlight__chart`)
  const { selection__highlight__d3
        , highlight__rows__data} = ctx
  let table__row_id__row = {}
  if (highlight__rows__data) {
    const {row_id} = highlight__rows__data
    table__row_id__row[row_id] = highlight__rows__data
  }
  hide__d3__chart(selection__highlight__d3, table__row_id__row)
}
function hide__d3__chart(select__d3, table__row_id__row={}) {
  log(`${logPrefix}|hide__d3__chart`)
  if (select__d3) {
    select__d3
      .classed(
        'hide',
        row => {
          return  !row
                  || !table__row_id__row[row.row_id]
        })
  }
}