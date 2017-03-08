import {tag__assign} from 'ctx-core/riot/tag'
import {portfolio__positions__quovo__agent
      , portfolio__quovo__agent} from 'ctx-core/quovo/agent'
import {$format__currency} from 'currency/lib'
import {mount__currency} from 'ctx-core/currency/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-details'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    $format__currency
  })
  const {ctx} = tag
  mount__currency(tag)
  portfolio__positions__quovo__agent(ctx)
  portfolio__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.portfolio__quovo__agent.pick__on({on$change__portfolio__quovo})
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.portfolio__quovo__agent.pick__off({on$change__portfolio__quovo})
  }
  function on$change__portfolio__quovo() {
    log(`${logPrefix}|on$change__portfolio__quovo`)
    tag.update()
  }
}