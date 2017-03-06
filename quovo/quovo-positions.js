import {tag__assign} from 'ctx-core/riot/tag'
import {$format__currency} from 'ctx-core/currency/lib'
import {positions__quovo__agent
      , portfolio__positions__quovo__agent} from 'ctx-core/quovo/agent'
import {mount__currency} from 'ctx-core/currency/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-positions'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {$format__currency})
  let {ctx} = tag
  mount__currency(tag)
  positions__quovo__agent(ctx)
  portfolio__positions__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.positions__quovo__agent.pick__on({on$change__positions__quovo})
    ctx.portfolio__positions__quovo__agent.pick__on({on$change__portfolio__positions__quovo})
    tag.update__ctx()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.positions__quovo__agent.pick__off({on$change__positions__quovo})
    ctx.portfolio__positions__quovo__agent.pick__off({on$change__portfolio__positions__quovo})
  }
  function on$change__positions__quovo() {
    log(`${logPrefix}|on$change__positions__quovo`)
    tag.update__ctx()
  }
  function on$change__portfolio__positions__quovo() {
    log(`${logPrefix}|on$change__portfolio__positions__quovo`)
    tag.update__ctx()
  }
}