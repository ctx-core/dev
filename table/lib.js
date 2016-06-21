import {assign,clone,keys} from "ctx-core/object/lib";
import {string$case$title} from "ctx-core/string/lib";
import {array$clone$sort$name$$} from "ctx-core/array/lib";
import {array$map,array$sort$$fn,array$sort$$binary$indexOf,array$sort$$key$$fn} from "ctx-core/array/lib";
import {assign__agent,agent$$trigger$change} from "ctx-core/agent/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/table/lib";
export function assign__row$source$$_agent() {
  log(`${logPrefix}|assign__row$source$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.row$source$$_agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__row$source$$_agent|init`);
    assign__agent(ctx, {
      key: "row$source$$_agent",
      scope: ["row$source$$"]
    });
  }
}
export function assign__ctx_row$$_agent() {
  log(`${logPrefix}|assign__ctx_row$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.ctx_row$$_agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__ctx_row$$_agent|init`);
    assign__row$source$$_agent(ctx);
    assign__column$$_agent(ctx);
    assign__agent(ctx, {
      key: "ctx_row$$_agent",
      scope: ["ctx_row$$"]
    });
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
  let ctx = assign(...arguments);
  if (!ctx.column$$_agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__column$$_agent|init`);
    assign__row$source$$_agent(ctx);
    assign__agent(ctx, {
      key: "column$$_agent",
      scope: ["column$$"]
    });
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
export function fn$ctx_row(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|fn$ctx_row`);
  const ctx$clone = clone(ctx, ...ctx$rest$$)
      , row$source = ctx$clone.row$source
      , ctx_column$$ = ctx$clone.ctx_column$$
      , column$$reverse$$ = ctx$clone.column$$reverse$$ || (ctx_column$$ && ctx_column$$.reverse())
      , row = column$$reverse$$ && column$$reverse$$.reduce((memo, column) => {
          const cell$value = parseFloat(memo[column]);
          memo[column] = isNaN(cell$value) ? null : cell$value;
          return memo;
        }, row$source)
      , row_index = ctx$clone.row_index
      , ctx_cell$$ = ctx_column$$ && ctx_column$$.map(
          ctx_column => {
            const column = ctx_column.column
                , cell$value = row[column]
                , column$display = ctx_column.column$display;
            return {
              column: column,
              column$display: column$display,
              row: row,
              cell$value: cell$value
            };})
      , ctx_cell$$map$column = ctx_cell$$ && array$map(ctx_cell$$, "column");
  return {
    row: row,
    ctx_row_index: row_index,
    ctx_cell$$: ctx_cell$$,
    ctx_cell$$map$column: ctx_cell$$map$column
  };
}
export function assign__ctx_row_index$agent() {
  log(`${logPrefix}|assign__ctx_row_index$agent`);
  let ctx = assign(...arguments);
  if (!ctx.ctx_row_index$agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__ctx_row_index$agent|init`);
    assign__agent(ctx, {
      key: "ctx_row_index$agent",
      scope: ["ctx_row_index"]
    });
  }
}
export function assign__ctx_row$$filter$$_agent() {
  log(`${logPrefix}|assign__ctx_row$$filter$$_agent`);
  let ctx = assign(...arguments);
  if (!ctx.ctx_row$$filter$$_agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__ctx_row$$filter$$_agent|init`);
    assign__ctx_row$$_agent(ctx);
    assign__agent(ctx, {
      key: "ctx_row$$filter$$_agent",
      scope: ["ctx_row$$filter$$", "ctx_row$$filter$$map$ctx_row_index"],
      before$set: before$set
    });
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
    ctx.ctx_row$$filter$$_agent.set();
  }
}
export function assign__ctx_row$$filter$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__ctx_row$$filter$$`);
  const ctx$rest = clone(...ctx$rest$$)
      , ctx_row$$ = ctx.ctx_row$$
      , ctx_row$$filter$$ = ctx$rest.ctx_row$$filter$$ ||
          (ctx_row$$ && array$clone$sort$name$$(ctx_row$$)) ||
          [];
  assign(ctx, ctx$rest, {
    ctx_row$$filter$$: ctx_row$$filter$$,
    ctx_row$$filter$$map$ctx_row_index: array$map(ctx_row$$filter$$, "ctx_row_index")
  });
  return ctx;
}
export function assign__ctx_row$$filter$$ctx_row(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__ctx_row$$filter$$ctx_row`);
  assign__ctx_row$$filter$$ctx_row_agent(ctx);
  agent$$trigger$change(ctx, clone(...ctx$rest$$));
  return ctx;
}
export function assign__ctx_row$$filter$$ctx_row_agent() {
  log(`${logPrefix}|assign__ctx_row$$filter$$ctx_row_agent`);
  let ctx = assign(...arguments);
  if (!ctx.ctx_row$$filter$$ctx_row_agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__ctx_row$$filter$$ctx_row_agent|init`);
    assign__agent(ctx, {
      key: "ctx_row$$filter$$ctx_row_agent",
      scope: ["ctx_row$$filter$$ctx_row"]
    });
    assign__ctx_row_index$agent(ctx);
    assign__ctx_row$$filter$$_agent(ctx);
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
    assign__ctx_row$$filter$$ctx_row(ctx, {
      ctx_row$$filter$$ctx_row: (ctx_row$$filter$$ && ctx_row$$filter$$.find(
        ctx_row =>
          ctx_row.ctx_row_index == ctx_row_index))});
  }
}
export function assign__ctx_row(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__ctx_row`);
  assign__ctx_row$agent(ctx);
  agent$$trigger$change(ctx, ...ctx$rest$$);
  return ctx;
}
export function assign__ctx_row$agent() {
  log(`${logPrefix}|assign__ctx_row$agent`);
  let ctx = assign(...arguments);
  if (!ctx.ctx_row$agent) init();
  return ctx;
  function init() {
    log(`${logPrefix}|assign__ctx_row$agent|init`);
    assign__ctx_row_index$agent(ctx);
    assign__ctx_row$$_agent(ctx);
    assign__agent(ctx, {
      key: "ctx_row$agent",
      scope: ["ctx_row"]
    });
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
        , ctx_row_index = ctx.ctx_row_index;
    if (ctx_row$$) assign__ctx_row(ctx, {ctx_row: ctx_row$$[ctx_row_index]});
  }
}
// TODO: refactor
export function assign__ctx_cell$$cell_rank() {
  log(`${logPrefix}|assign__ctx_cell$$cell_rank`);
  const ctx = assign(...arguments)
      , ctx_row$$ = ctx.ctx_row$$
      , column$$ = ctx.column$$
      , ctx_cell$$map$column$$__ctx_row$$map$column = fn__ctx_cell$$map$column$$__ctx_row$$map$column()
      , ctx_cell$$__ctx_row$$sort$$map$column = fn$ctx_cell$$__ctx_row$$sort$$map$column()
      , array$sort = array$sort$$fn();
  ctx_row$$forEach$fn(ctx_row$$);
  function fn__ctx_cell$$map$column$$__ctx_row$$map$column() {
    return column$$ && column$$.reduce(
      (memo, column) => {
        memo[column] = ctx_row$$.map(
          ctx_row =>
            ctx_row.ctx_cell$$map$column[column]);
        return memo; }, {})
  }
  function fn$ctx_cell$$__ctx_row$$sort$$map$column() {
    return column$$ && column$$.reduce(
      (memo, column) => {
        const ctx_cell$$map$column$$ = ctx_cell$$map$column$$__ctx_row$$map$column[column];
        memo[column] = ctx_cell$$map$column$$
          .sort(array$sort$$key$$fn("cell$value"));
        return memo; }, {})
  }
  function ctx_row$$forEach$fn(ctx_row$$) {
    if (ctx_row$$) {
      ctx_row$$.forEach(
        ctx_row =>
          ctx_cell$$forEach(ctx_row.ctx_cell$$));
    }
  }
  function ctx_cell$$forEach(ctx_cell$$) {
    if (ctx_cell$$) {
      ctx_cell$$.forEach(
        ctx_cell => {
          const column = ctx_cell.column
              , cell$value = ctx_cell.cell$value
              , ctx_cell$$ = ctx_cell$$__ctx_row$$sort$$map$column[column]
              , cell$rank = ctx_cell$$rank(ctx_cell$$, cell$value);
          ctx_cell.cell$rank = cell$rank;
        }
      );
    }
  }
  function ctx_cell$$rank(ctx_cell$$, cell$value) {
    return ctx_cell$$.length - array$sort$$binary$indexOf(
      ctx_cell$$,
      (ctx_cell_1, ctx_cell_1$index) => {
        const ctx_cell_1$cell_value = ctx_cell_1.cell$value
            , array$sort_1 = array$sort(cell$value, ctx_cell_1$cell_value);
        if (array$sort_1) {
          return array$sort_1;
        } else {
          const ctx_cell_1$next = ctx_cell$$[ctx_cell_1$index + 1];
          if (!ctx_cell_1$next)
            return 0;
          const ctx_cell_1$next$cell_value = ctx_cell_1$next.cell$value;
          if (ctx_cell_1$cell_value != ctx_cell_1$next$cell_value)
            return 0;
          return 1;
        } })
  }
}
export function ctx_row$$filter$$not_contains$ctx_row_index() {
  log(`${logPrefix}|ctx_row$$filter$$not_contains$ctx_row_index`);
  const ctx = assign(...arguments)
      , ctx_row_index = ctx.ctx_row_index
      , ctx_row = ctx.ctx_row
      , ctx_row$$filter$$ = ctx.ctx_row$$filter$$
      , ctx_row$$filter$$find$ctx_row_index = ctx_row$$filter$$ &&
          ctx_row$$filter$$.find(
            ctx_row =>
              ctx_row.ctx_row_index == ctx_row_index);
  return ctx_row_index != null &&
    ctx_row != null &&
    ctx_row$$filter$$find$ctx_row_index == null;
}