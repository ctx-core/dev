import {assign,clone} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/debounce/lib";
export default function *debounce(ctx, ...debounce$ctx$$) {
  log(`${logPrefix}|debounce`);
  const debounce$ctx = clone(...debounce$ctx$$)
      , key = debounce$ctx.key
      , no = debounce$ctx.no
      , yes = debounce$ctx.yes;
  ensure__table__debounce(ctx);
  let table__debounce = ctx.table__debounce;
  if (table__debounce[key]) {
    return yield no()
  }
  try {
    assign$key__table__debounce(ctx, key);
    return yield yes();
  } finally {
    call$key__table__debounce(ctx, key);
  }
}
export function ensure__table__debounce(ctx) {
  log(`${logPrefix}|ensure__table__debounce`);
  if (!ctx.table__debounce) {
    assign(ctx, {table__debounce: {}}); }
  return ctx.table__debounce;
}
export function assign$key__table__debounce(ctx, key) {
  log(`${logPrefix}|assign$key__table__debounce`);
  let table__debounce = ensure__table__debounce(ctx);
  table__debounce[key] = new$timeout__table__debounce(ctx, key);
  return ctx;
}
export function call$key__table__debounce(ctx, key) {
  log(`${logPrefix}|call$key__table__debounce`);
  return ctx.table__debounce[key]();
}
function new$timeout__table__debounce(ctx, key) {
  log(`${logPrefix}|new$timeout__table__debounce`);
  return () => {
    setTimeout(() => {
      log(`${logPrefix}|new$timeout__table__debounce|setTimeout`);
      delete ctx.table__debounce[key];
    }, 0)
  };
}