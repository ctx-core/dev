import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/svg/agent'
export function matrix2d__svg__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|matrix2d__svg__agent`)
  return ensure__agent(ctx, {
      scope: [
        'margin__svg',
        'width__svg',
        'height__svg',
        'width__content__svg',
        'height__content__svg'],
      key: 'matrix2d__svg__agent'
    }, ...ctx__agent$$)
}