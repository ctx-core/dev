import {ensure__agent} from 'ctx-core/agent/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/d3/agent'
export function d3__dimensions__agent(ctx, ...agent$ctx$$) {
  log(`${logPrefix}|d3__dimensions__agent`)
  return ensure__agent(ctx, {
      scope: [
        'd3__margin',
        'd3__width',
        'd3__height',
        'd3__svg$content__paddingLeft',
        'd3__svg$content__width',
        'd3__svg$content__height'],
      key: 'd3__dimensions__agent'
    }, ...agent$ctx$$)
}