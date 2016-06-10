import d3 from "d3";
import {assign,clone} from "ctx-core/object/lib";
import {assign__agent,agent$$trigger$change} from "ctx-core/agent/lib";
import {
  assign__row$source$$_agent,
  assign__ctx_row$$filter$$} from "ctx-core/table/lib";
import {xhr} from "ctx-core/xhr/lib";
import {array$sort$$key$$fn,array$map} from "ctx-core/array/lib";
import co from "co";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/d3/lib";
export function *d3$data$load() {
  log(`${logPrefix}|d3$data$load`);
  let ctx = assign(...arguments);
  assign__row$source$$_agent(ctx);
  const d3$csv$path = ctx.d3$csv$path;
  let row$source$$ = ctx.row$source$$;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|d3$data$load|Promise`);
      // TODO: move to a web worker
      setTimeout(co.wrap(function *() {
        log(`${logPrefix}|d3$data$load|Promise|setTimeout`);
        const d3$data$load$done = d3$data$load$done$fn(ctx, {resolve: resolve, reject: reject});
        if (!row$source$$ && d3$csv$path) {
          log(`${logPrefix}|d3$data$load|Promise|setTimeout|d3$csv$path`, d3$csv$path);
          const response$ctx = yield xhr.http$get({
                  path: d3$csv$path
                })
              , response$text = yield response$ctx.response.text();
          row$source$$ = d3.csv.parse(response$text);
          ctx.row$source$$_agent.set({row$source$$: row$source$$});
        }
        // wait for agent change events to propagate
        setTimeout(() => {
          const ctx_row$$ = row$source$$.map(d3$data$load__fn$ctx_row(ctx));
          d3$data$load$done(null, ctx_row$$);
        }, 0);
      }), 0);
    });
}
function d3$data$load__fn$ctx_row() {
  const ctx = assign(...arguments)
      , fn$ctx_row = ctx.fn$ctx_row;
  return (row$source, row_index) => {
    return fn$ctx_row(ctx, {row$source: row$source, row_index: row_index});
  }
}
function d3$data$load$done$fn(ctx, ...rest) {
  log(`${logPrefix}|d3$data$load$done$fn`, ctx, clone(...rest));
  const ctx$clone = clone(...rest)
      , resolve = ctx$clone.resolve
      , reject = ctx$clone.reject;
  return (error$ctx, ctx_row$$) => {
    log(`${logPrefix}|d3$data$load$done`);
    if (error$ctx) {
      log(`${logPrefix}|d3$data$load$done|error$ctx`);
      reject(error$ctx);
    } else {
      log(`${logPrefix}|d3$data$load$done|ctx_row$$`);
      resolve(ctx);
    }
  };
}
export function assign__d3$dimension$$(ctx, ...ctx$rest$$) {
  log(`${logPrefix}|assign__d3$dimension$$`);
  assign__d3$dimension$$agent(ctx);
  agent$$trigger$change(ctx, clone(...ctx$rest$$), () => {
    const d3$margin = ctx.d3$margin || { top: 50, right: 20, bottom: 60, left: 200 }
        , d3$width = ctx.d3$width
        , d3$height = ctx.d3$height
        , ctx$d3$x$padding$left = ctx.d3$x$padding$left
        , d3$x$padding$left = (ctx$d3$x$padding$left == null) ?
            20 :
            ctx$d3$x$padding$left
        , d3$x$width = d3$width - d3$margin.left - d3$margin.right - d3$x$padding$left
        , d3$y$height = d3$height - d3$margin.top - d3$margin.bottom;
    assign(ctx, {
      d3$margin: d3$margin,
      d3$width: d3$width,
      d3$height: d3$height,
      d3$x$padding$left: d3$x$padding$left,
      d3$x$width: d3$x$width,
      d3$y$height: d3$y$height
    });
  });
  return ctx;
}
export function assign__d3$dimension$$agent() {
  log(`${logPrefix}|assign__d3$dimension$$agent`);
  let ctx = assign(...arguments);
  if (!ctx.d3$dimension$$agent) {
    assign__d3$dimension$$agent$();
  }
  return ctx;
  function assign__d3$dimension$$agent$() {
    log(`${logPrefix}|assign__d3$dimension$$agent|assign__d3$dimension$$agent$`);
    assign__agent(ctx, {
      agent$keys: [
        "d3$margin",
        "d3$width",
        "d3$height",
        "d3$x$padding$left",
        "d3$x$width",
        "d3$y$height"],
      key$agent: "d3$dimension$$agent"
    });
  }
}
export function assign__d3$chart() {
  let ctx = assign(...arguments);
  log(`${logPrefix}|assign__d3$chart`);
  const d3$select = ctx.d3$select
      , d3$svg = assign__d3$size(ctx, {
          d3$svg: ctx.d3$svg || d3.select(d3$select).append("svg")
        })
      , d3$margin = ctx.d3$margin
      , d3$svg$content =
          ctx.d3$svg$content ||
          d3$svg.append("g");
  d3$svg$content
    .attr("transform", `translate(${d3$margin.left}, ${d3$margin.top})`);
  assign(ctx, {
    d3$select: d3$select,
    d3$svg: d3$svg,
    d3$svg$content: d3$svg$content});
  return ctx;
}
export function assign__d3$svg$line() {
  log(`${logPrefix}|assign__d3$svg$line`);
  let ctx = assign(...arguments);
  const d3$svg$line = d3.svg.line()
      , fn$d3$svg$line$x = ctx.fn$d3$svg$line$x
      , fn$d3$svg$line$y = ctx.fn$d3$svg$line$y;
  d3$svg$line
    .x(fn$d3$svg$line$x)
    .y(fn$d3$svg$line$y);
  return assign(ctx, {
    d3$svg$line: d3$svg$line
  });
}
export function fn$d3$scale$fn() {
  log(`${logPrefix}|fn$d3$scale$fn`);
  const ctx = clone(...arguments)
      , d3$scale$key = ctx.d3$scale$key
      , fn$d3$scale = ctx.fn$d3$scale
      , d3$scale$refresh$fn = ctx.d3$scale$refresh$fn;
  return function fn$d3$dimension() {
    const dimension$ctx = assign(...arguments);
    log(`${logPrefix}|fn$d3$dimension`, dimension$ctx);
    if (!dimension$ctx[d3$scale$key]) {
      dimension$ctx[d3$scale$key] = fn$d3$scale(dimension$ctx);
    }
    d3$scale$refresh$fn(dimension$ctx);
    return dimension$ctx[d3$scale$key];
  }
}
export function fn$d3$svg$line$column$fn(fn$d3$dimension) {
  log(`${logPrefix}|fn$d3$svg$line$column$fn`);
  return ctx_cell => {
    const column = ctx_cell.column;
    return fn$d3$dimension(column);
  };
}
export function fn$d3$svg$line$cell$fn(fn$d3$dimension) {
  log(`${logPrefix}|fn$d3$svg$line$cell$fn`);
  return ctx_cell => {
    const cell$value = ctx_cell.cell$value;
    return fn$d3$dimension(cell$value);
  };
}
export function d3$chart$render() {
  log(`${logPrefix}|d3$chart$render`);
  let ctx = assign(...arguments);
  const d3$svg = ctx.d3$svg
      , d3$svg$line = ctx.d3$svg$line
      , d3$scale$x = ctx.d3$scale$x
      , d3$scale$y = ctx.d3$scale$y
      , ctx_row$$ = ctx.ctx_row$$
      , d3$axis$x$svg = ctx.d3$axis$x$svg
      , d3$axis$y$svg = ctx.d3$axis$y$svg;
  d3$axis$x$svg$reset(ctx);
  d3$axis$y$svg$reset(ctx);
  d3$axis$x$svg.call(d3$scale$x);
  d3$axis$y$svg.call(d3$scale$y);
  const d3$svg$path$$ = d3$svg.selectAll("path")
    .data(ctx_row$$)
    .attr("d", ctx_row => d3$svg$line(ctx_row.ctx_cell$$));
  assign(ctx, {d3$svg$path$$: d3$svg$path$$});
  return ctx;
}
export function assign__d3$size() {
  log(`${logPrefix}|assign__d3$size`);
  const ctx = assign(...arguments)
      , d3$svg = ctx.d3$svg
      , d3$width = ctx.d3$width
      , d3$height = ctx.d3$height;
  return d3$svg
    .attr("width", d3$width)
    .attr("height", d3$height);
}
export function fn$d3$axis$x$bottom$fn(ctx) {
  return d3.svg.axis().scale(ctx.d3$scale$x).orient("bottom");
}
export function msci_demo__d3$axis$render() {
  log(`${logPrefix}|msci_demo__d3$axis$render`);
  let ctx = assign(...arguments);
  ctx = msci_demo__ctx_row$$render(ctx);
  ctx = msci_demo__d3$axis$x$render(ctx);
  ctx = msci_demo__d3$axis$y$render(ctx);
  return ctx;
}
export function msci_demo__ctx_row$$render() {
  log(`${logPrefix}|msci_demo__ctx_row$$render`);
  const ctx = assign(...arguments)
      , d3$svg$content = ctx.d3$svg$content
      , ctx_row$$ = ctx.ctx_row$$
      , d3$svg$line = ctx.d3$svg$line;
  ctx_row$$.forEach((ctx_row, ctx_row_index) => {
    d3$svg$content.append("path")
      .attr("data-ctx-row-index", ctx_row_index)
      .attr("data-ctx-row-name", ctx_row.name)
      .attr("d", d3$svg$line(ctx_row.ctx_cell$$));
  });
  return ctx;
}
export function msci_demo__d3$axis$x$render() {
  log(`${logPrefix}|assign__d3$chart_axis_x_render_msci_demo`);
  let ctx = assign(...arguments);
  const fn$d3$axis$x = fn$d3$axis$x$bottom$fn(ctx)
          .ticks(10)
          .tickSize(0)
          .tickFormat(d => d % 5 ? "" : d)
      , d3$svg$content = ctx.d3$svg$content
      , d3$axis$x$title$text = ctx.d3$axis$x$title$text
      , d3$axis$x$title_1$text = ctx.d3$axis$x$title_1$text;
  ctx.fn$d3$axis$x = fn$d3$axis$x;
  ctx.d3$axis$x$svg = d3$svg$content
    .append("g")
    .attr("class", "x axis");
  d3$axis$x$svg$reset(ctx);
  if (d3$axis$x$title$text) {
    ctx.d3$axis$x$title$text$svg = d3$svg$content.append("text")
      .style("text-anchor", "middle")
      .text(d3$axis$x$title$text)
      .style("font-style", "italic");
  }
  if (d3$axis$x$title_1$text) {
    ctx.d3$axis$x$title_1$text$svg = d3$svg$content.append("text")
      .style("text-anchor", "middle")
      .text(d3$axis$x$title_1$text)
      .style("font-style", "italic");
  }
  return ctx;
}
export function d3$axis$x$svg$reset() {
  log(`${logPrefix}|d3$axis$x$svg$reset`);
  const ctx = assign(...arguments);
  const fn$d3$axis$x = ctx.fn$d3$axis$x
      , d3$axis$x$svg = ctx.d3$axis$x$svg
      , d3$y$height = ctx.d3$y$height
      , d3$axis$x$translate$top = d3$y$height
      , d3$axis$x$title$text$svg = ctx.d3$axis$x$title$text$svg
      , d3$axis$x$title_1$text$svg = ctx.d3$axis$x$title_1$text$svg;
  d3$axis$x$svg.attr("transform", `translate(0, ${d3$axis$x$translate$top - 10})`);
  if (d3$axis$x$title$text$svg) {
    d3$axis$x$title$text$svg
      .attr("transform", `translate(${0}, ${d3$y$height + 30})`);
  }
  if (d3$axis$x$title_1$text$svg) {
    d3$axis$x$title_1$text$svg
      .attr("transform", `translate(${0}, ${d3$y$height + 50})`);
  }
  d3$axis$x$svg.call(fn$d3$axis$x);
  return ctx;
}
export function msci_demo__d3$axis$y$render() {
  log(`${logPrefix}|msci_demo__d3$axis$y$render`);
  let ctx = assign(...arguments);
  const column$$reverse$$ = ctx.column$$reverse$$
      , d3$svg$content = ctx.d3$svg$content
      , d3$scale$y = ctx.d3$scale$y
      , fn$d3$axis$y = d3.svg.axis().scale(d3$scale$y).orient("left")
          .ticks(column$$reverse$$.length)
          .tickSize(0)
          .tickPadding(8)
          .tickFormat(
            column => {
              const ctx_column$$map$column = ctx.ctx_column$$map$column
                  , ctx_column = ctx_column$$map$column[column]
                  , column$display = ctx_column.column$display;
              return column$display;
            });
  ctx.fn$d3$axis$y = fn$d3$axis$y;
  ctx.d3$axis$y$svg = d3$svg$content
    .append("g")
    .attr("class", "y axis");
  d3$axis$y$svg$reset(ctx);
  return ctx;
}
export function d3$axis$y$svg$reset() {
  const ctx = assign(...arguments)
      , fn$d3$axis$y = ctx.fn$d3$axis$y
      , d3$axis$y$svg = ctx.d3$axis$y$svg;
  d3$axis$y$svg.call(fn$d3$axis$y);
  return ctx;
}