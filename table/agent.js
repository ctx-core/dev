import {assign,clone,keys} from "ctx-core/object/lib";
import {array$sort__name} from "ctx-core/array/lib";
import {throw__error} from "ctx-core/error/lib";
import deepEqual from "deep-equal";
import {array$table} from "ctx-core/array/lib";
import {titleCase__string} from "ctx-core/string/lib";
import {ensure__agent} from "ctx-core/agent/lib";
import {
  new__ctx_row,
  each__decorate__ctx_rows} from  "ctx-core/table/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/table/agent";
export function row$sources__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|row$sources__agent`);
  return ensure__agent(ctx, {
    key: "row$sources__agent",
    scope: ["row$sources"]
  }, ...agent$ctx$$);
}
export function ctx_rows__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ctx_rows__agent`);
  let agent;
  row$sources__agent(ctx);
  columns__agent(ctx);
  return ensure__agent(ctx, {
    key: "ctx_rows__agent",
    scope: ["ctx_rows", "ctx_rows$sort__name"],
    init: init,
    new__set$ctx: new__set$ctx
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|ctx_rows__agent|init`);
    agent = this;
    ctx.row$sources__agent.on("change", refresh);
    refresh();
  }
  function new__set$ctx() {
    let set$ctx = clone(...arguments);
    log(`${logPrefix}|ctx_rows__agent|new__set$ctx`, set$ctx);
    const ctx_rows = set$ctx.ctx_rows;
    assign(set$ctx, {
      ctx_rows$sort__name: ctx_rows && array$sort__name(ctx_rows)
    });
    return set$ctx;
  }
  function refresh() {
    log(`${logPrefix}|ctx_rows__agent|refresh`);
    const ctx$clone = clone(...arguments)
        , new__ctx_row$ = ctx$clone.new__ctx_row || new__ctx_row
        , row$sources = ctx.row$sources
        , ctx_rows = row$sources && row$sources.map(
            (row$source, row_index) =>
              new__ctx_row$(ctx, {row$source: row$source, row_index: row_index}));
    each__decorate__ctx_rows(ctx, {
      ctx_rows: ctx_rows
    });
    agent.set({ctx_rows: ctx_rows});
    return ctx;
  }
}
export function columns__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|columns__agent`);
  let agent;
  row$sources__agent(ctx);
  return ensure__agent(ctx, {
    key: "columns__agent",
    scope: [
      "columns",
      "ctx_columns",
      "table__column__ctx_column",
      "columns$reverse",
      "columns$length"],
    init: init
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|columns__agent|init`);
    agent = this;
    ctx.row$sources__agent.on("change", refresh);
    refresh();
  }
  function refresh() {
    log(`${logPrefix}|columns__agent|refresh`);
    const row$sources = ctx.row$sources
        , row$sources0 = row$sources && row$sources[0]
        , row$keys = row$sources0 && keys(row$sources0)
        , columns$exclude = ctx.columns$exclude || [];
    let columns = row$keys && filter__row$keys(row$keys, columns$exclude)
      , ctx_columns = columns && map__columns(columns)
      , table__column__ctx_column = ctx_columns && array$table(ctx_columns, "column")
      , columns$reverse = columns && columns.slice(0).reverse()
      , columns$length = columns && columns.length;
    return agent.set({
      columns: columns,
      ctx_columns: ctx_columns,
      table__column__ctx_column: table__column__ctx_column,
      columns$reverse: columns$reverse,
      columns$length: columns$length
    });
    return ctx;
  }
  function filter__row$keys(row$keys, columns$exclude) {
    return row$keys
      .filter(
        row$key =>
          (columns$exclude.indexOf(row$key) == -1));
  }
  function map__columns(columns) {
    return columns.map(
      column => {
        return {
          column: column,
          column$display: titleCase__string(column.replace("_SCORE", "").replace(/_/g, " "))
        }; });
  }
}
export function ctx_row_id__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ctx_row_id__agent`);
  return ensure__agent(ctx, {
    key: "ctx_row_id__agent",
    scope: ["ctx_row_id"]
  }, ...agent$ctx$$);
}
export function ctx_rows$filter__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ctx_rows$filter__agent`);
  let agent;
  ctx_rows__agent(ctx);
  return ensure__agent(ctx, {
    key: "ctx_rows$filter__agent",
    scope: ["ctx_rows$filter", "table__ctx_rows$filter"],
    new__set$ctx: new__set$ctx,
    init: init
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|ctx_rows$filter__agent|init`);
    agent = this;
    ctx.ctx_rows__agent.on("change", on$change__ctx_rows);
  }
  function new__set$ctx() {
    log(`${logPrefix}|ctx_rows$filter__agent|new__set$ctx`);
    const set$ctx = clone(...arguments)
        , ctx_rows = ctx.ctx_rows
        , ctx_rows$filter__inputs = set$ctx.ctx_rows$filter__inputs
            || ctx.ctx_rows$filter__inputs
        , ctx_rows$filter$ = ctx.ctx_rows$filter;
    // Guard against duplicate work
    if (
      ctx_rows$filter$
        && ctx_rows$filter$.ctx_rows === ctx_rows
        && deepEqual(
          ctx_rows$filter$.ctx_rows$filter__inputs,
          ctx_rows$filter__inputs)) {
      return {};
    }
    log(`${logPrefix}|ctx_rows$filter__agent|new__set$ctx|do`);
    const ctx_rows$filter = set$ctx.ctx_rows$filter
          || (ctx_rows$filter__inputs && ctx_rows$filter__inputs.filter())
          || [];
    // Guard against duplicate work
    assign(ctx_rows$filter, {
      ctx_rows: ctx_rows,
      ctx_rows$filter__inputs: ctx_rows$filter__inputs
    });
    assign(set$ctx, {
      ctx_rows$filter: ctx_rows$filter,
      ctx_rows$filter__inputs: ctx_rows$filter__inputs,
      table__ctx_rows$filter: array$table(ctx_rows$filter, "ctx_row_id")
    });
    return set$ctx;
  }
  function on$change__ctx_rows() {
    log(`${logPrefix}|ctx_rows$filter__agent|on$change__ctx_rows`);
    agent.reset__co();
  }
}
export function ctx_rows$filter$highlight__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ctx_rows$filter$highlight__agent`);
  let agent;
  ctx_row_id__agent(ctx);
  ctx_rows$filter__agent(ctx);
  return ensure__agent(ctx, {
    key: "ctx_rows$filter$highlight__agent",
    scope: ["ctx_rows$filter$highlight"],
    init: init
  }, ...agent$ctx$$);
  return ctx;
  function init() {
    log(`${logPrefix}|ctx_rows$filter$highlight__agent|init`);
    agent = this;
    ctx.ctx_row_id__agent.on("change", on$change__ctx_row_id);
    ctx.ctx_rows$filter__agent.on("change", on$change__ctx_rows$filter);
    assign__ctx_rows$filter$highlight$();
  }
  function on$change__ctx_row_id() {
    log(`${logPrefix}|ctx_rows$filter$highlight__agent|on$change__ctx_row_id`);
    assign__ctx_rows$filter$highlight$();
  }
  function on$change__ctx_rows$filter() {
    log(`${logPrefix}|ctx_rows$filter$highlight__agent|on$change__ctx_rows$filter`);
    assign__ctx_rows$filter$highlight$();
  }
  function assign__ctx_rows$filter$highlight$() {
    log(`${logPrefix}|ctx_rows$filter$highlight__agent|assign__ctx_rows$filter$highlight$`);
    const ctx_row_id = ctx.ctx_row_id
        , ctx_rows$filter = ctx.ctx_rows$filter;
    agent.set({
      ctx_rows$filter$highlight: (ctx_rows$filter && ctx_rows$filter.find(
        ctx_row =>
          ctx_row.ctx_row_id == ctx_row_id))});
  }
}
export function ctx_row__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|ctx_row__agent`);
  let agent;
  ctx_row_id__agent(ctx);
  ctx_rows__agent(ctx);
  return ensure__agent(ctx, {
    key: "ctx_row__agent",
    scope: ["ctx_row"],
    init: init
  }, ...agent$ctx$$);
  function init() {
    log(`${logPrefix}|ctx_row__agent|init`);
    agent = this;
    ctx.ctx_row_id__agent.on("change", on$change__ctx_row_id);
    ctx.ctx_rows__agent.on("change", on$change__ctx_rows);
    set__ctx_row();
  }
  function on$change__ctx_row_id() {
    log(`${logPrefix}|ctx_row__agent|on$change__ctx_row_id`, ctx.ctx_row_id);
    set__ctx_row();
  }
  function on$change__ctx_rows() {
    log(`${logPrefix}|ctx_row__agent|on$change__ctx_rows`);
    set__ctx_row();
  }
  function set__ctx_row() {
    log(`${logPrefix}|ctx_row__agent|assign__ctx_row$`);
    const ctx_rows = ctx.ctx_rows
        , ctx_row_id = ctx.ctx_row_id
        , ctx_row = ctx_rows && ctx_rows[ctx_row_id];
    agent.set({
      ctx_row: ctx_row
    });
  }
}