import {assign,clone} from "ctx-core/object/lib";
import {change__agent$$} from "ctx-core/agent/lib";
import {assign__agent__d3$dimension$$} from "ctx-core/d3/agent";
import {assign__agent__row$source$$} from "ctx-core/table/agent";
import {fetch} from "ctx-core/fetch/lib";
import co from "co";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/d3/lib";
export function *load__d3$data() {
  log(`${logPrefix}|load__d3$data`);
  let ctx = assign(...arguments);
  assign__agent__row$source$$(ctx);
  const d3$csv$path = ctx.d3$csv$path;
  let row$source$$ = ctx.row$source$$;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|load__d3$data|Promise`);
      // TODO: move to a web worker
      setTimeout(co.wrap(function *() {
        log(`${logPrefix}|load__d3$data|Promise|setTimeout`);
        const load__d3$data$done = load__d3$data$done__fn(ctx, {resolve: resolve, reject: reject});
        if (!row$source$$ && d3$csv$path) {
          log(`${logPrefix}|load__d3$data|Promise|setTimeout|d3$csv$path`, d3$csv$path);
          const response$ctx = yield fetch.http$get({
                  path: d3$csv$path
                })
              , response$text = yield response$ctx.response.text();
          row$source$$ = d3.csvParse(response$text);
          ctx.agent__row$source$$.set({row$source$$: row$source$$});
        }
        // wait for agent change events to propagate
        setTimeout(() => {
          const ctx_row$$ = row$source$$.map(load__d3$data__new__ctx_row(ctx));
          load__d3$data$done(null, ctx_row$$);
        }, 0);
      }), 0);
    });
}
function load__d3$data__new__ctx_row() {
  const ctx = assign(...arguments)
      , new__ctx_row = ctx.new__ctx_row;
  return (row$source, row_index) => {
    return new__ctx_row(ctx, {row$source: row$source, row_index: row_index});
  }
}
function load__d3$data$done__fn(ctx, ...rest) {
  log(`${logPrefix}|load__d3$data$done__fn`, ctx, clone(...rest));
  const ctx$clone = clone(...rest)
      , resolve = ctx$clone.resolve
      , reject = ctx$clone.reject;
  return (error$ctx, ctx_row$$) => {
    log(`${logPrefix}|load__d3$data$done`);
    if (error$ctx) {
      log(`${logPrefix}|load__d3$data$done|error$ctx`);
      reject(error$ctx);
    } else {
      log(`${logPrefix}|load__d3$data$done|ctx_row$$`);
      resolve(ctx);
    }
  };
}
export function assign__d3$dimension$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__d3$dimension$$`);
  assign__agent__d3$dimension$$(ctx);
  change__agent$$(ctx, clone(...ctx$rest$$), () => {
    const d3$margin = ctx.d3$margin || { top: 20, right: 20, bottom: 60, left: 100 }
        , d3$width = ctx.d3$width
        , d3$height = ctx.d3$height
        , d3$svg$content__paddingLeft = (ctx.d3$svg$content__paddingLeft == null) ?
            20 :
            ctx.d3$svg$content__paddingLeft
        , d3$svg$content__width = d3$width - d3$margin.left - d3$margin.right - d3$svg$content__paddingLeft
        , d3$svg$content__height = d3$height - d3$margin.top - d3$margin.bottom;
    assign(ctx, {
      d3$margin: d3$margin,
      d3$width: d3$width,
      d3$height: d3$height,
      d3$svg$content__paddingLeft: d3$svg$content__paddingLeft,
      d3$svg$content__width: d3$svg$content__width,
      d3$svg$content__height: d3$svg$content__height
    });
  });
  return ctx;
}
export function assign$ifBlank__d3$svg() {
  log(`${logPrefix}|assign$ifBlank__d3$svg`);
  let ctx = assign(...arguments);
  const d3$svg = ctx.d3$svg || d3.select(ctx.d3$selector).append("svg");
  assign(ctx, {
    d3$svg: d3$svg
  });
  return ctx;
}
export function assign$ifBlank__d3$svg$content() {
  log(`${logPrefix}|assign$ifBlank__d3$svg$content`);
  let ctx = assign(...arguments);
  const d3$svg$content =
          ctx.d3$svg$content ||
          ctx.d3$svg
            .append("g")
            .classed("content", true);
  assign(ctx, {
    d3$svg$content: d3$svg$content
  });
  return ctx;
}
export function assign__d3$line() {
  log(`${logPrefix}|assign__d3$line`);
  let ctx = assign(...arguments);
  const ctx__d3$line = d3.line()
      , d3$line$x = ctx.d3$line$x
      , d3$line$y = ctx.d3$line$y;
  ctx__d3$line
    .x(d3$line$x)
    .y(d3$line$y);
  return assign(ctx, {
    d3$line: ctx__d3$line
  });
}
export function new__d3$line$column(d3$scale__fn) {
  log(`${logPrefix}|new__d3$line$column`);
  return ctx_cell => {
    const column = ctx_cell.column;
    return d3$scale__fn(column);
  };
}
export function new__d3$line$cell(d3$scale) {
  log(`${logPrefix}|new__d3$line$cell`);
  return ctx_cell => {
    const cell$value = ctx_cell.cell$value;
    return d3$scale(cell$value);
  };
}
export function assign__d3$size () {
  log(`${logPrefix}|assign__d3$size`);
  const ctx = assign(...arguments);
  ctx.d3$svg
    .attr("width", ctx.d3$width)
    .attr("height", ctx.d3$height);
  ctx.d3$svg$content
    .attr("width", ctx.d3$svg$content__width)
    .attr("height", ctx.d3$svg$content__height);
  return ctx;
}
export function transform__d3$svg$content(ctx) {
  log(`${logPrefix}|transform__d3$svg$content`);
  const d3$margin = ctx.d3$margin;
  ctx.d3$svg$content
    .attr("transform", `translate(${d3$margin.left}, ${d3$margin.top})`);
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