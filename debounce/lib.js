import {assign} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/debounce/lib";
export function assign$maybe__table__debounce(ctx) {
  log(`${logPrefix}|assign$maybe__table__debounce`);
  if (!ctx.table__debounce)
    assign(ctx, {table__debounce: {}});
  return ctx;
}
export function assign$key__table__debounce(ctx, key) {
  log(`${logPrefix}|assign$key__table__debounce`);
  assign$maybe__table__debounce(ctx);
  ctx.table__debounce[key] = new$timeout__table__debounce(ctx, key);
  return ctx;
}
export function call$key__table__debounce(ctx, key) {
  log(`${logPrefix}|call$key__table__debounce`);
  return ctx.table__debounce[key]();
}
function new$timeout__table__debounce(ctx, key) {
  log(`${logPrefix}|new__table__debounce`);
  return () => {
    setTimeout(() => {
      log(`${logPrefix}|new__delete__table__debounce__key|setTimeout`);
      delete ctx.table__debounce[key];
    }, 1000)
  };
}