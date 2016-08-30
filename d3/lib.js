import {assign,clone} from 'ctx-core/object/lib'
import {d3__dimensions__agent} from 'ctx-core/d3/agent'
import {row$sources__agent,columns__agent} from 'ctx-core/table/agent'
import {fetch} from 'ctx-core/fetch/lib'
import co from 'co'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/d3/lib'
export function *load__d3__data() {
  log(`${logPrefix}|load__d3__data`)
  let ctx = assign(...arguments)
  row$sources__agent(ctx)
  const d3$csv_path = ctx.d3$csv_path
  let row$sources = ctx.row$sources
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|load__d3__data|Promise`)
      // TODO: move to a web worker
      setTimeout(co.wrap(function *() {
        info(`${logPrefix}|load__d3__data|Promise|setTimeout`)
        if (!row$sources && d3$csv_path) {
          log(`${logPrefix}|load__d3__data|Promise|setTimeout|d3$csv_path`, d3$csv_path)
          const response$ctx = yield fetch.http$get(ctx, {
                  path: d3$csv_path
                })
              , response$text = yield response$ctx.response.text()
          row$sources = d3.csvParse(response$text)
          ctx.row$sources__agent.set({row$sources})
          // wait for agent change events to propagate
          columns__agent(ctx).one('change', () => {
            const ctx_rows = row$sources.map(load__d3__data__new__ctx_row(ctx))
            resolve(ctx_rows)
          })
        }
      }), 0)
    })
}
function load__d3__data__new__ctx_row() {
  const ctx = assign(...arguments)
      , new__ctx_row = ctx.new__ctx_row
  return (row$source, row_index) => {
    return new__ctx_row(ctx, {row$source, row_index})
  }
}
export function set__d3__dimensions(ctx, ...set$ctx$$) {
  log(`${logPrefix}|set__d3__dimensions`)
  d3__dimensions__agent(ctx)
  const set$ctx = clone(...set$ctx$$)
      , d3__margin = set$ctx.d3__margin
        || ctx.d3__margin
        || {top: 20, right: 20, bottom: 60, left: 100 }
      , d3__width = set$ctx.d3__width || ctx.d3__width
      , d3__height = set$ctx.d3__height || ctx.d3__height
      , d3__svg$content__paddingLeft = (
          set$ctx.d3__svg$content__paddingLeft != null)
            ? set$ctx.d3__svg$content__paddingLeft
            : (ctx.d3__svg$content__paddingLeft != null)
              ? ctx.d3__svg$content__paddingLeft
              : 20
      , d3__svg$content__width = d3__width - d3__margin.left - d3__margin.right - d3__svg$content__paddingLeft
      , d3__svg$content__height = d3__height - d3__margin.top - d3__margin.bottom
  ctx.d3__dimensions__agent.set({
    d3__margin,
    d3__width,
    d3__height,
    d3__svg$content__paddingLeft,
    d3__svg$content__width,
    d3__svg$content__height
  }, ...set$ctx$$)
  return ctx
}
export function ensure__d3__svg() {
  log(`${logPrefix}|ensure__d3__svg`)
  let ctx = assign(...arguments)
  const d3__svg = ctx.d3__svg || d3.select(ctx.d3__selector).append('svg')
  assign(ctx, {
    d3__svg
  })
  return d3__svg
}
export function ensure__d3__svg$content() {
  log(`${logPrefix}|ensure__d3__svg$content`)
  let ctx = assign(...arguments)
  const d3__svg$content = ctx.d3__svg$content
        || ctx.d3__svg
            .append('g')
            .classed('content', true)
  assign(ctx, {
    d3__svg$content
  })
  return d3__svg$content
}
export function assign__d3__line() {
  log(`${logPrefix}|assign__d3__line`)
  let ctx = assign(...arguments)
  const d3__line = d3.line()
      , {d3__line$x, d3__line$y} = ctx
  d3__line
    .x(d3__line$x)
    .y(d3__line$y)
  return assign(ctx, {
    d3__line
  })
}
export function new__d3__line$column(d3__scale__fn) {
  log(`${logPrefix}|new__d3__line$column`)
  return ctx_cell => {
    const {column} = ctx_cell
    return d3__scale__fn(column)
  }
}
export function new__d3__line$cell(d3__scale) {
  log(`${logPrefix}|new__d3__line$cell`)
  return ctx_cell => {
    const {cell$value} = ctx_cell
    return d3__scale(cell$value)
  }
}
export function assign__d3__size() {
  log(`${logPrefix}|assign__d3__size`)
  const ctx = assign(...arguments)
      , {
          d3__svg,
          d3__svg$content,
          d3__width,
          d3__height,
          d3__svg$content__width,
          d3__svg$content__height} = ctx
  d3__svg
    .attr('width', d3__width)
    .attr('height', d3__height)
  d3__svg$content
    .attr('width', d3__svg$content__width)
    .attr('height', d3__svg$content__height)
  return ctx
}
export function transform__d3__svg$content(ctx) {
  log(`${logPrefix}|transform__d3__svg$content`)
  const {d3__margin,d3__svg$content} = ctx
      , {left,top} = d3__margin
  d3__svg$content
    .attr('transform', `translate(${left}, ${top})`)
  return ctx
}
export function ordinalValues(items, dimension) {
  log(`${logPrefix}|rangeOrdinal`)
  const {length} = items
  return items.reduce((memo, item, i) => {
    memo.push(dimension * i/(length-1))
    return memo
  }, [])
}