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
      csv.parse(csv$cell$$$, csv$ctx, (csv$parse$error, csv$cell_1$$$) => {
        log(`${logPrefix}|csv$cell$$$transform$$$|Promise|csv.parse`);
        if (csv$parse$error) {
          log(`${logPrefix}|csv$cell$$$transform$$$|Promise|csv.parse|csv$parse$error`, csv$parse$error);
          reject(csv$parse$error);
          return;
        }
        log(`${logPrefix}|csv$cell$$$transform$$$|Promise|csv.parse|success`);
        const csv$cell_1$$$column$$ = csv$cell_1$$$[0]
            , csv$cell_1$$$row$$$ = csv$cell_1$$$.slice(1)
            , csv$row$$ = csv$cell_1$$$row$$$.map(
                csv$cell_1$$$row$$ => {
                  return csv$cell_1$$$column$$.reduce(
                    (memo, csv$cell_1$$$column, csv$cell_1$$$column$index) => {
                      const csv$cell_1$$$row = csv$cell_1$$$row$$[csv$cell_1$$$column$index];
                      memo[csv$cell_1$$$column] = csv$cell$$$transform$$$__fn(
                        csv$cell_1$$$row,
                        csv$cell_1$$$column,
                        csv$cell_1$$$column$index,
                        csv$cell_1$$$row
                      );
                      return memo;
                    }, {});
                });
        resolve(csv$row$$);
      });
    });
}
