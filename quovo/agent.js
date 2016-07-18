import {assign} from "ctx-core/object/lib";
import {assign__agent,new__agent$ctx__rpc} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/agent";
export function assign__agent__quovo__users(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__users`);
  assign__agent__quovo__rpc(ctx, {
    key: "agent__quovo__users",
    scope: ["quovo__users"],
    rpc: ["get__quovo__users"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__quovo__user_id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__user_id`);
  assign__agent(ctx, {
    key: "agent__quovo__user_id",
    scope: ["quovo__user_id"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__quovo__user(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__user`);
  let agent__quovo__user;
  assign__agent__quovo__user_id(ctx);
  assign__agent__quovo__users(ctx);
  assign__agent(ctx, {
    key: "agent__quovo__user",
    scope: ["quovo__user"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__user|init`);
    agent__quovo__user = agent;
    ctx.agent__quovo__user_id.on("change", quovo__user_id__on$change);
    ctx.agent__quovo__users.on("change", quovo__users__on$change);
  }
  function quovo__user_id__on$change() {
    log(`${logPrefix}|assign__agent__quovo__user|quovo__user_id__on$change`);
    set__agent();
  }
  function quovo__users__on$change() {
    log(`${logPrefix}|assign__agent__quovo__user|quovo__users__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|assign__agent__quovo__user|set__agent`);
    const quovo__user_id = ctx.quovo__user_id
        , quovo__users = ctx.quovo__users || [];
    agent__quovo__user.set({
      quovo__user: quovo__users.find(
        quovo__user =>
          quovo__user.id === quovo__user_id)});
  }
}
export function assign__agent__quovo__user__accounts(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__user__accounts`);
  let agent__quovo__user__accounts;
  assign__agent__quovo__user_id(ctx);
  assign__agent__quovo__rpc(ctx, {
    key: "agent__quovo__user__accounts",
    scope: ["quovo__user__accounts"],
    rpc: ["get__quovo__user__accounts"],
    init: init,
    reset$guard: new__reset$guard__quovo__user_id(ctx)
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__user__accounts|init`);
    agent__quovo__user__accounts = agent;
    ctx.agent__quovo__user_id.on("change", quovo__user_id__on$change);
  }
  function quovo__user_id__on$change() {
   log(`${logPrefix}|assign__agent__quovo__user__accounts|quovo__user_id__on$change`);
   agent__quovo__user__accounts.co$reset();
  }
}
export function assign__agent__quovo__account_id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__account_id`);
  assign__agent(ctx, {
    key: "agent__quovo__account_id",
    scope: ["quovo__account_id"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__quovo__user__account(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__user__account`);
  let agent__quovo__user__account;
  assign__agent__quovo__user__accounts(ctx);
  assign__agent__quovo__account_id(ctx);
  assign__agent(ctx, {
    key: "agent__quovo__user__account",
    scope: ["quovo__user__account"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__user__account|init`);
    agent__quovo__user__account = agent;
    ctx.agent__quovo__user__accounts.on("change", quovo__user__accounts__on$change);
    ctx.agent__quovo__account_id.on("change", quovo__account_id__on$change);
    set__agent__quovo__user__account();
  }
  function quovo__user__accounts__on$change() {
    log(`${logPrefix}|assign__agent__quovo__user__account|quovo__accounts__on$change`);
    set__agent__quovo__user__account();
  }
  function quovo__account_id__on$change() {
    log(`${logPrefix}|assign__agent__quovo__user__account|quovo__account_id__on$change`);
    set__agent__quovo__user__account();
  }
  function set__agent__quovo__user__account() {
    log(`${logPrefix}|assign__agent__quovo__user__account|set__agent__quovo__user__account`);
    const quovo__account_id = ctx.quovo__account_id
        , quovo__user__accounts = ctx.quovo__user__accounts
        , quovo__user__account = quovo__user__accounts && quovo__user__accounts.find(
            quovo__account =>
              quovo__account.id === quovo__account_id);
    agent__quovo__user__account.set({
      quovo__user__account: quovo__user__account
    });
  }
}
export function assign__agent__quovo__account__portfolios(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__account__portfolios`);
  let agent__quovo__account__portfolios;
  assign__agent__quovo__account_id(ctx);
  assign__agent__quovo__rpc(ctx, {
    key: "agent__quovo__account__portfolios",
    scope: ["quovo__account__portfolios"],
    rpc: ["get__quovo__account__portfolios"],
    init: init,
    reset$guard: new__reset$guard__quovo__account_id(ctx)
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__account__portfolios|init`);
    agent__quovo__account__portfolios = agent;
    ctx.agent__quovo__account_id.on("change", quovo__account_id__on$change);
    set__agent();
  }
  function quovo__account_id__on$change() {
    log(`${logPrefix}|assign__agent__quovo__account__portfolios|quovo__account_id__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|assign__agent__quovo__account__portfolios|set__agent`);
    agent__quovo__account__portfolios.set({
      quovo__account__portfolios: null
    });
    agent__quovo__account__portfolios.co$reset();
  }
}
export function assign__agent__quovo__portfolio_id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__portfolio_id`);
  assign__agent(ctx, {
    key: "agent__quovo__portfolio_id",
    scope: ["quovo__portfolio_id"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__quovo__portfolio(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__portfolio`);
  let agent__quovo__portfolio_id;
  assign__agent__quovo__account__portfolios(ctx);
  assign__agent__quovo__portfolio_id(ctx);
  assign__agent(ctx, {
    key: "agent__quovo__portfolio",
    scope: ["quovo__portfolio"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__portfolio|init`);
    agent__quovo__portfolio_id = agent;
    ctx.agent__quovo__account__portfolios.on("change", quovo__account__portfolios__on$change);
    ctx.agent__quovo__portfolio_id.on("change", quovo__portfolio_id__on$change);
  }
  function quovo__account__portfolios__on$change() {
    log(`${logPrefix}|assign__agent__quovo__portfolio|quovo__account__portfolios__on$change`);
    set__agent__quovo__portfolio_id();
  }
  function quovo__portfolio_id__on$change() {
    log(`${logPrefix}|assign__agent__quovo__portfolio|quovo__portfolio_id__on$change`);
    set__agent__quovo__portfolio_id();
  }
  function set__agent__quovo__portfolio_id() {
    log(`${logPrefix}|assign__agent__quovo__portfolio|set__agent__quovo__portfolio_id`);
    const quovo__portfolio_id = ctx.quovo__portfolio_id
        , quovo__account__portfolios = ctx.quovo__account__portfolios
        , quovo__portfolio = quovo__account__portfolios && quovo__account__portfolios.find(
            quovo__portfolio =>
              quovo__portfolio.id === quovo__portfolio_id);
    agent__quovo__portfolio_id.set({
      quovo__portfolio: quovo__portfolio
    });
  }
}
export function assign__agent__quovo__portfolio__history(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__portfolio__history`);
  let agent__quovo__portfolio__history;
  assign__agent__quovo__portfolio_id(ctx);
  assign__agent__quovo__rpc(ctx, {
    key: "agent__quovo__portfolio__history",
    scope: ["quovo__portfolio__history"],
    rpc: ["get__quovo__portfolio__history"],
    init: init,
    reset$guard: new__reset$guard__quovo__portfolio_id(ctx)
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__portfolio__history|init`);
    agent__quovo__portfolio__history = agent;
    ctx.agent__quovo__portfolio_id.on("change", quovo__portfolio_id__on$change);
  }
  function quovo__portfolio_id__on$change() {
    log(`${logPrefix}|assign__agent__quovo__portfolio__history|quovo__portfolio_id__on$change`);
    agent__quovo__portfolio__history.co$reset();
  }
}
export function assign__agent__quovo__positions(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__positions`);
  let agent__quovo__positions;
  assign__agent__quovo__account_id(ctx);
  assign__agent__quovo__rpc(ctx, {
    key: "agent__quovo__positions",
    scope: ["quovo__positions"],
    rpc: ["get__quovo__positions"],
    init: init,
    reset$guard: new__reset$guard__quovo__account_id(ctx)
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__positions|init`);
    agent__quovo__positions = agent;
    ctx.agent__quovo__account_id.on("change", set__agent__quovo__positions);
    set__agent__quovo__positions();
  }
  function set__agent__quovo__positions() {
    log(`${logPrefix}|assign__agent__quovo__positions|quovo__account_id__on$change`);
    agent__quovo__positions.set({quovo__positions: null});
    agent__quovo__positions.co$reset();
  }
}
export function assign__agent__quovo__portfolio__positions(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__portfolio__positions`);
  let agent__quovo__portfolio__positions;
  assign__agent__quovo__portfolio_id(ctx);
  assign__agent__quovo__positions(ctx);
  assign__agent(ctx, {
    key: "agent__quovo__portfolio__positions",
    scope: ["quovo__portfolio__positions"]
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__portfolio__positions|init`);
    agent__quovo__portfolio__positions = agent;
    ctx.agent__quovo__portfolio_id.on("change", quovo__portfolio__on$change);
    ctx.agent__quovo__positions.on("change", quovo__positions__on$change);
    set__agent__quovo__portfolio__positions();
  }
  function quovo__portfolio__on$change() {
    log(`${logPrefix}|assign__agent__quovo__portfolio__positions|quovo__portfolio__on$change`);
    set__agent__quovo__portfolio__positions();
  }
  function quovo__positions__on$change() {
    log(`${logPrefix}|assign__agent__quovo__portfolio__positions|quovo__positions__on$change`);
    set__agent__quovo__portfolio__positions();
  }
  function set__agent__quovo__portfolio__positions() {
    log(`${logPrefix}|assign__agent__quovo__portfolio__positions|set__agent__quovo__portfolio__positions`);
    const quovo__portfolio = ctx.quovo__portfolio
        , quovo__portfolio_id = quovo__portfolio && quovo__portfolio.id
        , quovo__positions = ctx.quovo__positions
        , quovo__portfolio__positions = quovo__positions && quovo__positions.filter(
            quovo$position =>
              quovo$position.portfolio == quovo__portfolio_id);
    agent__quovo__portfolio__positions.set({
      quovo__portfolio__positions: quovo__portfolio__positions
    });
  }
}
export function assign__agent__quovo__iframe(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__iframe`);
  let agent__quovo__iframe;
    assign__agent__quovo__user_id(ctx);
    assign__agent__quovo__rpc(ctx, {
      key: "agent__quovo__iframe",
      scope: ["quovo__iframe$url"],
      rpc: ["post__quovo__user__iframe__token"],
      init: init,
      reset$guard: new__reset$guard__quovo__user_id(ctx)
    }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__iframe|init`);
    agent__quovo__iframe = agent;
    ctx.agent__quovo__user_id.on("change", quovo__user_id__on$change);
    set__agent();
  }
  function quovo__user_id__on$change() {
    log(`${logPrefix}|assign__agent__quovo__iframe|quovo__user_id__on$change`);
    set__agent();
  }
  function set__agent() {
    log(`${logPrefix}|set__agent`);
    agent__quovo__iframe.co$reset();
  }
}
export function assign__agent__quovo__rpc(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__rpc`);
  let agent__quovo__rpc;
  const agent$ctx = new__agent$ctx__rpc(ctx, {
            new__rpc$ctx: new__rpc$ctx,
            reset$guard: reset$guard__quovo,
            init: init
          }, ...agent$ctx$$);
  assign__agent(ctx, agent$ctx);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__rpc|init`);
    agent__quovo__rpc = agent;
    const agent__authentication = ctx[ctx.quovo__agent__authentication$key];
    agent__authentication.on("change", authentication__on$change);
  }
  function new__rpc$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|assign__agent__quovo__rpc|new__rpc$ctx`);
    return assign(reset$ctx, {
      authentication: ctx[ctx.quovo__authentication$key],
      quovo__user_id: ctx.quovo__user_id,
      quovo__account_id: ctx.quovo__account_id,
      quovo__portfolio_id: ctx.quovo__portfolio_id
    }, ...reset$ctx$rest$$);
  }
  function authentication__on$change() {
    log(`${logPrefix}|authentication__on$change`);
    agent__quovo__rpc.co$reset();
  }
}
function reset$guard__quovo(ctx) {
  log(`${logPrefix}|reset$guard__quovo`);
  return !!(ctx[ctx.quovo__authentication$key]);
}
function new__reset$guard__quovo__user_id(ctx) {
  log(`${logPrefix}|new__reset$guard__quovo__user_id`);
  return () => {
    return !!(reset$guard__quovo(ctx) && ctx.quovo__user_id);
  };
}
function new__reset$guard__quovo__account_id(ctx) {
  log(`${logPrefix}|new__reset$guard__quovo__account_id`);
  return () => {
    return !!(reset$guard__quovo(ctx) && ctx.quovo__account_id);
  };
}
function new__reset$guard__quovo__portfolio_id(ctx) {
  log(`${logPrefix}|new__reset$guard__quovo__portfolio_id`);
  return () => {
    return !!(reset$guard__quovo(ctx) && ctx.quovo__portfolio_id);
  };
}