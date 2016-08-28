import {clone} from 'ctx-core/object/lib'
import csv from 'csv'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/csv/lib'
export function transform__csv$table() {
  log(`${logPrefix}|transform__csv$table`)
  const ctx$clone = clone(...arguments)
      , csv$table = ctx$clone.csv$table
      , new__transform__csv$table = ctx$clone.new__transform__csv$table ||
          (csv$cell => csv$cell)
      , csv$ctx = ctx$clone.csv$ctx || {}
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|transform__csv$table|Promise`)
      csv.parse(csv$table, csv$ctx, (csv$parse_error, csv$table__local) => {
        log(`${logPrefix}|transform__csv$table|Promise|csv.parse`)
        if (csv$parse_error) {
          log(`${logPrefix}|transform__csv$table|Promise|csv.parse|csv$parse_error`, csv$parse_error)
          reject(csv$parse_error)
          return
        }
        log(`${logPrefix}|transform__csv$table|Promise|csv.parse|success`)
        const csv$columns = csv$table__local[0]
            , csv$rows__local = csv$table__local.slice(1)
            , csv$rows = csv$rows__local.map(
                csv$row__local => {
                  return csv$columns.reduce(
                    (memo, csv$column__local, column_index) => {
                      const csv$cell__local = csv$row__local[column_index]
                      memo[csv$column__local] = new__transform__csv$table(
                        csv$cell__local,
                        csv$column__local,
                        column_index,
                        csv$cell__local
                      )
                      return memo
                    }, {})
                })
        resolve(csv$rows)
      })
    })
}