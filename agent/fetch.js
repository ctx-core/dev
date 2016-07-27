import {clone} from "ctx-core/object/lib";
import {throw__error} from "ctx-core/error/lib";
import {fetch} from "ctx-core/fetch/lib";
import {ensure__agent} from "ctx-core/agent/lib";
import debounce from "ctx-core/debounce/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/agent/fetch";
export function ensure__agent__fetch(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__fetch`);
  return ensure__agent(ctx, {
    reset: reset__fetch,
    reset__fetch: reset__fetch,
    reset__fetch__yes: reset__fetch__yes,
    reset__fetch__assign: reset__fetch__assign
  }, ...agent$ctx$$);
}
export function *reset__fetch() {
  log(`${logPrefix}|reset__fetch`);
  const agent = this
      , key = agent.key
      , reset$ctx = clone(...arguments);
  let ctx = agent.ctx;
  yield debounce(ctx, {
    key: `${key}__reset__fetch`,
    no: function *() { agent.reset__noop(); },
    yes: function *() {
      yield agent.reset__fetch__yes(reset$ctx);
    }
  });
}
export function *reset__fetch__yes(reset$ctx) {
  log(`${logPrefix}|reset__fetch__yes`);
  const agent = this;
  try {
    return yield agent.reset__fetch__assign(reset$ctx);
  } catch (error$ctx) {
    if (error$ctx.response && error$ctx.response.status === 404) {
      return yield agent.reset__clear();
    } else {
      throw__error(agent.ctx, error$ctx);
    }
  }
}
export function *reset__fetch__assign(reset$ctx) {
  log(`${logPrefix}|reset__fetch__assign`);
  const agent = this
      , ctx = agent.ctx
      , fetch$ctx = reset$ctx
      , response$ctx = yield fetch(ctx, fetch$ctx);
  return yield agent.reset__assign(response$ctx);
}