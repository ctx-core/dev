import {clone} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import {fetch,new__fetch$descriptor} from "ctx-core/fetch/lib";
import {ensure__agent,new__fetch$ctx__agent} from "ctx-core/agent/lib";
import {
  ensure__table__debounce,
  assign$key__table__debounce,
  call$key__table__debounce} from "ctx-core/debounce/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/agent/fetch";
export function ensure__agent__fetch(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__fetch`);
  return ensure__agent(ctx, {
    reset: reset__fetch,
    reset__fetch: reset__fetch,
    new__fetch$ctx: new__fetch$ctx__agent,
    reset__do: reset__do,
    reset__assign__fetch: reset__assign__fetch
  }, ...agent$ctx$$);
}
export function *reset__fetch() {
  log(`${logPrefix}|reset__fetch`);
  const agent = this
      , key = agent.key
      , new__fetch$ctx = agent.new__fetch$ctx
      , reset$ctx = clone(...arguments);
  let ctx = agent.ctx;
  ensure__table__debounce(ctx);
  let table__debounce = ctx.table__debounce;
  const fetch$ctx = new__fetch$ctx(reset$ctx)
      , fetch$descriptor = new__fetch$descriptor(fetch$ctx);
  if (table__debounce[fetch$descriptor]) {
    return yield agent.reset__noop();}
  try {
    log(`${logPrefix}|reset__fetch|try`, key);
    assign$key__table__debounce(ctx, fetch$descriptor);
    return yield agent.reset__do(fetch$ctx);
  } finally {
    call$key__table__debounce(ctx, fetch$descriptor);
  }
}
export function *reset__do(fetch$ctx) {
  log(`${logPrefix}|reset__do`);
  const agent = this;
  let ctx = agent.ctx;
  try {
    const response$ctx = yield fetch(ctx, fetch$ctx);
    return yield agent.reset__assign__fetch(response$ctx);
  } catch (error$ctx) {
    if (error$ctx.response && error$ctx.response.status === 404) {
      return yield agent.reset__clear();
    } else {
      throw__error(error$ctx);
    }
  }
}
export function *reset__assign__fetch(response$ctx) {
  log(`${logPrefix}|reset__assign__fetch`);
  const agent = this;
  return yield agent.reset__assign(response$ctx);
}