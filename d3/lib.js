import {assign,clone} from 'ctx-core/object/lib'
import {dimensions__d3__agent} from 'ctx-core/d3/agent'
import {table__agent,columns__agent} from 'ctx-core/table/agent'
import {fetch} from 'ctx-core/fetch/lib'
import co from 'co'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/d3/lib'
export function *load__d3__data() {
  log(`${logPrefix}|load__d3__data`)
  let ctx = assign(...arguments)
  table__agent(ctx)
  const {path__csv__d3} = ctx
  let {table} = ctx
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|load__d3__data|Promise`)
      // TODO: move to a web worker
      setTimeout(co.wrap(function *() {
        info(`${logPrefix}|load__d3__data|Promise|setTimeout`)
        if (!table && path__csv__d3) {
          log(`${logPrefix}|load__d3__data|Promise|setTimeout|path__csv__d3`, path__csv__d3)
          const response$ctx = yield fetch.http$get(ctx, {
                  path: path__csv__d3
                })
              , response$text = yield response$ctx.response.text()
          table = d3.csvParse(response$text)
          ctx.table__agent.set({table})
          // wait for agent change events to propagate
          columns__agent(ctx).one('change', () => {
            const row$ctx$$ = table.map(load__d3__data__new__row$ctx(ctx))
            resolve(row$ctx$$)
          })
        }
      }), 0)
    })
}
function load__d3__data__new__row$ctx() {
  const ctx = assign(...arguments)
      , {new__row$ctx} = ctx
  return (row$source, row_index) => {
    return new__row$ctx(ctx, {row$source, row_index})
  }
}
export function set__dimensions__d3(ctx, ...set$ctx$$) {
  log(`${logPrefix}|set__dimensions__d3`)
  dimensions__d3__agent(ctx)
  const set$ctx = clone(...set$ctx$$)
      , margin__d3 =
          set$ctx.margin__d3
          || ctx.margin__d3
          || {top: 20, right: 20, bottom: 60, left: 100 }
      , width__d3 = set$ctx.width__d3 || ctx.width__d3
      , height__d3 = set$ctx.height__d3 || ctx.height__d3
      , paddingLeft__content$svg__d3 = (
          set$ctx.paddingLeft__content$svg__d3 != null)
          ? set$ctx.paddingLeft__content$svg__d3
          : (ctx.paddingLeft__content$svg__d3 != null)
            ? ctx.paddingLeft__content$svg__d3
            : 20
      , {left, right, top, bottom} = margin__d3
      , width__content$svg__d3 = width__d3 - left - right - paddingLeft__content$svg__d3
      , height__content$svg__d3 = height__d3 - top - bottom
  ctx.dimensions__d3__agent.set({
    margin__d3,
    width__d3,
    height__d3,
    paddingLeft__content$svg__d3,
    width__content$svg__d3,
    height__content$svg__d3
  }, ...set$ctx$$)
  return ctx
}
export function ensure__svg__d3() {
  log(`${logPrefix}|ensure__svg__d3`)
  let ctx = assign(...arguments)
  const svg__d3 =
          ctx.svg__d3
          || d3.select(ctx.selector__d3).append('svg')
  assign(ctx, {
    svg__d3
  })
  return svg__d3
}
export function ensure__content$svg__d3() {
  log(`${logPrefix}|ensure__content$svg__d3`)
  let ctx = assign(...arguments)
  const content$svg__d3 =
          ctx.content$svg__d3
          || ctx.svg__d3
              .append('g')
              .classed('content', true)
  assign(ctx, {
    content$svg__d3
  })
  return content$svg__d3
}
export function assign__line__d3() {
  log(`${logPrefix}|assign__line__d3`)
  let ctx = assign(...arguments)
  const line__d3 = d3.line()
      , {x$line__d3, y$line__d3} = ctx
  line__d3
    .x(x$line__d3)
    .y(y$line__d3)
  return assign(ctx, {
    line__d3
  })
}
export function new__line__d3$column(scale__d3) {
  log(`${logPrefix}|new__line__d3$column`)
  return ctx_cell => {
    const {column} = ctx_cell
    return scale__d3(column)
  }
}
export function new__line__d3$cell(scale__d3) {
  log(`${logPrefix}|new__line__d3$cell`)
  return ctx_cell => {
    const {cell$value} = ctx_cell
    return scale__d3(cell$value)
  }
}
export function assign__size__d3() {
  log(`${logPrefix}|assign__size__d3`)
  const ctx = assign(...arguments)
      , {
          svg__d3,
          content$svg__d3,
          width__d3,
          height__d3,
          width__content$svg__d3,
          height__content$svg__d3} = ctx
  svg__d3
    .attr('width', width__d3)
    .attr('height', height__d3)
  content$svg__d3
    .attr('width', width__content$svg__d3)
    .attr('height', height__content$svg__d3)
  return ctx
}
export function transform__content$svg__d3(ctx) {
  log(`${logPrefix}|transform__content$svg__d3`)
  const {margin__d3,content$svg__d3} = ctx
      , {left,top} = margin__d3
  content$svg__d3
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