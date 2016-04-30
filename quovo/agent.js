import {assign,clone} from "ctx-core/object/lib";
import {error$throw} from "ctx-core/error/lib";
import {
  assign__agent,
  assign__agent_cmd} from "ctx-core/agent/lib";
import co from "co";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/agent";
export function assign__quovo$user$$_agent() {
  log(`${logPrefix}|assign__quovo$user$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$user$$_agent) assign__quovo$user$$_agent$();
  return ctx;
  function assign__quovo$user$$_agent$() {
    log(`${logPrefix}|assign__quovo$user$$_agent|assign__quovo$user$$_agent$`);
    assign__agent__quovo$cmd(ctx, {
      key$agent: "quovo$user$$_agent",
      agent$keys: ["quovo$user$$"],
      cmd: ["quovo$user$$cmd"]
    });
  }
}
export function assign__quovo$user$id_agent() {
  log(`${logPrefix}|assign__quovo$user$id_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$user$id_agent) assign__quovo$user$id_agent$();
  return ctx;
  function assign__quovo$user$id_agent$() {
    log(`${logPrefix}|assign__quovo$user$id_agent|assign__quovo$user$id_agent$`);
    assign__agent(ctx, {
      key$agent: "quovo$user$id_agent",
      agent$keys: ["quovo$user$id"]
    });
  }
}
export function assign__quovo$user_agent() {
  log(`${logPrefix}|assign__quovo$user_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$user_agent) assign__quovo$user_agent$();
  return ctx;
  function assign__quovo$user_agent$() {
    log(`${logPrefix}|assign__quovo$user_agent|assign__quovo$user_agent$`);
    assign__quovo$user$id_agent(ctx);
    assign__quovo$user$$_agent(ctx);
    assign__agent(ctx, {
      key$agent: "quovo$user_agent",
      agent$keys: ["quovo$user"]
    });
    ctx.quovo$user$id_agent.on("change", quovo$user$id_agent$on$change);
    ctx.quovo$user$$_agent.on("change", quovo$user$$_agent$on$change);
  }
  function quovo$user$id_agent$on$change() {
    log(`${logPrefix}|assign__quovo$user_agent|quovo$user$id_agent$on$change`);
    quovo$user_agent$set();
  }
  function quovo$user$$_agent$on$change() {
    log(`${logPrefix}|assign__quovo$user_agent|quovo$user$$_agent$on$change`);
    quovo$user_agent$set();
  }
  function quovo$user_agent$set() {
    log(`${logPrefix}|assign__quovo$user_agent|quovo$user_agent$set`);
    const quovo$user_agent = ctx.quovo$user_agent
        , quovo$user$id = ctx.quovo$user$id
        , quovo$user$$ = ctx.quovo$user$$ || [];
    quovo$user_agent.set({
      quovo$user: quovo$user$$.find(
        quovo$user =>
          quovo$user.id === quovo$user$id)});
  }
}
export function assign__quovo$user$account$$_agent() {
  log(`${logPrefix}|assign__quovo$user$account$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$user$account$$_agent) assign__quovo$user$account$$_agent$();
  return ctx;
  function assign__quovo$user$account$$_agent$() {
    log(`${logPrefix}|assign__quovo$user$account$$_agent|assign__quovo$user$account$$_agent$`);
    assign__quovo$user$id_agent(ctx);
    assign__agent__quovo$cmd(ctx, {
      key$agent: "quovo$user$account$$_agent",
      agent$keys: ["quovo$user$account$$"],
      cmd: ["quovo$user$account$$cmd"]
    });
    ctx.quovo$user$id_agent.on("change", quovo$user$id_agent$on$change);
  }
 function quovo$user$id_agent$on$change() {
    log(`${logPrefix}|quovo$user$id_agent$on$change`);
    ctx.quovo$user$account$$_agent.co();
  }
}
export function assign__quovo$account$id_agent() {
  log(`${logPrefix}|assign__quovo$account$id_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$account$id_agent) assign__quovo$account$id_agent$();
  return ctx;
  function assign__quovo$account$id_agent$() {
    log(`${logPrefix}|assign__quovo$account$id_agent|assign__quovo$account$id_agent$`);
    assign__agent(ctx, {
      key$agent: "quovo$account$id_agent",
      agent$keys: ["quovo$account$id"]
    });
  }
}
export function assign__quovo$user$account_agent() {
  log(`${logPrefix}|assign__quovo$user$account_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$user$account_agent) assign__quovo$user$account_agent$();
  return ctx;
  function assign__quovo$user$account_agent$() {
    log(`${logPrefix}|assign__quovo$user$account_agent|assign__quovo$user$account_agent$`);
    assign__quovo$user$account$$_agent(ctx);
    assign__quovo$account$id_agent(ctx);
    assign__agent(ctx, {
      key$agent: "quovo$user$account_agent",
      agent$keys: ["quovo$user$account"]
    });
    ctx.quovo$user$account$$_agent.on("change", quovo$user$account$$_agent$on$change);
    ctx.quovo$account$id_agent.on("change", quovo$account$id_agent$on$change);
    quovo$user$account_agent$set();
  }
  function quovo$user$account$$_agent$on$change() {
    log(`${logPrefix}|assign__quovo$user$account_agent|quovo$account$$_agent$on$change`);
    quovo$user$account_agent$set();
  }
  function quovo$account$id_agent$on$change() {
    log(`${logPrefix}|assign__quovo$user$account_agent|quovo$account$id_agent$on$change`);
    quovo$user$account_agent$set();
  }
  function quovo$user$account_agent$set() {
    log(`${logPrefix}|assign__quovo$user$account_agent|quovo$user$account_agent$set`);
    const quovo$account$id = ctx.quovo$account$id
        , quovo$user$account$$ = ctx.quovo$user$account$$
        , quovo$user$account = quovo$user$account$$ && quovo$user$account$$.find(
            quovo$account =>
              quovo$account.id === quovo$account$id);
    ctx.quovo$user$account_agent.set({
      quovo$user$account: quovo$user$account
    });
  }
}
export function assign__quovo$account$portfolio$$_agent() {
  log(`${logPrefix}|assign__quovo$account$portfolio$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$account$portfolio$$_agent) assign__quovo$account$portfolio$$_agent$();
  return ctx;
  function assign__quovo$account$portfolio$$_agent$() {
    log(`${logPrefix}|assign__quovo$account$portfolio$$_agent|assign__quovo$account$portfolio$$_agent$`);
    assign__quovo$account$id_agent(ctx);
    assign__agent__quovo$cmd(ctx, {
      key$agent: "quovo$account$portfolio$$_agent",
      agent$keys: ["quovo$account$portfolio$$"],
      cmd: ["quovo$account$portfolio$$cmd"]
    });
    ctx.quovo$account$id_agent.on("change", quovo$account$id_agent$on$change);
    quovo$account$portfolio$$_agent$set();
  }
  function quovo$account$id_agent$on$change() {
    log(`${logPrefix}|assign__quovo$account$portfolio$$_agent|quovo$account$id_agent$on$change`);
    quovo$account$portfolio$$_agent$set();
  }
  function quovo$account$portfolio$$_agent$set() {
    log(`${logPrefix}|assign__quovo$account$portfolio$$_agent|quovo$account$portfolio$$_agent$set`);
    const quovo$account$portfolio$$_agent = ctx.quovo$account$portfolio$$_agent;
    quovo$account$portfolio$$_agent.set({
      quovo$account$portfolio$$: null
    });
    if (ctx.quovo$account$id) {
      quovo$account$portfolio$$_agent.co();
    }
  }
}
export function assign__quovo$portfolio$id_agent() {
  log(`${logPrefix}|assign__quovo$portfolio$id_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$portfolio$id_agent) assign__quovo$portfolio$id_agent$();
  return ctx;
  function assign__quovo$portfolio$id_agent$() {
    log(`${logPrefix}|assign__quovo$portfolio$id_agent|assign__quovo$portfolio$id_agent$`);
    assign__agent(ctx, {
      key$agent: "quovo$portfolio$id_agent",
      agent$keys: ["quovo$portfolio$id"]
    });
  }
}
export function assign__quovo$portfolio_agent() {
  log(`${logPrefix}|assign__quovo$portfolio_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$portfolio_agent) assign__quovo$portfolio_agent$();
  return ctx;
  function assign__quovo$portfolio_agent$() {
    log(`${logPrefix}|assign__quovo$portfolio_agent|assign__quovo$portfolio_agent$`);
    assign__quovo$account$portfolio$$_agent(ctx);
    assign__quovo$portfolio$id_agent(ctx);
    assign__agent(ctx, {
      key$agent: "quovo$portfolio_agent",
      agent$keys: ["quovo$portfolio"]
    });
    ctx.quovo$account$portfolio$$_agent.on("change", quovo$account$portfolio$$_agent$on$change);
    ctx.quovo$portfolio$id_agent.on("change", quovo$portfolio$id_agent$on$change);
  }
  function quovo$account$portfolio$$_agent$on$change() {
    log(`${logPrefix}|quovo$account$portfolio$$_agent$on$change`);
    quovo$portfolio_agent$set();
  }
  function quovo$portfolio$id_agent$on$change() {
    log(`${logPrefix}|quovo$portfolio$id_agent$on$change`);
    quovo$portfolio_agent$set();
  }
  function quovo$portfolio_agent$set() {
    log(`${logPrefix}|quovo$portfolio_agent$set`);
    const quovo$portfolio$id = ctx.quovo$portfolio$id
        , quovo$account$portfolio$$ = ctx.quovo$account$portfolio$$
        , quovo$portfolio = quovo$account$portfolio$$ && quovo$account$portfolio$$.find(
            quovo$portfolio =>
              quovo$portfolio.id === quovo$portfolio$id);
    ctx.quovo$portfolio_agent.set({
      quovo$portfolio: quovo$portfolio
    });
  }
}
export function assign__quovo$portfolio$history_agent() {
  log(`${logPrefix}|assign__quovo$portfolio$history_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$portfolio$history_agent) assign__quovo$portfolio$history_agent$();
  return ctx;
  function assign__quovo$portfolio$history_agent$() {
    log(`${logPrefix}|assign__quovo$portfolio$history_agent|assign__quovo$portfolio$history_agent$`);
    assign__quovo$portfolio$id_agent(ctx);
    assign__agent__quovo$cmd(ctx, {
      key$agent: "quovo$portfolio$history_agent",
      agent$keys: ["quovo$portfolio$history"],
      cmd: ["quovo$portfolio$history$cmd"],
      co$init$fn: quovo$portfolio$history$refresh
    });
    ctx.quovo$portfolio$id_agent.on("change", quovo$portfolio$id_agent$on$change);
  }
  function quovo$portfolio$id_agent$on$change() {
    log(`${logPrefix}|assign__quovo$portfolio$history_agent|quovo$portfolio$id_agent$on$change`);
    quovo$portfolio$history$refresh();
  }
  function quovo$portfolio$history$refresh() {
    log(`${logPrefix}|assign__quovo$portfolio$history_agent|quovo$portfolio$history$refresh`);
    const quovo$portfolio$history_agent = ctx.quovo$portfolio$history_agent;
    quovo$portfolio$history_agent.set({
      quovo$portfolio$history: null
    });
    if (ctx.quovo$portfolio$id) {
      quovo$portfolio$history_agent.co();
    }
  }
}
export function assign__quovo$position$$_agent() {
  log(`${logPrefix}|assign__quovo$position$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$position$$_agent) assign__quovo$position$$_agent$();
  return ctx;
  function assign__quovo$position$$_agent$() {
    log(`${logPrefix}|assign__quovo$position$$_agent|assign__quovo$position$$_agent$`);
    assign__quovo$account$id_agent(ctx);
    assign__agent__quovo$cmd(ctx, {
      key$agent: "quovo$position$$_agent",
      agent$keys: ["quovo$position$$"],
      cmd: ["quovo$position$$cmd"]
    });
    ctx.quovo$account$id_agent.on("change", quovo$position$$_agent$set);
    quovo$position$$_agent$set();
  }
  function quovo$position$$_agent$set() {
    log(`${logPrefix}|assign__quovo$position$$_agent|quovo$account$id_agent$on$change`);
    const quovo$position$$_agent = ctx.quovo$position$$_agent;
    quovo$position$$_agent.set({quovo$position$$: null});
    if (ctx.quovo$account$id) {
      co.wrap(quovo$position$$_agent.agent$refresh)();
    }
  }
}
export function assign__quovo$portfolio$position$$_agent() {
  log(`${logPrefix}|assign__quovo$portfolio$position$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$portfolio$position$$_agent) assign__quovo$portfolio$position$$_agent$();
  return ctx;
  function assign__quovo$portfolio$position$$_agent$() {
    log(`${logPrefix}|assign__quovo$portfolio$position$$_agent|assign__quovo$portfolio$position$$_agent$`);
    assign__quovo$portfolio_agent(ctx);
    assign__quovo$position$$_agent(ctx);
    assign__agent(ctx, {
      key$agent: "quovo$portfolio$position$$_agent",
      agent$keys: ["quovo$portfolio$position$$"]
    });
    ctx.quovo$portfolio_agent.on("change", quovo$portfolio_agent$on$change);
    ctx.quovo$position$$_agent.on("change", quovo$position$$_agent$on$change);
    quovo$portfolio$position$$_agent$set();
  }
  function quovo$portfolio_agent$on$change() {
    log(`${logPrefix}|assign__quovo$portfolio$position$$_agent|quovo$portfolio_agent$on$change`);
    quovo$portfolio$position$$_agent$set();
  }
  function quovo$position$$_agent$on$change() {
    log(`${logPrefix}|assign__quovo$portfolio$position$$_agent|quovo$position$$_agent$on$change`);
    quovo$portfolio$position$$_agent$set();
  }
  function quovo$portfolio$position$$_agent$set() {
    log(`${logPrefix}|assign__quovo$portfolio$position$$_agent|quovo$portfolio$position$$_agent$set`);
    const quovo$portfolio$position$$_agent = ctx.quovo$portfolio$position$$_agent
        , quovo$portfolio = ctx.quovo$portfolio
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
export function assign__quovo$iframe_agent() {
  log(`${logPrefix}|assign__quovo$iframe_agent`);
  let ctx = assign(...arguments);
  if (!ctx.quovo$iframe_agent) assign__quovo$iframe_agent$();
  return ctx;
  function assign__quovo$iframe_agent$() {
    log(`${logPrefix}|assign__quovo$iframe_agent|assign__quovo$iframe_agent$`);
    assign__quovo$user$id_agent(ctx);
    assign__agent__quovo$cmd(ctx, {
      key$agent: "quovo$iframe_agent",
      agent$keys: ["quovo$iframe$url"],
      cmd: ["quovo$user$iframe_token$post$cmd"],
      no$agent$co$init: true
    });
    ctx.quovo$user$id_agent.on("change", quovo$user$id_agent$on$change);
    quovo$iframe_agent$set();
  }
  function quovo$user$id_agent$on$change() {
    log(`${logPrefix}|assign__quovo$iframe_agent|quovo$user$id_agent$on$change`);
    quovo$iframe_agent$set();
  }
  function quovo$iframe_agent$set() {
    log(`${logPrefix}|quovo$iframe_agent$set`);
    const quovo$iframe_agent = ctx.quovo$iframe_agent;
    if (ctx.quovo$user$id) {
      quovo$iframe_agent.co();
    } else {
      quovo$iframe_agent.set({
        quovo$iframe$url: null
      });
    }
  }
}
export function assign__agent__quovo$cmd(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__agent__quovo$cmd`);
  assign__agent_cmd(ctx, {
    fn$cmd$ctx: fn$cmd$ctx
  }, ...ctx$rest$$);
  return ctx;
  function fn$cmd$ctx(fn$cmd$ctx$ctx, ...fn$cmd$ctx$ctx$rest$$) {
    log(`${logPrefix}|assign__agent__quovo$cmd|fn$cmd$ctx`);
    return assign(fn$cmd$ctx$ctx, {
      quovo$user$id: ctx.quovo$user$id,
      quovo$account$id: ctx.quovo$account$id,
      quovo$portfolio$id: ctx.quovo$portfolio$id
    }, ...fn$cmd$ctx$ctx$rest$$);
  }
}