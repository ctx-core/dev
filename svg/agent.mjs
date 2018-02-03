import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/svg/agent.mjs'
export function agent__matrix2d__svg(ctx, ...array__opts) {
  let agent = ctx.agent__matrix2d__svg
  if (agent) return agent
  return ensure__agent(ctx, {
      scope:
        [ 'margin__svg',
          'width__svg',
          'height__svg',
          'width__content__svg',
          'height__content__svg'],
      key: 'agent__matrix2d__svg'
    }, ...array__opts)
}