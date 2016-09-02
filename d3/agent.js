import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/d3/agent'
export function dimensions__d3__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|dimensions__d3__agent`)
  return ensure__agent(ctx, {
      scope: [
        'margin__d3',
        'width__d3',
        'height__d3',
        'paddingLeft__content$svg__d3',
        'width__content$svg__d3',
        'height__content$svg__d3'],
      key: 'dimensions__d3__agent'
    }, ...agent$ctx$$)
}