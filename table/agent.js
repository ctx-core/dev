import {assign,clone,keys} from "ctx-core/object/lib";
import {array$clone$sort__name} from "ctx-core/array/lib";
import {array$table} from "ctx-core/array/lib";
import {string$case$title} from "ctx-core/string/lib";
import {assign__agent,change__agents} from "ctx-core/agent/lib";
import {new__ctx_row,assign__ctx_cell$$cell_rank} from  "ctx-core/table/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/table/agent";
export function assign__agent__row$source$$() {
  log(`${logPrefix}|assign__agent__row$source$$`);
  let ctx = assign(...arguments);
  assign__agent(ctx, {
    key: "agent__row$source$$",
    scope: ["row$source$$"]
  });
  return ctx;
}
export function assign__agent__ctx_row$$() {
  log(`${logPrefix}|assign__agent__ctx_row$$`);
  let ctx = assign(...arguments), agent__ctx_row$$;
  assign__agent__row$source$$(ctx);
  assign__agent__column$$(ctx);
  assign__agent(ctx, {
    key: "agent__ctx_row$$",
    scope: ["ctx_row$$"],
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__ctx_row$$|init`);
    agent__ctx_row$$ = agent;
    ctx.agent__row$source$$.on("change", refresh);
    refresh();
  }
  function refresh() {
    log(`${logPrefix}|assign__agent__ctx_row$$|refresh`);
    const ctx$clone = clone(...arguments)
        , new__ctx_row$ = ctx$clone.new__ctx_row || new__ctx_row
        , row$source$$ = ctx.row$source$$
        , ctx_row$$ = row$source$$ && row$source$$.map(
            (row$source, row_index) =>
              new__ctx_row$(ctx, {row$source: row$source, row_index: row_index}));
    change__agents(ctx, assign({ctx_row$$: ctx_row$$}), () => {
      assign__ctx_cell$$cell_rank(ctx);
    });
    return ctx;
  }
}
export function assign__agent__column$$() {
  log(`${logPrefix}|assign__agent__column$$`);
  let ctx = assign(...arguments), agent__column$$;
  assign__agent__row$source$$(ctx);
  assign__agent(ctx, {
    key: "agent__column$$",
    scope: ["column$$"],
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__column$$|init`);
    agent__column$$ = agent;
    ctx.agent__row$source$$.on("change", refresh);
    refresh();
  }
  function refresh() {
    log(`${logPrefix}|assign__agent__column$$|refresh`);
    change__agents(ctx, {}, () => {
      const row$source$$ = ctx.row$source$$
          , row$source$$0 = row$source$$ && row$source$$[0]
          , row$keys = row$source$$0 && keys(row$source$$0)
          , column$$exclude$$ = ctx.column$$exclude$$ || [];
      let column$$ = row$keys && row$keys$filter$$(row$keys, column$$exclude$$)
        , ctx_column$$ = column$$ && column$$map(column$$)
        , table__column__ctx_column = ctx_column$$ && array$table(ctx_column$$, "column")
        , column$$reverse$$ = column$$ && column$$.slice(0).reverse()
        , column$$length = column$$ && column$$.length;
      return assign(ctx, {
        column$$: column$$,
        ctx_column$$: ctx_column$$,
        table__column__ctx_column: table__column__ctx_column,
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
export function assign__agent__ctx_row_id() {
  log(`${logPrefix}|assign__agent__ctx_row_id`);
  let ctx = assign(...arguments);
  assign__agent(ctx, {
    key: "agent__ctx_row_id",
    scope: ["ctx_row_id"]
  });
  return ctx;
}
export function assign__agent__ctx_row$$filter$$() {
  log(`${logPrefix}|assign__agent__ctx_row$$filter$$`);
  let ctx = assign(...arguments), agent__ctx_row$$filter$$;
  assign__agent__ctx_row$$(ctx);
  assign__agent(ctx, {
    key: "agent__ctx_row$$filter$$",
    scope: ["ctx_row$$filter$$", "ctx_row$$filter$$map"],
    before$set: before$set,
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__ctx_row$$filter$$|init`);
    agent__ctx_row$$filter$$ = agent;
    ctx.agent__ctx_row$$.on("change", ctx_row$$__on$change);
  }
  function before$set(set$ctx) {
    log(`${logPrefix}|assign__agent__ctx_row$$filter$$|before$set`);
    const ctx_row$$ = ctx.ctx_row$$
        , ctx_row$$filter$$ = set$ctx.ctx_row$$filter$$ ||
            (ctx_row$$ && array$clone$sort__name(ctx_row$$)) ||
            [];
    assign(set$ctx, {
      ctx_row$$filter$$: ctx_row$$filter$$,
      ctx_row$$filter$$map: array$table(ctx_row$$filter$$, "ctx_row_id")
    });
    return set$ctx;
  }
  function ctx_row$$__on$change() {
    log(`${logPrefix}|assign__agent__ctx_row$$filter$$|ctx_row$$__on$change`);
    agent__ctx_row$$filter$$.set();
  }
}
export function assign__agent__ctx_row$$filter$$highlight() {
  log(`${logPrefix}|assign__agent__ctx_row$$filter$$highlight`);
  let ctx = assign(...arguments)
    , agent__ctx_row$$filter$$highlight;
  assign__agent__ctx_row_id(ctx);
  assign__agent__ctx_row$$filter$$(ctx);
  assign__agent(ctx, {
    key: "agent__ctx_row$$filter$$highlight",
    scope: ["ctx_row$$filter$$highlight"],
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__ctx_row$$filter$$highlight|init`);
    agent__ctx_row$$filter$$highlight = agent;
    ctx.agent__ctx_row_id.on("change", ctx_row_id__on$change);
    ctx.agent__ctx_row$$filter$$.on("change", ctx_row$$filter$$__on$change);
    assign__ctx_row$$filter$$highlight$();
  }
  function ctx_row_id__on$change() {
    log(`${logPrefix}|assign__agent__ctx_row$$filter$$highlight|ctx_row_id__on$change`);
    assign__ctx_row$$filter$$highlight$();
  }
  function ctx_row$$filter$$__on$change() {
    log(`${logPrefix}|assign__agent__ctx_row$$filter$$highlight|ctx_row$$filter$$__on$change`);
    assign__ctx_row$$filter$$highlight$();
  }
  function assign__ctx_row$$filter$$highlight$() {
    log(`${logPrefix}|assign__agent__ctx_row$$filter$$highlight|assign__ctx_row$$filter$$highlight$`);
    const ctx_row_id = ctx.ctx_row_id
        , ctx_row$$filter$$ = ctx.ctx_row$$filter$$;
    change__agents(ctx, {
      ctx_row$$filter$$highlight: (ctx_row$$filter$$ && ctx_row$$filter$$.find(
        ctx_row =>
          ctx_row.ctx_row_id == ctx_row_id))});
  }
}
export function assign__agent__ctx_row() {
  log(`${logPrefix}|assign__agent__ctx_row`);
  let ctx = assign(...arguments), agent__ctx_row;
  assign__agent__ctx_row_id(ctx);
  assign__agent__ctx_row$$(ctx);
  assign__agent(ctx, {
    key: "agent__ctx_row",
    scope: ["ctx_row"],
    init: init
  });
  return ctx;
  function init(agent) {
    log(`${logPrefix}|assign__agent__ctx_row|init`);
    agent__ctx_row = agent;
    ctx.agent__ctx_row_id.on("change", ctx_row_id__on$change);
    ctx.agent__ctx_row$$.on("change", ctx_row$$__on$change);
    assign__ctx_row$(ctx);
  }
  function ctx_row_id__on$change(ctx) {
    log(`${logPrefix}|assign__agent__ctx_row|ctx_row_id__on$change`);
    assign__ctx_row$(ctx);
  }
  function ctx_row$$__on$change(ctx) {
    log(`${logPrefix}|assign__agent__ctx_row|ctx_row$$__on$change`);
    assign__ctx_row$(ctx);
  }
  function assign__ctx_row$(ctx) {
    log(`${logPrefix}|assign__agent__ctx_row|assign__ctx_row$`);
    const ctx_row$$ = ctx.ctx_row$$
        , ctx_row_id = ctx.ctx_row_id
        , ctx_row = ctx_row$$ && ctx_row$$[ctx_row_id];
    change__agents(ctx, {ctx_row: ctx_row});
  }
}