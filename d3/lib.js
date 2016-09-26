import {assign} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/d3/lib'
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
export function $line__d3$column(scale__d3) {
  log(`${logPrefix}|$line__d3$column`)
  return column => {
    return scale__d3(column)
  }
}
export function $line__d3$cell(scale__d3) {
  log(`${logPrefix}|$line__d3$cell`)
  return (value, i) => {
    return scale__d3(value)
  }
}
export function assign__size__d3() {
  log(`${logPrefix}|assign__size__d3`)
  const ctx = assign(...arguments)
      , {
          svg__d3,
          content$svg__d3,
          width__svg,
          height__svg,
          width__content__svg,
          height__content__svg} = ctx
  svg__d3
    .attr('width', width__svg)
    .attr('height', height__svg)
  content$svg__d3
    .attr('width', width__content__svg)
    .attr('height', height__content__svg)
  return ctx
}
export function transform__content$svg__d3(ctx) {
  log(`${logPrefix}|transform__content$svg__d3`)
  const {margin__svg,content$svg__d3} = ctx
      , {left,top} = margin__svg
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