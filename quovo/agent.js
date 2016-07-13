import {assign} from "ctx-core/object/lib";
import {assign__agent,new__cmd_Agent$ctx} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/quovo/agent";
export function assign__agent__quovo$user$$(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$user$$`);
  assign__agent__quovo__cmd(ctx, {
    key: "agent__quovo$user$$",
    scope: ["quovo$user$$"],
    cmd: ["cmd__quovo$user$$"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__quovo$user$id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$user$id`);
  assign__agent(ctx, {
    key: "agent__quovo$user$id",
    scope: ["quovo$user$id"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__quovo$user(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$user`);
  let agent__quovo$user;
  assign__agent__quovo$user$id(ctx);
  assign__agent__quovo$user$$(ctx);
  assign__agent(ctx, {
    key: "agent__quovo$user",
    scope: ["quovo$user"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$user|init`);
    agent__quovo$user = agent;
    ctx.agent__quovo$user$id.on("change", quovo$user$id__on$change);
    ctx.agent__quovo$user$$.on("change", quovo$user$$__on$change);
  }
  function quovo$user$id__on$change() {
    log(`${logPrefix}|assign__agent__quovo$user|quovo$user$id__on$change`);
    agent__quovo$user$set();
  }
  function quovo$user$$__on$change() {
    log(`${logPrefix}|assign__agent__quovo$user|quovo$user$$__on$change`);
    agent__quovo$user$set();
  }
  function agent__quovo$user$set() {
    log(`${logPrefix}|assign__agent__quovo$user|agent__quovo$user$set`);
    const quovo$user$id = ctx.quovo$user$id
        , quovo$user$$ = ctx.quovo$user$$ || [];
    agent__quovo$user.set({
      quovo$user: quovo$user$$.find(
        quovo$user =>
          quovo$user.id === quovo$user$id)});
  }
}
export function assign__agent__quovo$user$account$$(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$user$account$$`);
  let agent__quovo$user$account$$;
  assign__agent__quovo$user$id(ctx);
  assign__agent__quovo__cmd(ctx, {
    key: "agent__quovo$user$account$$",
    scope: ["quovo$user$account$$"],
    cmd: ["cmd__quovo$user$account$$"],
    init: init,
    reset$guard: reset$guard__quovo$user$id__fn(ctx)
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$user$account$$|init`);
    agent__quovo$user$account$$ = agent;
    ctx.agent__quovo$user$id.on("change", quovo$user$id__on$change);
  }
  function quovo$user$id__on$change() {
   log(`${logPrefix}|assign__agent__quovo$user$account$$|quovo$user$id__on$change`);
   agent__quovo$user$account$$.co$reset();
  }
}
export function assign__agent__quovo$account$id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$account$id`);
  assign__agent(ctx, {
    key: "agent__quovo$account$id",
    scope: ["quovo$account$id"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__quovo$user$account(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$user$account`);
  let agent__quovo$user$account;
  assign__agent__quovo$user$account$$(ctx);
  assign__agent__quovo$account$id(ctx);
  assign__agent(ctx, {
    key: "agent__quovo$user$account",
    scope: ["quovo$user$account"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$user$account|init`);
    agent__quovo$user$account = agent;
    ctx.agent__quovo$user$account$$.on("change", quovo$user$account$$__on$change);
    ctx.agent__quovo$account$id.on("change", quovo$account$id__on$change);
    agent__quovo$user$account$set();
  }
  function quovo$user$account$$__on$change() {
    log(`${logPrefix}|assign__agent__quovo$user$account|quovo$account$$__on$change`);
    agent__quovo$user$account$set();
  }
  function quovo$account$id__on$change() {
    log(`${logPrefix}|assign__agent__quovo$user$account|quovo$account$id__on$change`);
    agent__quovo$user$account$set();
  }
  function agent__quovo$user$account$set() {
    log(`${logPrefix}|assign__agent__quovo$user$account|agent__quovo$user$account$set`);
    const quovo$account$id = ctx.quovo$account$id
        , quovo$user$account$$ = ctx.quovo$user$account$$
        , quovo$user$account = quovo$user$account$$ && quovo$user$account$$.find(
            quovo$account =>
              quovo$account.id === quovo$account$id);
    agent__quovo$user$account.set({
      quovo$user$account: quovo$user$account
    });
  }
}
export function assign__agent__quovo$account$portfolio$$(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$account$portfolio$$`);
  let agent__quovo$account$portfolio$$;
  assign__agent__quovo$account$id(ctx);
  assign__agent__quovo__cmd(ctx, {
    key: "agent__quovo$account$portfolio$$",
    scope: ["quovo$account$portfolio$$"],
    cmd: ["cmd__quovo$account$portfolio$$"],
    init: init,
    reset$guard: reset$guard__quovo$account$id__fn(ctx)
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$account$portfolio$$|init`);
    agent__quovo$account$portfolio$$ = agent;
    ctx.agent__quovo$account$id.on("change", quovo$account$id__on$change);
    agent__quovo$account$portfolio$$$set();
  }
  function quovo$account$id__on$change() {
    log(`${logPrefix}|assign__agent__quovo$account$portfolio$$|quovo$account$id__on$change`);
    agent__quovo$account$portfolio$$$set();
  }
  function agent__quovo$account$portfolio$$$set() {
    log(`${logPrefix}|assign__agent__quovo$account$portfolio$$|agent__quovo$account$portfolio$$$set`);
    agent__quovo$account$portfolio$$.set({
      quovo$account$portfolio$$: null
    });
    agent__quovo$account$portfolio$$.co$reset();
  }
}
export function assign__agent__quovo$portfolio$id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$portfolio$id`);
  assign__agent(ctx, {
    key: "agent__quovo$portfolio$id",
    scope: ["quovo$portfolio$id"]
  }, ...agent$ctx$$);
  return ctx;
}
export function assign__agent__quovo$portfolio(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$portfolio`);
  let agent__quovo$portfolio$id;
  assign__agent__quovo$account$portfolio$$(ctx);
  assign__agent__quovo$portfolio$id(ctx);
  assign__agent(ctx, {
    key: "agent__quovo$portfolio",
    scope: ["quovo$portfolio"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$portfolio|init`);
    agent__quovo$portfolio$id = agent;
    ctx.agent__quovo$account$portfolio$$.on("change", quovo$account$portfolio$$__on$change);
    ctx.agent__quovo$portfolio$id.on("change", quovo$portfolio$id__on$change);
  }
  function quovo$account$portfolio$$__on$change() {
    log(`${logPrefix}|assign__agent__quovo$portfolio|quovo$account$portfolio$$__on$change`);
    set__agent__quovo$portfolio$id();
  }
  function quovo$portfolio$id__on$change() {
    log(`${logPrefix}|assign__agent__quovo$portfolio|quovo$portfolio$id__on$change`);
    set__agent__quovo$portfolio$id();
  }
  function set__agent__quovo$portfolio$id() {
    log(`${logPrefix}|assign__agent__quovo$portfolio|set__agent__quovo$portfolio$id`);
    const quovo$portfolio$id = ctx.quovo$portfolio$id
        , quovo$account$portfolio$$ = ctx.quovo$account$portfolio$$
        , quovo$portfolio = quovo$account$portfolio$$ && quovo$account$portfolio$$.find(
            quovo$portfolio =>
              quovo$portfolio.id === quovo$portfolio$id);
    agent__quovo$portfolio$id.set({
      quovo$portfolio: quovo$portfolio
    });
  }
}
export function assign__agent__quovo$portfolio$history(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$portfolio$history`);
  let agent__quovo$portfolio$history;
  assign__agent__quovo$portfolio$id(ctx);
  assign__agent__quovo__cmd(ctx, {
    key: "agent__quovo$portfolio$history",
    scope: ["quovo$portfolio$history"],
    cmd: ["cmd__quovo$portfolio$history"],
    init: init,
    reset$guard: reset$guard__quovo$portfolio$id__fn(ctx)
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$portfolio$history|init`);
    agent__quovo$portfolio$history = agent;
    ctx.agent__quovo$portfolio$id.on("change", quovo$portfolio$id__on$change);
  }
  function quovo$portfolio$id__on$change() {
    log(`${logPrefix}|assign__agent__quovo$portfolio$history|quovo$portfolio$id__on$change`);
    agent__quovo$portfolio$history.co$reset();
  }
}
export function assign__agent__quovo$position$$(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$position$$`);
  let agent__quovo$position$$;
  assign__agent__quovo$account$id(ctx);
  assign__agent__quovo__cmd(ctx, {
    key: "agent__quovo$position$$",
    scope: ["quovo$position$$"],
    cmd: ["cmd__quovo$position$$"],
    init: init,
    reset$guard: reset$guard__quovo$account$id__fn(ctx)
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$position$$|init`);
    agent__quovo$position$$ = agent;
    ctx.agent__quovo$account$id.on("change", set__agent__quovo$position$$);
    set__agent__quovo$position$$();
  }
  function set__agent__quovo$position$$() {
    log(`${logPrefix}|assign__agent__quovo$position$$|quovo$account$id__on$change`);
    agent__quovo$position$$.set({quovo$position$$: null});
    agent__quovo$position$$.co$reset();
  }
}
export function assign__agent__quovo$portfolio$position$$(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$portfolio$position$$`);
  let agent__quovo$portfolio$position$$;
  assign__agent__quovo$portfolio$id(ctx);
  assign__agent__quovo$position$$(ctx);
  assign__agent(ctx, {
    key: "agent__quovo$portfolio$position$$",
    scope: ["quovo$portfolio$position$$"]
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$portfolio$position$$|init`);
    agent__quovo$portfolio$position$$ = agent;
    ctx.agent__quovo$portfolio$id.on("change", quovo$portfolio__on$change);
    ctx.agent__quovo$position$$.on("change", quovo$position$$__on$change);
    set__agent__quovo$portfolio$position$$();
  }
  function quovo$portfolio__on$change() {
    log(`${logPrefix}|assign__agent__quovo$portfolio$position$$|quovo$portfolio__on$change`);
    set__agent__quovo$portfolio$position$$();
  }
  function quovo$position$$__on$change() {
    log(`${logPrefix}|assign__agent__quovo$portfolio$position$$|quovo$position$$__on$change`);
    set__agent__quovo$portfolio$position$$();
  }
  function set__agent__quovo$portfolio$position$$() {
    log(`${logPrefix}|assign__agent__quovo$portfolio$position$$|set__agent__quovo$portfolio$position$$`);
    const quovo$portfolio = ctx.quovo$portfolio
        , quovo$portfolio$id = quovo$portfolio && quovo$portfolio.id
        , quovo$position$$ = ctx.quovo$position$$
        , quovo$portfolio$position$$ = quovo$position$$ && quovo$position$$.filter(
            quovo$position =>
              quovo$position.portfolio == quovo$portfolio$id);
    agent__quovo$portfolio$position$$.set({
      quovo$portfolio$position$$: quovo$portfolio$position$$
    });
  }
}
export function assign__agent__quovo$iframe(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo$iframe`);
  let agent__quovo$iframe;
    assign__agent__quovo$user$id(ctx);
    assign__agent__quovo__cmd(ctx, {
      key: "agent__quovo$iframe",
      scope: ["quovo$iframe$url"],
      cmd: ["cmd__quovo$user$iframe$token$post"],
      init: init,
      reset$guard: reset$guard__quovo$user$id__fn(ctx)
    }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo$iframe|init`);
    agent__quovo$iframe = agent;
    ctx.agent__quovo$user$id.on("change", quovo$user$id__on$change);
    agent__quovo$iframe$set();
  }
  function quovo$user$id__on$change() {
    log(`${logPrefix}|assign__agent__quovo$iframe|quovo$user$id__on$change`);
    agent__quovo$iframe$set();
  }
  function agent__quovo$iframe$set() {
    log(`${logPrefix}|agent__quovo$iframe$set`);
    agent__quovo$iframe.co$reset();
  }
}
export function assign__agent__quovo__cmd(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|assign__agent__quovo__cmd`);
  let agent__quovo__cmd;
  const Agent$ctx = new__cmd_Agent$ctx(ctx, {
            new__cmd$ctx: new__cmd$ctx,
            reset$guard: reset$guard__quovo,
            init: init
          }, ...agent$ctx$$);
  assign__agent(ctx, Agent$ctx);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__quovo__cmd|init`);
    agent__quovo__cmd = agent;
    const agent__authentication = ctx[ctx.quovo__agent__authentication$key];
    agent__authentication.on("change", authentication__on$change);
  }
  function new__cmd$ctx(reset$ctx, ...reset$ctx$rest$$) {
    log(`${logPrefix}|assign__agent__quovo__cmd|new__cmd$ctx`);
    return assign(reset$ctx, {
      authentication: ctx[ctx.quovo__authentication$key],
      quovo$user$id: ctx.quovo$user$id,
      quovo$account$id: ctx.quovo$account$id,
      quovo$portfolio$id: ctx.quovo$portfolio$id
    }, ...reset$ctx$rest$$);
  }
  function authentication__on$change() {
    log(`${logPrefix}|authentication__on$change`);
    agent__quovo__cmd.co$reset();
  }
}
function reset$guard__quovo(ctx) {
  log(`${logPrefix}|reset$guard__quovo`);
  return !!(ctx[ctx.quovo__authentication$key]);
}
function reset$guard__quovo$user$id__fn(ctx) {
  log(`${logPrefix}|reset$guard__quovo$user$id__fn`);
  return () => {
    return !!(reset$guard__quovo(ctx) && ctx.quovo$user$id);
  };
}
function reset$guard__quovo$account$id__fn(ctx) {
  log(`${logPrefix}|reset$guard__quovo$account$id__fn`);
  return () => {
    return !!(reset$guard__quovo(ctx) && ctx.quovo$account$id);
  };
}
function reset$guard__quovo$portfolio$id__fn(ctx) {
  log(`${logPrefix}|reset$guard__quovo$portfolio$id__fn`);
  return () => {
    return !!(reset$guard__quovo(ctx) && ctx.quovo$portfolio$id);
  };
}