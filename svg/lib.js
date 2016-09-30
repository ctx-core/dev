import {clone} from 'ctx-core/object/lib'
import {dimensions__svg__agent} from 'ctx-core/d3/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/d3/lib'
export function set__dimensions__svg(ctx, ...set$ctx$$) {
  log(`${logPrefix}|set__dimensions__svg`)
  dimensions__svg__agent(ctx)
  const set$ctx = clone(...set$ctx$$)
      , margin__svg =
          set$ctx.margin__svg
          || ctx.margin__svg
          || {top: 20, right: 20, bottom: 60, left: 100 }
      , width__svg = set$ctx.width__svg || ctx.width__svg
      , height__svg = set$ctx.height__svg || ctx.height__svg
      , {left, right, top, bottom} = margin__svg
      , width__content__svg =
          width__svg - left - right
      , height__content__svg =
          height__svg - top - bottom
  ctx.dimensions__svg__agent.set({
    margin__svg,
    width__svg,
    height__svg,
    width__content__svg,
    height__content__svg
  }, ...set$ctx$$)
  return ctx
}
