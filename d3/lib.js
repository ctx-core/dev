import {assign,clone} from "ctx-core/object/lib";
import {change__agents} from "ctx-core/agent/lib";
import {agent__d3__dimensions} from "ctx-core/d3/agent";
import {agent__row$sources} from "ctx-core/table/agent";
import {fetch} from "ctx-core/fetch/lib";
import co from "co";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/d3/lib";
export function *load__d3__data() {
  log(`${logPrefix}|load__d3__data`);
  let ctx = assign(...arguments);
  agent__row$sources(ctx);
  const d3$csv$path = ctx.d3$csv$path;
  let row$sources = ctx.row$sources;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|load__d3__data|Promise`);
      // TODO: move to a web worker
      setTimeout(co.wrap(function *() {
        log(`${logPrefix}|load__d3__data|Promise|setTimeout`);
        if (!row$sources && d3$csv$path) {
          log(`${logPrefix}|load__d3__data|Promise|setTimeout|d3$csv$path`, d3$csv$path);
          const response$ctx = yield fetch.http$get(ctx, {
                  path: d3$csv$path
                })
              , response$text = yield response$ctx.response.text();
          row$sources = d3.csvParse(response$text);
          change__agents(ctx, {row$sources: row$sources});
        }
        // wait for agent change events to propagate
        setTimeout(() => {
          const ctx_rows = row$sources.map(load__d3__data__new__ctx_row(ctx));
          resolve(ctx_rows);
        }, 0);
      }), 0);
    });
}
function load__d3__data__new__ctx_row() {
  const ctx = assign(...arguments)
      , new__ctx_row = ctx.new__ctx_row;
  return (row$source, row_index) => {
    return new__ctx_row(ctx, {row$source: row$source, row_index: row_index});
  }
}
export function assign__d3__dimensions(ctx, ...assign$ctx$$) {
  log(`${logPrefix}|assign__d3__dimensions`);
  agent__d3__dimensions(ctx);
  change__agents(ctx, clone(...assign$ctx$$), () => {
    const d3__margin = ctx.d3__margin ||
            { top: 20, right: 20, bottom: 60, left: 100 }
        , d3__width = ctx.d3__width
        , d3__height = ctx.d3__height
        , d3__svg$content__paddingLeft = (ctx.d3__svg$content__paddingLeft == null) ?
            20 :
            ctx.d3__svg$content__paddingLeft
        , d3__svg$content__width = d3__width - d3__margin.left - d3__margin.right - d3__svg$content__paddingLeft
        , d3__svg$content__height = d3__height - d3__margin.top - d3__margin.bottom;
    assign(ctx, {
      d3__margin: d3__margin,
      d3__width: d3__width,
      d3__height: d3__height,
      d3__svg$content__paddingLeft: d3__svg$content__paddingLeft,
      d3__svg$content__width: d3__svg$content__width,
      d3__svg$content__height: d3__svg$content__height
    });
  });
  return ctx;
}
export function ensure__d3__svg() {
  log(`${logPrefix}|ensure__d3__svg`);
  let ctx = assign(...arguments);
  const d3__svg = ctx.d3__svg || d3.select(ctx.d3__selector).append("svg");
  assign(ctx, {
    d3__svg: d3__svg
  });
  return d3__svg
}
export function ensure__d3__svg$content() {
  log(`${logPrefix}|ensure__d3__svg$content`);
  let ctx = assign(...arguments);
  const d3__svg$content =
          ctx.d3__svg$content ||
          ctx.d3__svg
            .append("g")
            .classed("content", true);
  assign(ctx, {
    d3__svg$content: d3__svg$content
  });
  return d3__svg$content;
}
export function assign__d3__line() {
  log(`${logPrefix}|assign__d3__line`);
  let ctx = assign(...arguments);
  const ctx__d3__line = d3.line()
      , d3__line$x = ctx.d3__line$x
      , d3__line$y = ctx.d3__line$y;
  ctx__d3__line
    .x(d3__line$x)
    .y(d3__line$y);
  return assign(ctx, {
    d3__line: ctx__d3__line
  });
}
export function new__d3__line$column(d3__scale__fn) {
  log(`${logPrefix}|new__d3__line$column`);
  return ctx_cell => {
    const column = ctx_cell.column;
    return d3__scale__fn(column);
  };
}
export function new__d3__line$cell(d3__scale) {
  log(`${logPrefix}|new__d3__line$cell`);
  return ctx_cell => {
    const cell$value = ctx_cell.cell$value;
    return d3__scale(cell$value);
  };
}
export function assign__d3__size() {
  log(`${logPrefix}|assign__d3__size`);
  const ctx = assign(...arguments);
  ctx.d3__svg
    .attr("width", ctx.d3__width)
    .attr("height", ctx.d3__height);
  ctx.d3__svg$content
    .attr("width", ctx.d3__svg$content__width)
    .attr("height", ctx.d3__svg$content__height);
  return ctx;
}
export function transform__d3__svg$content(ctx) {
  log(`${logPrefix}|transform__d3__svg$content`);
  const d3__margin = ctx.d3__margin;
  ctx.d3__svg$content
    .attr("transform", `translate(${d3__margin.left}, ${d3__margin.top})`);
  return ctx;
}
export function ordinalValues(items, dimension) {
  log(`${logPrefix}|rangeOrdinal`);
  const items$length = items.length;
  return items.reduce((memo, item, i) => {
    memo.push(dimension * i/(items$length-1));
    return memo;
  }, [])
}