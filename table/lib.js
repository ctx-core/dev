import {titleCase} from 'ctx-core/string/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/table/lib'
export function present__column(column) {
  return titleCase(
          column
          .replace('_SCORE', '')
          .replace(/_/g, ' '))
}
export function $offsets__column(columns) {
  return  columns.reduce((memo, column, i) => {
            memo[column] = i
            return memo
          }, {})
}
export function $rows(ctx) {
  log(`${logPrefix}|$rows`)
  const { rows
        , offsets__column} = ctx
  if (!rows) return
  let rows$ = []
  for (let i=0; i < rows.length; i++) {
    const row = rows[i]
    rows$.push($proxy__row({row, offsets__column}))
  }
  return rows$
}
export function $rows__data(ctx) {
  log(`${logPrefix}|$rows__data`)
  const { rows
        , columns__data
        , offsets__column} = ctx
  if (!rows) return
  let rows__data = []
  for (let i=0; i < rows.length; i++) {
    const row = rows[i]
    let row__data = []
    for (let j=0; j < columns__data.length; j++) {
      const column = columns__data[j]
      row__data.push(row[offsets__column[column]])
    }
    rows__data.push($proxy__row({row__data, row, offsets__column}))
  }
  return rows__data
}
export function $proxy__row(ctx) {
  const { row
        , row__data=row
        , offsets__column} = ctx
  return  new Proxy(row__data, {
            get
          })
  function get(target, name) {
    if (offsets__column[name] != null) {
      return row[offsets__column[name]]
    } else {
      return target[name]
    }
  }
}