import {assign,clone} from 'ctx-core/object/lib'
import {difference} from 'ctx-core/array/lib'
import {table__agent} from 'ctx-core/table/agent'
import {fetch} from 'ctx-core/fetch/lib'
import co from 'co'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/csv/lib'
export function transform__csv$table() {
  log(`${logPrefix}|transform__csv$table`)
  const ctx$clone = clone(...arguments)
      , {csv = ''} = ctx$clone
      , $transform__csv$table =
          ctx$clone.$transform__csv$table
          || (csv$cell => csv$cell)
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|transform__csv$table|Promise`)
      let csv$table = Papa.parse(csv).data
      const csv$columns = csv$table[0]
          , csv$rows = csv$table.slice(1)
      let rows = []
      for (let i=0; i < csv$rows.length; i++) {
        const csv$row = csv$rows[i]
        let row = {}
        for (let j=0; j < csv$columns.length; j++) {
          const column = csv$columns[j]
              , value = csv$row[j]
          row[column] =
            $transform__csv$table(
              value,
              column,
              j,
              value)
        }
        rows.push(row)
      }
      resolve(rows)
    })
}
export function *load__data__csv(ctx) {
  log(`${logPrefix}|load__data__csv`)
  let ctx$ = assign(...arguments)
  table__agent(ctx)
  const {path__csv} = ctx
  let { table
      , domain__table
      , domain__ticks} = ctx$
  return new Promise(
    resolve => {
      log(`${logPrefix}|load__data__csv|Promise`)
      // TODO: move to a web worker
      setTimeout(co.wrap(function *() {
        info(`${logPrefix}|load__data__csv|Promise|setTimeout`)
        if (!table && path__csv) {
          log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv`, path__csv)
          const response = yield fetch(path__csv)
              , text = yield response.text()
          table = Papa.parse(text).data
          const columns = table[0]
              , rows = table.slice(1)
              , columns__data = difference(columns, ctx.columns$exclude)
          cast__rows()
          push__row_id$i()
          ctx.table__agent.set({
            table,
            domain__table,
            domain__ticks,
            columns__data
          })
          // wait for agent change events to propagate
          ctx.table__agent.one('change', () => {
            log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv|change`, path__csv)
            resolve(table)
          })
          function cast__rows() {
            log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv|cast__rows`)
            for (let i=0; i < rows.length; i++) {
              const row = rows[i]
              for (let j=0; j < columns.length; j++) {
                let value__f = parseFloat(row[j])
                if (!Number.isNaN(value__f)) {
                  row[j] = value__f
                }
              }
            }
          }
          function push__row_id$i() {
            log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv|push__row_id$i`)
            columns.push('row_id', 'i')
            for (let i=0; i < rows.length; i++) {
              rows[i].push(i + 1) // id based on index
              rows[i].push(i) // index
            }
          }
        }
      }), 0)
    })
}
export function *load__data__csv__worker(ctx) {
  info(`${logPrefix}|load__data__csv|Promise|setTimeout`)
  let table
  const {path__csv} = ctx
  if (path__csv) {
    log(`${logPrefix}|load__data__csv|Promise|setTimeout|path__csv`, path__csv)
    const response = yield fetch(path__csv)
        , text = yield response.text()
    table = Papa.parse(text)
    // wait for agent change events to propagate
    ctx.table__agent.one('change', () => {
      table
    })
  }
}