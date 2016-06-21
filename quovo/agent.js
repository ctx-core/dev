import {assign} from "ctx-core/object/lib";
import {assign__agent,fn$cmd_Agent$ctx} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/agent";
export function assign__quovo$user$$_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$user$$_agent`);
  assign__quovo$cmd_agent(ctx, {
    key: "quovo$user$$_agent",
    scope: ["quovo$user$$"],
    cmd: ["quovo$user$$cmd"]
  }, ...Agent$ctx$$);
  return ctx;
}
export function assign__quovo$user$id_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$user$id_agent`);
  assign__agent(ctx, {
    key: "quovo$user$id_agent",
    scope: ["quovo$user$id"]
  }, ...Agent$ctx$$);
  return ctx;
}
export function assign__quovo$user_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$user_agent`);
  let quovo$user_agent;
  assign__quovo$user$id_agent(ctx);
  assign__quovo$user$$_agent(ctx);
  assign__agent(ctx, {
    key: "quovo$user_agent",
    scope: ["quovo$user"],
    init: init
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent$) {
    log(`${logPrefix}|assign__quovo$user_agent|init`);
    quovo$user_agent = agent$;
    ctx.quovo$user$id_agent.on("change", quovo$user$id$on$change);
    ctx.quovo$user$$_agent.on("change", quovo$user$$$on$change);
  }
  function quovo$user$id$on$change() {
    log(`${logPrefix}|assign__quovo$user_agent|quovo$user$id$on$change`);
    quovo$user_agent$set();
  }
  function quovo$user$$$on$change() {
    log(`${logPrefix}|assign__quovo$user_agent|quovo$user$$$on$change`);
    quovo$user_agent$set();
  }
  function quovo$user_agent$set() {
    log(`${logPrefix}|assign__quovo$user_agent|quovo$user_agent$set`);
    const quovo$user$id = ctx.quovo$user$id
        , quovo$user$$ = ctx.quovo$user$$ || [];
    quovo$user_agent.set({
      quovo$user: quovo$user$$.find(
        quovo$user =>
          quovo$user.id === quovo$user$id)});
  }
}
export function assign__quovo$user$account$$_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$user$account$$_agent`);
  let quovo$user$account$$_agent;
  assign__quovo$user$id_agent(ctx);
  assign__quovo$cmd_agent(ctx, {
    key: "quovo$user$account$$_agent",
    scope: ["quovo$user$account$$"],
    cmd: ["quovo$user$account$$cmd"],
    init: init,
    fn$reset$guard: quovo$user$id__fn$reset$guard$fn(ctx)
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__quovo$user$account$$_agent|init`);
    quovo$user$account$$_agent = agent;
    ctx.quovo$user$id_agent.on("change", quovo$user$id$on$change);
  }
  function quovo$user$id$on$change() {
   log(`${logPrefix}|assign__quovo$user$account$$_agent|quovo$user$id$on$change`);
   quovo$user$account$$_agent.co$reset();
  }
}
export function assign__quovo$account$id_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$account$id_agent`);
  assign__agent(ctx, {
    key: "quovo$account$id_agent",
    scope: ["quovo$account$id"]
  }, ...Agent$ctx$$);
  return ctx;
}
export function assign__quovo$user$account_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$user$account_agent`);
  let quovo$user$account_agent;
  assign__quovo$user$account$$_agent(ctx);
  assign__quovo$account$id_agent(ctx);
  assign__agent(ctx, {
    key: "quovo$user$account_agent",
    scope: ["quovo$user$account"],
    init: init
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__quovo$user$account_agent|init`);
    quovo$user$account_agent = agent;
    ctx.quovo$user$account$$_agent.on("change", quovo$user$account$$$on$change);
    ctx.quovo$account$id_agent.on("change", quovo$account$id$on$change);
    quovo$user$account_agent$set();
  }
  function quovo$user$account$$$on$change() {
    log(`${logPrefix}|assign__quovo$user$account_agent|quovo$account$$$on$change`);
    quovo$user$account_agent$set();
  }
  function quovo$account$id$on$change() {
    log(`${logPrefix}|assign__quovo$user$account_agent|quovo$account$id$on$change`);
    quovo$user$account_agent$set();
  }
  function quovo$user$account_agent$set() {
    log(`${logPrefix}|assign__quovo$user$account_agent|quovo$user$account_agent$set`);
    const quovo$account$id = ctx.quovo$account$id
        , quovo$user$account$$ = ctx.quovo$user$account$$
        , quovo$user$account = quovo$user$account$$ && quovo$user$account$$.find(
            quovo$account =>
              quovo$account.id === quovo$account$id);
    quovo$user$account_agent.set({
      quovo$user$account: quovo$user$account
    });
  }
}
export function assign__quovo$account$portfolio$$_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$account$portfolio$$_agent`);
  let quovo$account$portfolio$$_agent;
  assign__quovo$account$id_agent(ctx);
  assign__quovo$cmd_agent(ctx, {
    key: "quovo$account$portfolio$$_agent",
    scope: ["quovo$account$portfolio$$"],
    cmd: ["quovo$account$portfolio$$cmd"],
    init: init,
    fn$reset$guard: quovo$account$id__fn$reset$guard$fn(ctx)
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__quovo$account$portfolio$$_agent|init`);
    quovo$account$portfolio$$_agent = agent;
    ctx.quovo$account$id_agent.on("change", quovo$account$id$on$change);
    quovo$account$portfolio$$_agent$set();
  }
  function quovo$account$id$on$change() {
    log(`${logPrefix}|assign__quovo$account$portfolio$$_agent|quovo$account$id$on$change`);
    quovo$account$portfolio$$_agent$set();
  }
  function quovo$account$portfolio$$_agent$set() {
    log(`${logPrefix}|assign__quovo$account$portfolio$$_agent|quovo$account$portfolio$$_agent$set`);
    quovo$account$portfolio$$_agent.set({
      quovo$account$portfolio$$: null
    });
    quovo$account$portfolio$$_agent.co$reset();
  }
}
export function assign__quovo$portfolio$id_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$portfolio$id_agent`);
  assign__agent(ctx, {
    key: "quovo$portfolio$id_agent",
    scope: ["quovo$portfolio$id"]
  }, ...Agent$ctx$$);
  return ctx;
}
export function assign__quovo$portfolio_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$portfolio_agent`);
  let quovo$portfolio_agent;
  assign__quovo$account$portfolio$$_agent(ctx);
  assign__quovo$portfolio$id_agent(ctx);
  assign__agent(ctx, {
    key: "quovo$portfolio_agent",
    scope: ["quovo$portfolio"],
    init: init
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__quovo$portfolio_agent|init`);
    quovo$portfolio_agent = agent;
    ctx.quovo$account$portfolio$$_agent.on("change", quovo$account$portfolio$$$on$change);
    ctx.quovo$portfolio$id_agent.on("change", quovo$portfolio$id$on$change);
  }
  function quovo$account$portfolio$$$on$change() {
    log(`${logPrefix}|quovo$account$portfolio$$$on$change`);
    quovo$portfolio_agent$set();
  }
  function quovo$portfolio$id$on$change() {
    log(`${logPrefix}|quovo$portfolio$id$on$change`);
    quovo$portfolio_agent$set();
  }
  function quovo$portfolio_agent$set() {
    log(`${logPrefix}|quovo$portfolio_agent$set`);
    const quovo$portfolio$id = ctx.quovo$portfolio$id
        , quovo$account$portfolio$$ = ctx.quovo$account$portfolio$$
        , quovo$portfolio = quovo$account$portfolio$$ && quovo$account$portfolio$$.find(
            quovo$portfolio =>
              quovo$portfolio.id === quovo$portfolio$id);
    quovo$portfolio_agent.set({
      quovo$portfolio: quovo$portfolio
    });
  }
}
export function assign__quovo$portfolio$history_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$portfolio$history_agent`);
  let quovo$portfolio$history_agent;
  assign__quovo$portfolio$id_agent(ctx);
  assign__quovo$cmd_agent(ctx, {
    key: "quovo$portfolio$history_agent",
    scope: ["quovo$portfolio$history"],
    cmd: ["quovo$portfolio$history$cmd"],
    init: init,
    fn$reset$guard: quovo$portfolio$id__fn$reset$guard$fn(ctx)
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__quovo$portfolio$history_agent|init`);
    quovo$portfolio$history_agent = agent;
    ctx.quovo$portfolio$id_agent.on("change", quovo$portfolio$id$on$change);
  }
  function quovo$portfolio$id$on$change() {
    log(`${logPrefix}|assign__quovo$portfolio$history_agent|quovo$portfolio$id$on$change`);
    quovo$portfolio$history_agent.co$reset();
  }
}
export function assign__quovo$position$$_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$position$$_agent`);
  let quovo$position$$_agent;
  assign__quovo$account$id_agent(ctx);
  assign__quovo$cmd_agent(ctx, {
    key: "quovo$position$$_agent",
    scope: ["quovo$position$$"],
    cmd: ["quovo$position$$cmd"],
    init: init,
    fn$reset$guard: quovo$account$id__fn$reset$guard$fn(ctx)
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent$) {
    log(`${logPrefix}|assign__quovo$position$$_agent|init`);
    quovo$position$$_agent = agent$;
    ctx.quovo$account$id_agent.on("change", quovo$position$$_agent$set);
    quovo$position$$_agent$set();
  }
  function quovo$position$$_agent$set() {
    log(`${logPrefix}|assign__quovo$position$$_agent|quovo$account$id$on$change`);
    quovo$position$$_agent.set({quovo$position$$: null});
    quovo$position$$_agent.co$reset();
  }
}
export function assign__quovo$portfolio$position$$_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$portfolio$position$$_agent`);
  let quovo$portfolio$position$$_agent;
  assign__quovo$portfolio_agent(ctx);
  assign__quovo$position$$_agent(ctx);
  assign__agent(ctx, {
    key: "quovo$portfolio$position$$_agent",
    scope: ["quovo$portfolio$position$$"]
  }, ...Agent$ctx$$);
  return ctx;
  function init(agent$) {
    log(`${logPrefix}|assign__quovo$portfolio$position$$_agent|init`);
    quovo$portfolio$position$$_agent = agent$;
    ctx.quovo$portfolio_agent.on("change", quovo$portfolio$on$change);
    ctx.quovo$position$$_agent.on("change", quovo$position$$$on$change);
    quovo$portfolio$position$$_agent$set();
  }
  function quovo$portfolio$on$change() {
    log(`${logPrefix}|assign__quovo$portfolio$position$$_agent|quovo$portfolio$on$change`);
    quovo$portfolio$position$$_agent$set();
  }
  function quovo$position$$$on$change() {
    log(`${logPrefix}|assign__quovo$portfolio$position$$_agent|quovo$position$$$on$change`);
    quovo$portfolio$position$$_agent$set();
  }
  function quovo$portfolio$position$$_agent$set() {
    log(`${logPrefix}|assign__quovo$portfolio$position$$_agent|quovo$portfolio$position$$_agent$set`);
    const quovo$portfolio = ctx.quovo$portfolio
        , quovo$portfolio$id = quovo$portfolio && quovo$portfolio.id
        , quovo$position$$ = ctx.quovo$position$$
        , quovo$portfolio$position$$ = quovo$position$$ && quovo$position$$.filter(
            quovo$position =>
              quovo$position.portfolio == quovo$portfolio$id);
    quovo$portfolio$position$$_agent.set({
      quovo$portfolio$position$$: quovo$portfolio$position$$
    });
  }
}
export function assign__quovo$iframe_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$iframe_agent`);
  let quovo$iframe_agent;
    assign__quovo$user$id_agent(ctx);
    assign__quovo$cmd_agent(ctx, {
      key: "quovo$iframe_agent",
      scope: ["quovo$iframe$url"],
      cmd: ["quovo$user$iframe$token$post$cmd"],
      init: init,
      fn$reset$guard: quovo$user$id__fn$reset$guard$fn(ctx)
    }, ...Agent$ctx$$);
  return ctx;
  function init(agent$) {
    log(`${logPrefix}|assign__quovo$iframe_agent|init`);
    quovo$iframe_agent = agent$;
    ctx.quovo$user$id_agent.on("change", quovo$user$id$on$change);
    quovo$iframe_agent$set();
  }
  function quovo$user$id$on$change() {
    log(`${logPrefix}|assign__quovo$iframe_agent|quovo$user$id$on$change`);
    quovo$iframe_agent$set();
  }
  function quovo$iframe_agent$set() {
    log(`${logPrefix}|quovo$iframe_agent$set`);
    quovo$iframe_agent.co$reset();
  }
}
export function assign__quovo$cmd_agent(ctx, ...Agent$ctx$$) {
  log(`${logPrefix}|assign__quovo$cmd_agent`);
  let quovo$cmd_agent;
  const Agent$ctx = fn$cmd_Agent$ctx(ctx, {
            fn$cmd$ctx: fn$cmd$ctx,
            fn$reset$guard: quovo__fn$reset$guard,
            init: init
          }, ...Agent$ctx$$);
  assign__agent(ctx, Agent$ctx);
  return ctx;
  function init(agent$) {
    log(`${logPrefix}|assign__quovo$cmd_agent|init`);
    quovo$cmd_agent = agent$;
    const authentication_agent = ctx[ctx.quovo__authentication_agent$key];
    authentication_agent.on("change", authentication$on$change);
  }
  function fn$cmd$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|assign__quovo$cmd_agent|fn$cmd$ctx`);
    return assign(reset$ctx, {
      authentication: ctx[ctx.quovo__authentication$key],
      quovo$user$id: ctx.quovo$user$id,
      quovo$account$id: ctx.quovo$account$id,
      quovo$portfolio$id: ctx.quovo$portfolio$id
    }, ...reset$ctx$rest$$);
  }
  function authentication$on$change() {
    log(`${logPrefix}|authentication$on$change`);
    quovo$cmd_agent.co$reset();
  }
}
function quovo__fn$reset$guard(ctx) {
  log(`${logPrefix}|quovo__fn$reset$guard`);
  return !!(ctx[ctx.quovo__authentication$key]);
}
function quovo$user$id__fn$reset$guard$fn(ctx) {
  log(`${logPrefix}|quovo$user$id__fn$reset$guard$fn`);
  return () => {
    return !!(quovo__fn$reset$guard(ctx) && ctx.quovo$user$id);
  };
}
function quovo$account$id__fn$reset$guard$fn(ctx) {
  log(`${logPrefix}|quovo$account$id__fn$reset$guard$fn`);
  return () => {
    return !!(quovo__fn$reset$guard(ctx) && ctx.quovo$account$id);
  };
}
function quovo$portfolio$id__fn$reset$guard$fn(ctx) {
  log(`${logPrefix}|quovo$portfolio$id__fn$reset$guard$fn`);
  return () => {
    return !!(quovo__fn$reset$guard(ctx) && ctx.quovo$portfolio$id);
  };
}