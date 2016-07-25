import {assign,clone,keys} from "ctx-core/object/lib";
import {array$sort__name} from "ctx-core/array/lib";
import {array$table} from "ctx-core/array/lib";
import {string$case$title} from "ctx-core/string/lib";
import {ensure__agent,change__agents} from "ctx-core/agent/lib";
import {new__ctx_row,assign__ctx_cells$cell_rank} from  "ctx-core/table/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/table/agent";
export function ensure__agent__row$sources(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__row$sources`);
  return ensure__agent(ctx, {
    key: "agent__row$sources",
    scope: ["row$sources"]
  }, ...agent$ctx$$);
}
export function ensure__agent__ctx_rows(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__ctx_rows`);
  let agent__ctx_rows;
  ensure__agent__row$sources(ctx);
  ensure__agent__columns(ctx);
  return ensure__agent(ctx, {
    key: "agent__ctx_rows",
    scope: ["ctx_rows"],
    init: init
  }, ...agent$ctx$$);
  function init(agent) {
    log(`${logPrefix}|ensure__agent__ctx_rows|init`);
    agent__ctx_rows = agent;
    ctx.agent__row$sources.on("change", refresh);
    refresh();
  }
  function refresh() {
    log(`${logPrefix}|ensure__agent__ctx_rows|refresh`);
    const ctx$clone = clone(...arguments)
        , new__ctx_row$ = ctx$clone.new__ctx_row || new__ctx_row
        , row$sources = ctx.row$sources
        , ctx_rows = row$sources && row$sources.map(
            (row$source, row_index) =>
              new__ctx_row$(ctx, {row$source: row$source, row_index: row_index}));
    change__agents(ctx, assign({ctx_rows: ctx_rows}), () => {
      assign__ctx_cells$cell_rank(ctx);
    });
    return ctx;
  }
}
export function ensure__agent__columns(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__columns`);
  let agent__columns;
  ensure__agent__row$sources(ctx);
  return ensure__agent(ctx, {
    key: "agent__columns",
    scope: ["columns"],
    init: init
  }, ...agent$ctx$$);
  function init(agent) {
    log(`${logPrefix}|ensure__agent__columns|init`);
    agent__columns = agent;
    ctx.agent__row$sources.on("change", refresh);
    refresh();
  }
  function refresh() {
    log(`${logPrefix}|ensure__agent__columns|refresh`);
    change__agents(ctx, {}, () => {
      const row$sources = ctx.row$sources
          , row$sources0 = row$sources && row$sources[0]
          , row$keys = row$sources0 && keys(row$sources0)
          , columns$exclude = ctx.columns$exclude || [];
      let columns = row$keys && row$keys$filter$$(row$keys, columns$exclude)
        , ctx_columns = columns && columnsmap(columns)
        , table__column__ctx_column = ctx_columns && array$table(ctx_columns, "column")
        , columns$reverse = columns && columns.slice(0).reverse()
        , columns$length = columns && columns.length;
      return assign(ctx, {
        columns: columns,
        ctx_columns: ctx_columns,
        table__column__ctx_column: table__column__ctx_column,
        columns$reverse: columns$reverse,
        columns$length: columns$length
      });
    });
    return ctx;
  }
  function row$keys$filter$$(row$keys, columns$exclude) {
    return row$keys
      .filter(
        row$key =>
          (columns$exclude.indexOf(row$key) == -1));
  }
  function columnsmap(columns) {
    return columns.map(
      column => {
        return {
          column: column,
          column$display: string$case$title(column.replace("_SCORE", "").replace(/_/g, " "))
        }; });
  }
}
export function ensure__agent__ctx_row_id(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__ctx_row_id`);
  return ensure__agent(ctx, {
    key: "agent__ctx_row_id",
    scope: ["ctx_row_id"]
  }, ...agent$ctx$$);
}
export function ensure__agent__ctx_rows$filter(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__ctx_rows$filter`);
  let agent__ctx_rows$filter;
  ensure__agent__ctx_rows(ctx);
  return ensure__agent(ctx, {
    key: "agent__ctx_rows$filter",
    scope: ["ctx_rows$filter", "table__ctx_rows$filter"],
    new__set$ctx: new__set$ctx,
    init: init
  }, ...agent$ctx$$);
  function init(agent) {
    log(`${logPrefix}|ensure__agent__ctx_rows$filter|init`);
    agent__ctx_rows$filter = agent;
    ctx.agent__ctx_rows.on("change", ctx_rows__on$change);
  }
  function new__set$ctx() {
    log(`${logPrefix}|ensure__agent__ctx_rows$filter|new__set$ctx`);
    let assign$ctx = clone(...arguments);
    const ctx_rows = ctx.ctx_rows
        , ctx_rows$filter = assign$ctx.ctx_rows$filter ||
            (ctx_rows && array$sort__name(ctx_rows)) ||
            [];
    assign(assign$ctx, {
      ctx_rows$filter: ctx_rows$filter,
      table__ctx_rows$filter: array$table(ctx_rows$filter, "ctx_row_id")
    });
    return assign$ctx;
  }
  function ctx_rows__on$change() {
    log(`${logPrefix}|ensure__agent__ctx_rows$filter|ctx_rows__on$change`);
    agent__ctx_rows$filter.set();
  }
}
export function ensure__agent__ctx_rows$filter$highlight(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__ctx_rows$filter$highlight`);
  let agent__ctx_rows$filter$highlight;
  ensure__agent__ctx_row_id(ctx);
  ensure__agent__ctx_rows$filter(ctx);
  return ensure__agent(ctx, {
    key: "agent__ctx_rows$filter$highlight",
    scope: ["ctx_rows$filter$highlight"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init(agent) {
    log(`${logPrefix}|ensure__agent__ctx_rows$filter$highlight|init`);
    agent__ctx_rows$filter$highlight = agent;
    ctx.agent__ctx_row_id.on("change", ctx_row_id__on$change);
    ctx.agent__ctx_rows$filter.on("change", ctx_rows$filter__on$change);
    assign__ctx_rows$filter$highlight$();
  }
  function ctx_row_id__on$change() {
    log(`${logPrefix}|ensure__agent__ctx_rows$filter$highlight|ctx_row_id__on$change`);
    assign__ctx_rows$filter$highlight$();
  }
  function ctx_rows$filter__on$change() {
    log(`${logPrefix}|ensure__agent__ctx_rows$filter$highlight|ctx_rows$filter__on$change`);
    assign__ctx_rows$filter$highlight$();
  }
  function assign__ctx_rows$filter$highlight$() {
    log(`${logPrefix}|ensure__agent__ctx_rows$filter$highlight|assign__ctx_rows$filter$highlight$`);
    const ctx_row_id = ctx.ctx_row_id
        , ctx_rows$filter = ctx.ctx_rows$filter;
    change__agents(ctx, {
      ctx_rows$filter$highlight: (ctx_rows$filter && ctx_rows$filter.find(
        ctx_row =>
          ctx_row.ctx_row_id == ctx_row_id))});
  }
}
export function ensure__agent__ctx_row(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ensure__agent__ctx_row`);
  let agent__ctx_row;
  ensure__agent__ctx_row_id(ctx);
  ensure__agent__ctx_rows(ctx);
  return ensure__agent(ctx, {
    key: "agent__ctx_row",
    scope: ["ctx_row"],
    init: init
  }, ...agent$ctx$$);
  function init(agent) {
    log(`${logPrefix}|ensure__agent__ctx_row|init`);
    agent__ctx_row = agent;
    ctx.agent__ctx_row_id.on("change", ctx_row_id__on$change);
    ctx.agent__ctx_rows.on("change", ctx_rows__on$change);
    assign__ctx_row$(ctx);
  }
  function ctx_row_id__on$change(ctx) {
    log(`${logPrefix}|ensure__agent__ctx_row|ctx_row_id__on$change`);
    assign__ctx_row$(ctx);
  }
  function ctx_rows__on$change(ctx) {
    log(`${logPrefix}|ensure__agent__ctx_row|ctx_rows__on$change`);
    assign__ctx_row$(ctx);
  }
  function assign__ctx_row$(ctx) {
    log(`${logPrefix}|ensure__agent__ctx_row|assign__ctx_row$`);
    const ctx_rows = ctx.ctx_rows
        , ctx_row_id = ctx.ctx_row_id
        , ctx_row = ctx_rows && ctx_rows[ctx_row_id];
    change__agents(ctx, {ctx_row: ctx_row});
  }
}