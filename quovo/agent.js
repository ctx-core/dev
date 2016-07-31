import {assign} from "ctx-core/object/lib";
import {
  ensure__agent,
  change__agents} from "ctx-core/agent/lib";
import {agent__rpc} from "ctx-core/agent/rpc";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/agent";
export function agent__quovo__users(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__users`);
  return agent__quovo__rpc(ctx, {
    key: "agent__quovo__users",
    scope: ["quovo__users"],
    rpc: ["get__quovo__users"]
  }, ...agent$ctx$$);
}
export function agent__quovo__user_id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__user_id`);
  return ensure__agent(ctx, {
    key: "agent__quovo__user_id",
    scope: ["quovo__user_id"]
  }, ...agent$ctx$$);
}
export function agent__quovo__user(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__user`);
  let agent;
  agent__quovo__user_id(ctx);
  agent__quovo__users(ctx);
  return ensure__agent(ctx, {
    key: "agent__quovo__user",
    scope: ["quovo__user"],
    init: init
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__user|init`);
    agent = this;
    ctx.agent__quovo__user_id.on("change", quovo__user_id__on$change);
    ctx.agent__quovo__users.on("change", quovo__users__on$change);
  }
  function quovo__user_id__on$change() {
    log(`${logPrefix}|agent__quovo__user|quovo__user_id__on$change`);
    set__agent();
  }
  function quovo__users__on$change() {
    log(`${logPrefix}|agent__quovo__user|quovo__users__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|agent__quovo__user|set__agent`);
    const quovo__user_id = ctx.quovo__user_id
        , quovo__users = ctx.quovo__users || [];
    agent.set({
      quovo__user: quovo__users.find(
        quovo__user =>
          quovo__user.id === quovo__user_id)});
  }
}
export function agent__quovo__user__accounts(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__user__accounts`);
  let agent;
  agent__quovo__user_id(ctx);
  return agent__quovo__rpc(ctx, {
    key: "agent__quovo__user__accounts",
    scope: ["quovo__user__accounts"],
    rpc: ["get__quovo__user__accounts"],
    init: init,
    reset: reset__quovo__user_id
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__user__accounts|init`);
    agent = this;
    ctx.agent__quovo__user_id.on("change", quovo__user_id__on$change);
  }
  function quovo__user_id__on$change() {
   log(`${logPrefix}|agent__quovo__user__accounts|quovo__user_id__on$change`);
   agent.co$reset();
  }
}
export function agent__quovo__account_id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__account_id`);
  return ensure__agent(ctx, {
    key: "agent__quovo__account_id",
    scope: ["quovo__account_id"]
  }, ...agent$ctx$$);
}
export function agent__quovo__user__account(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__user__account`);
  let agent;
  agent__quovo__user__accounts(ctx);
  agent__quovo__account_id(ctx);
  return ensure__agent(ctx, {
    key: "agent__quovo__user__account",
    scope: ["quovo__user__account"],
    init: init
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__user__account|init`);
    agent = this;
    ctx.agent__quovo__user__accounts.on("change", quovo__user__accounts__on$change);
    ctx.agent__quovo__account_id.on("change", quovo__account_id__on$change);
    set__agent();
  }
  function quovo__user__accounts__on$change() {
    log(`${logPrefix}|agent__quovo__user__account|quovo__accounts__on$change`);
    set__agent();
  }
  function quovo__account_id__on$change() {
    log(`${logPrefix}|agent__quovo__user__account|quovo__account_id__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|agent__quovo__user__account|set__agent`);
    const quovo__account_id = ctx.quovo__account_id
        , quovo__user__accounts = ctx.quovo__user__accounts
        , quovo__user__account = quovo__user__accounts && quovo__user__accounts.find(
            quovo__account =>
              quovo__account.id === quovo__account_id);
    agent.set({
      quovo__user__account: quovo__user__account
    });
  }
}
export function agent__quovo__account__portfolios(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__account__portfolios`);
  let agent;
  agent__quovo__account_id(ctx);
  return agent__quovo__rpc(ctx, {
    key: "agent__quovo__account__portfolios",
    scope: ["quovo__account__portfolios"],
    rpc: ["get__quovo__account__portfolios"],
    init: init,
    reset: reset__quovo__account_id
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__account__portfolios|init`);
    agent = this;
    ctx.agent__quovo__account_id.on("change", quovo__account_id__on$change);
    set__agent();
  }
  function quovo__account_id__on$change() {
    log(`${logPrefix}|agent__quovo__account__portfolios|quovo__account_id__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|agent__quovo__account__portfolios|set__agent`);
    agent.set({
      quovo__account__portfolios: null
    });
    agent.co$reset();
  }
}
export function agent__quovo__portfolio_id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__portfolio_id`);
  return ensure__agent(ctx, {
    key: "agent__quovo__portfolio_id",
    scope: ["quovo__portfolio_id"]
  }, ...agent$ctx$$);
}
export function agent__quovo__portfolio(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__portfolio`);
  let agent;
  agent__quovo__account__portfolios(ctx);
  agent__quovo__portfolio_id(ctx);
  return ensure__agent(ctx, {
    key: "agent__quovo__portfolio",
    scope: ["quovo__portfolio"],
    init: init
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__portfolio|init`);
    agent = this;
    ctx.agent__quovo__account__portfolios.on("change", quovo__account__portfolios__on$change);
    ctx.agent__quovo__portfolio_id.on("change", quovo__portfolio_id__on$change);
  }
  function quovo__account__portfolios__on$change() {
    log(`${logPrefix}|agent__quovo__portfolio|quovo__account__portfolios__on$change`);
    set__agent();
  }
  function quovo__portfolio_id__on$change() {
    log(`${logPrefix}|agent__quovo__portfolio|quovo__portfolio_id__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|agent__quovo__portfolio|set__agent`);
    const quovo__portfolio_id = ctx.quovo__portfolio_id
        , quovo__account__portfolios = ctx.quovo__account__portfolios
        , quovo__portfolio = quovo__account__portfolios && quovo__account__portfolios.find(
            quovo__portfolio =>
              quovo__portfolio.id === quovo__portfolio_id);
    agent.set({
      quovo__portfolio: quovo__portfolio
    });
  }
}
export function agent__quovo__portfolio__history(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__portfolio__history`);
  let agent;
  agent__quovo__portfolio_id(ctx);
  return agent__quovo__rpc(ctx, {
    key: "agent__quovo__portfolio__history",
    scope: ["quovo__portfolio__history"],
    rpc: ["get__quovo__portfolio__history"],
    init: init,
    reset: reset__quovo__portfolio_id
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__portfolio__history|init`);
    agent = this;
    ctx.agent__quovo__portfolio_id.on("change", quovo__portfolio_id__on$change);
  }
  function quovo__portfolio_id__on$change() {
    log(`${logPrefix}|agent__quovo__portfolio__history|quovo__portfolio_id__on$change`);
    agent.co$reset();
  }
}
export function agent__quovo__positions(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__positions`);
  let agent;
  agent__quovo__account_id(ctx);
  return agent__quovo__rpc(ctx, {
    key: "agent__quovo__positions",
    scope: ["quovo__positions"],
    rpc: ["get__quovo__positions"],
    init: init,
    reset: reset__quovo__account_id
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__positions|init`);
    agent = this;
    ctx.agent__quovo__account_id.on("change", set__agent);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|agent__quovo__positions|set__agent`);
    agent.set({quovo__positions: null});
    agent.co$reset();
  }
}
export function agent__quovo__portfolio__positions(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__portfolio__positions`);
  let agent;
  agent__quovo__portfolio_id(ctx);
  agent__quovo__positions(ctx);
  return ensure__agent(ctx, {
    key: "agent__quovo__portfolio__positions",
    scope: ["quovo__portfolio__positions"]
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__portfolio__positions|init`);
    agent = this;
    ctx.agent__quovo__portfolio_id.on("change", quovo__portfolio__on$change);
    ctx.agent__quovo__positions.on("change", quovo__positions__on$change);
    set__agent();
  }
  function quovo__portfolio__on$change() {
    log(`${logPrefix}|agent__quovo__portfolio__positions|quovo__portfolio__on$change`);
    set__agent();
  }
  function quovo__positions__on$change() {
    log(`${logPrefix}|agent__quovo__portfolio__positions|quovo__positions__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|agent__quovo__portfolio__positions|set__agent`);
    const quovo__portfolio = ctx.quovo__portfolio
        , quovo__portfolio_id = quovo__portfolio && quovo__portfolio.id
        , quovo__positions = ctx.quovo__positions
        , quovo__portfolio__positions = quovo__positions && quovo__positions.filter(
            quovo$position =>
              quovo$position.portfolio == quovo__portfolio_id);
    agent.set({
      quovo__portfolio__positions: quovo__portfolio__positions
    });
  }
}
export function agent__quovo__iframe(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__iframe`);
  let agent;
  agent__quovo__user_id(ctx);
  return agent__quovo__rpc(ctx, {
    key: "agent__quovo__iframe",
    scope: ["quovo__iframe$url"],
    rpc: ["post__quovo__user__iframe__token"],
    init: init,
    reset: reset__quovo__user_id
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|agent__quovo__iframe|init`);
    agent = this;
    ctx.agent__quovo__user_id.on("change", quovo__user_id__on$change);
    set__agent();
  }
  function quovo__user_id__on$change() {
    log(`${logPrefix}|agent__quovo__iframe|quovo__user_id__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|set__agent`);
    agent.co$reset();
  }
}
export function agent__quovo__rpc(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|agent__quovo__rpc`);
  let agent;
  return agent__rpc(ctx, {
            new__rpc$ctx: new__rpc$ctx,
            reset: reset__quovo,
            init: init
          }, ...agent$ctx$$);
  function init() {
    agent = this;
    log(`${logPrefix}|agent__quovo__rpc|init`, agent.key);
    const agent__authentication = ctx[ctx.quovo__agent__authentication$key];
    agent__authentication.on("change", authentication__on$change);
  }
  function new__rpc$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|agent__quovo__rpc|new__rpc$ctx`, agent.key);
    return assign(reset$ctx, {
      authentication: ctx[ctx.quovo__authentication$key],
      quovo__user_id: ctx.quovo__user_id,
      quovo__account_id: ctx.quovo__account_id,
      quovo__portfolio_id: ctx.quovo__portfolio_id
    }, ...reset$ctx$rest$$);
  }
  function authentication__on$change() {
    log(`${logPrefix}|authentication__on$change`, agent.key);
    agent.co$reset();
  }
}
function *reset__quovo() {
  const agent = this;
  log(`${logPrefix}|reset__quovo`, agent.key);
  let ctx = agent.ctx;
  if (ctx[ctx.quovo__authentication$key]) {
    return yield agent.reset__rpc(...arguments);
  } else {
    return yield agent.reset__clear();
  }
}
function *reset__quovo__user_id() {
  log(`${logPrefix}|reset__quovo__user_id`);
  const agent = this;
  let ctx = agent.ctx;
  if (ctx.quovo__user_id) {
    return yield reset__quovo.call(agent, ...arguments);
  } else {
    return yield agent.reset__clear();
  }
}
function *reset__quovo__account_id() {
  log(`${logPrefix}|reset__quovo__account_id`);
  const agent = this;
  let ctx = agent.ctx;
  if (ctx.quovo__account_id) {
    return yield reset__quovo.call(agent, ...arguments);
  } else {
    return yield agent.reset__clear();
  }
}
function *reset__quovo__portfolio_id() {
  log(`${logPrefix}|reset__quovo__portfolio_id`);
  const agent = this;
  let ctx = agent.ctx;
  if (ctx.quovo__portfolio_id) {
    return yield reset__quovo.call(agent, ...arguments);
  } else {
    return yield agent.reset__clear();
  }
}