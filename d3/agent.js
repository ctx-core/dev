import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/d3/agent'
export function dimensions__svg__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|dimensions__svg__agent`)
  return ensure__agent(ctx, {
      scope: [
        'margin__svg',
        'width__svg',
        'height__svg',
        'paddingLeft__content$svg__svg',
        'width__content__svg',
        'height__content__svg'],
      key: 'dimensions__svg__agent'
    }, ...agent$ctx$$)
}