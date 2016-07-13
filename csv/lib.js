import {clone} from "ctx-core/object/lib";
import csv from "csv";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/csv/lib";
export function csv$cell$$$transform$$$() {
  log(`${logPrefix}|csv$cell$$$transform$$$`);
  const ctx$clone = clone(...arguments)
      , csv$cell$$$ = ctx$clone.csv$cell$$$
      , csv$cell$$$transform$$$__fn = ctx$clone.csv$cell$$$transform$$$__fn ||
          (csv$cell => csv$cell)
      , csv$ctx = ctx$clone.csv$ctx || {};
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|csv$cell$$$transform$$$|Promise`);
      csv.parse(csv$cell$$$, csv$ctx, (csv$parse$error, csv$cell$$$__local) => {
        log(`${logPrefix}|csv$cell$$$transform$$$|Promise|csv.parse`);
        if (csv$parse$error) {
          log(`${logPrefix}|csv$cell$$$transform$$$|Promise|csv.parse|csv$parse$error`, csv$parse$error);
          reject(csv$parse$error);
          return;
        }
        log(`${logPrefix}|csv$cell$$$transform$$$|Promise|csv.parse|success`);
        const csv$cell$$$column$$__local = csv$cell$$$__local[0]
            , csv$cell$$$row$$$__local = csv$cell$$$__local.slice(1)
            , csv$row$$ = csv$cell$$$row$$$__local.map(
                local__csv$cell$$$row$$ => {
                  return csv$cell$$$column$$__local.reduce(
                    (memo, csv$cell$$$column__local, csv$cell$$$column$index__local) => {
                      const csv$cell$$$row__local = local__csv$cell$$$row$$[csv$cell$$$column$index__local];
                      memo[csv$cell$$$column__local] = csv$cell$$$transform$$$__fn(
                        csv$cell$$$row__local,
                        csv$cell$$$column__local,
                        csv$cell$$$column$index__local,
                        csv$cell$$$row__local
                      );
                      return memo;
                    }, {});
                });
        resolve(csv$row$$);
      });
    });
}
