import {assign,clone,keys} from "ctx-core/object/lib";
import {array$clone$sort$name$$} from "ctx-core/array/lib";
import {array$map} from "ctx-core/array/lib";
import {string$case$title} from "ctx-core/string/lib";
import {assign__agent,agent$$trigger$change} from "ctx-core/agent/lib";
import {fn$ctx_row,assign__ctx_cell$$cell_rank} from  "ctx-core/table/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/table/agent";
export function assign__row$source$$_agent() {
  log(`${logPrefix}|assign__row$source$$_agent`);
  let ctx = assign(...arguments);
  assign__agent(ctx, {
    key: "row$source$$_agent",
    scope: ["row$source$$"]
  });
  return ctx;
}
export function assign__ctx_row$$_agent() {
  log(`${logPrefix}|assign__ctx_row$$_agent`);
  let ctx = assign(...arguments), ctx_row$$_agent;
  assign__row$source$$_agent(ctx);
  assign__column$$_agent(ctx);
  assign__agent(ctx, {
    key: "ctx_row$$_agent",
    scope: ["ctx_row$$"],
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__ctx_row$$_agent|init`);
    ctx_row$$_agent = agent;
    ctx.row$source$$_agent.on("change", refresh);
    refresh();
  }
  function refresh() {
    log(`${logPrefix}|assign__ctx_row$$_agent|refresh`);
    const ctx$clone = clone(...arguments)
        , fn$ctx_row$ = ctx$clone.fn$ctx_row || fn$ctx_row
        , row$source$$ = ctx.row$source$$
        , ctx_row$$ = row$source$$ && row$source$$.map(
            (row$source, row_index) =>
              fn$ctx_row$(ctx, {row$source: row$source, row_index: row_index}));
    agent$$trigger$change(ctx, assign({ctx_row$$: ctx_row$$}), () => {
      assign__ctx_cell$$cell_rank(ctx);
    });
    return ctx;
  }
}
export function assign__column$$_agent() {
  log(`${logPrefix}|assign__column$$_agent`);
  let ctx = assign(...arguments), column$$_agent;
  assign__row$source$$_agent(ctx);
  assign__agent(ctx, {
    key: "column$$_agent",
    scope: ["column$$"],
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__column$$_agent|init`);
    column$$_agent = agent;
    ctx.row$source$$_agent.on("change", refresh);
    refresh();
  }
  function refresh() {
    log(`${logPrefix}|assign__column$$_agent|refresh`);
    agent$$trigger$change(ctx, {}, () => {
      const row$source$$ = ctx.row$source$$
          , row$source$$0 = row$source$$ && row$source$$[0]
          , row$keys = row$source$$0 && keys(row$source$$0)
          , column$$exclude$$ = ctx.column$$exclude$$ || [];
      let column$$ = row$keys && row$keys$filter$$(row$keys, column$$exclude$$)
        , ctx_column$$ = column$$ && column$$map(column$$)
        , ctx_column$$map$column = ctx_column$$ && array$map(ctx_column$$, "column")
        , column$$reverse$$ = column$$ && column$$.slice(0).reverse()
        , column$$length = column$$ && column$$.length;
      return assign(ctx, {
        column$$: column$$,
        ctx_column$$: ctx_column$$,
        ctx_column$$map$column: ctx_column$$map$column,
        column$$reverse$$: column$$reverse$$,
        column$$length: column$$length
      });
    });
    return ctx;
  }
  function row$keys$filter$$(row$keys, column$$exclude$$) {
    return row$keys
      .filter(
        row$key =>
          (column$$exclude$$.indexOf(row$key) == -1));
  }
  function column$$map(column$$) {
    return column$$.map(
      column => {
        return {
          column: column,
          column$display: string$case$title(column.replace("_SCORE", "").replace(/_/g, " "))
        }; });
  }
}
export function assign__ctx_row_index$agent() {
  log(`${logPrefix}|assign__ctx_row_index$agent`);
  let ctx = assign(...arguments);
  assign__agent(ctx, {
    key: "ctx_row_index$agent",
    scope: ["ctx_row_index"]
  });
  return ctx;
}
export function assign__ctx_row$$filter$$_agent() {
  log(`${logPrefix}|assign__ctx_row$$filter$$_agent`);
  let ctx = assign(...arguments), ctx_row$$filter$$_agent;
  assign__ctx_row$$_agent(ctx);
  assign__agent(ctx, {
    key: "ctx_row$$filter$$_agent",
    scope: ["ctx_row$$filter$$", "ctx_row$$filter$$map$ctx_row_index"],
    before$set: before$set,
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__ctx_row$$filter$$_agent|init`);
    ctx_row$$filter$$_agent = agent;
    ctx.ctx_row$$_agent.on("change", ctx_row$$_agent$change);
  }
  function before$set(set$ctx) {
    log(`${logPrefix}|assign__ctx_row$$filter$$_agent|before$set`);
    const ctx_row$$ = ctx.ctx_row$$
        , ctx_row$$filter$$ = set$ctx.ctx_row$$filter$$ ||
            (ctx_row$$ && array$clone$sort$name$$(ctx_row$$)) ||
            [];
    assign(set$ctx, {
      ctx_row$$filter$$: ctx_row$$filter$$,
      ctx_row$$filter$$map$ctx_row_index: array$map(ctx_row$$filter$$, "ctx_row_index")
    });
    return set$ctx;
  }
  function ctx_row$$_agent$change() {
    log(`${logPrefix}|assign__ctx_row$$filter$$_agent|ctx_row$$_agent$change`);
    ctx_row$$filter$$_agent.set();
  }
}
export function assign__ctx_row$$filter$$ctx_row_agent() {
  log(`${logPrefix}|assign__ctx_row$$filter$$ctx_row_agent`);
  let ctx = assign(...arguments), ctx_row$$filter$$ctx_row_agent;
  assign__ctx_row_index$agent(ctx);
  assign__ctx_row$$filter$$_agent(ctx);
  assign__agent(ctx, {
    key: "ctx_row$$filter$$ctx_row_agent",
    scope: ["ctx_row$$filter$$ctx_row"],
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__ctx_row$$filter$$ctx_row_agent|init`);
    ctx_row$$filter$$ctx_row_agent = agent;
    ctx.ctx_row_index$agent.on("change", ctx_row_index$agent$on$change);
    ctx.ctx_row$$filter$$_agent.on("change", ctx_row$$filter$$$on$change);
    assign__ctx_row$$filter$$ctx_row$();
  }
  function ctx_row_index$agent$on$change() {
    log(`${logPrefix}|assign__ctx_row$$filter$$ctx_row_agent|ctx_row_index$agent$on$change`);
    assign__ctx_row$$filter$$ctx_row$();
  }
  function ctx_row$$filter$$$on$change() {
    log(`${logPrefix}|assign__ctx_row$$filter$$ctx_row_agent|ctx_row$$filter$$$on$change`);
    assign__ctx_row$$filter$$ctx_row$();
  }
  function assign__ctx_row$$filter$$ctx_row$() {
    log(`${logPrefix}|assign__ctx_row$$filter$$ctx_row_agent|assign__ctx_row$$filter$$ctx_row$`);
    const ctx_row_index = ctx.ctx_row_index
        , ctx_row$$filter$$ = ctx.ctx_row$$filter$$;
    agent$$trigger$change(ctx, {
      ctx_row$$filter$$ctx_row: (ctx_row$$filter$$ && ctx_row$$filter$$.find(
        ctx_row =>
          ctx_row.ctx_row_index == ctx_row_index))});
  }
}
export function assign__ctx_row$agent() {
  log(`${logPrefix}|assign__ctx_row$agent`);
  let ctx = assign(...arguments), ctx_row$agent;
  assign__ctx_row_index$agent(ctx);
  assign__ctx_row$$_agent(ctx);
  assign__agent(ctx, {
    key: "ctx_row$agent",
    scope: ["ctx_row"],
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__ctx_row$agent|init`);
    ctx_row$agent = agent;
    ctx.ctx_row_index$agent.on("change", ctx_row_index$agent$on$change);
    ctx.ctx_row$$_agent.on("change", ctx_row$$$on$change);
    assign__ctx_row$(ctx);
  }
  function ctx_row_index$agent$on$change(ctx) {
    log(`${logPrefix}|assign__ctx_row$agent|ctx_row_index$agent$on$change`);
    assign__ctx_row$(ctx);
  }
  function ctx_row$$$on$change(ctx) {
    log(`${logPrefix}|assign__ctx_row$agent|ctx_row$$$on$change`);
    assign__ctx_row$(ctx);
  }
  function assign__ctx_row$(ctx) {
    log(`${logPrefix}|assign__ctx_row$agent|assign__ctx_row$`);
    const ctx_row$$ = ctx.ctx_row$$
        , ctx_row_index = ctx.ctx_row_index
        , ctx_row = ctx_row$$ && ctx_row$$[ctx_row_index];
    agent$$trigger$change(ctx, {ctx_row: ctx_row});
  }
}