import {clone} from 'ctx-core/object/lib'
import {matrix2d__svg__agent} from 'ctx-core/svg/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/svg/lib'
export function set__matrix2d__svg(ctx, ...ctx__set$$) {
  log(`${logPrefix}|set__matrix2d__svg`)
  matrix2d__svg__agent(ctx)
  const ctx__set = clone(...ctx__set$$)
      , margin__svg =
          ctx__set.margin__svg
          || ctx.margin__svg
          || {top: 20, right: 20, bottom: 60, left: 100 }
      , width__svg = ctx__set.width__svg || ctx.width__svg
      , height__svg = ctx__set.height__svg || ctx.height__svg
      , {left, right, top, bottom} = margin__svg
      , width__content__svg =
          width__svg - left - right
      , height__content__svg =
          height__svg - top - bottom
  ctx.matrix2d__svg__agent.set({
    margin__svg,
    width__svg,
    height__svg,
    width__content__svg,
    height__content__svg
  }, ...ctx__set$$)
  return ctx
}
