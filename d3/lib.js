import {assign,clone} from "ctx-core/object/lib";
import {change__agent$$} from "ctx-core/agent/lib";
import {assign__agent__d3__dimension$$} from "ctx-core/d3/agent";
import {assign__agent__row$source$$} from "ctx-core/table/agent";
import {fetch} from "ctx-core/fetch/lib";
import co from "co";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/d3/lib";
export function *load__d3__data() {
  log(`${logPrefix}|load__d3__data`);
  let ctx = assign(...arguments);
  assign__agent__row$source$$(ctx);
  const d3$csv$path = ctx.d3$csv$path;
  let row$source$$ = ctx.row$source$$;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|load__d3__data|Promise`);
      // TODO: move to a web worker
      setTimeout(co.wrap(function *() {
        log(`${logPrefix}|load__d3__data|Promise|setTimeout`);
        const load__d3__data$done = load__d3__data$done__fn(ctx, {resolve: resolve, reject: reject});
        if (!row$source$$ && d3$csv$path) {
          log(`${logPrefix}|load__d3__data|Promise|setTimeout|d3$csv$path`, d3$csv$path);
          const response$ctx = yield fetch.http$get({
                  path: d3$csv$path
                })
              , response$text = yield response$ctx.response.text();
          row$source$$ = d3.csvParse(response$text);
          ctx.agent__row$source$$.set({row$source$$: row$source$$});
        }
        // wait for agent change events to propagate
        setTimeout(() => {
          const ctx_row$$ = row$source$$.map(load__d3__data__new__ctx_row(ctx));
          load__d3__data$done(null, ctx_row$$);
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
function load__d3__data$done__fn(ctx, ...rest) {
  log(`${logPrefix}|load__d3__data$done__fn`, ctx, clone(...rest));
  const ctx$clone = clone(...rest)
      , resolve = ctx$clone.resolve
      , reject = ctx$clone.reject;
  return (error$ctx, ctx_row$$) => {
    log(`${logPrefix}|load__d3__data$done`);
    if (error$ctx) {
      log(`${logPrefix}|load__d3__data$done|error$ctx`);
      reject(error$ctx);
    } else {
      log(`${logPrefix}|load__d3__data$done|ctx_row$$`);
      resolve(ctx);
    }
  };
}
export function assign__d3__dimension$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__d3__dimension$$`);
  assign__agent__d3__dimension$$(ctx);
  change__agent$$(ctx, clone(...ctx$rest$$), () => {
    const d3__margin = ctx.d3__margin || { top: 20, right: 20, bottom: 60, left: 100 }
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
export function keep$assign__d3__svg() {
  log(`${logPrefix}|keep$assign__d3__svg`);
  let ctx = assign(...arguments);
  const d3__svg = ctx.d3__svg || d3.select(ctx.d3__selector).append("svg");
  assign(ctx, {
    d3__svg: d3__svg
  });
  return ctx;
}
export function keep$assign__d3__svg$content() {
  log(`${logPrefix}|keep$assign__d3__svg$content`);
  let ctx = assign(...arguments);
  const d3__svg$content =
          ctx.d3__svg$content ||
          ctx.d3__svg
            .append("g")
            .classed("content", true);
  assign(ctx, {
    d3__svg$content: d3__svg$content
  });
  return ctx;
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