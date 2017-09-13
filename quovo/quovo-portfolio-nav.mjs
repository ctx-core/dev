import {tag__assign} from 'ctx-core/riot/tag'
import {portfolio__quovo__agent} from 'ctx-core/quovo/agent'
import {path__portfolio__account__user__quovo
      , path__portfolio_history__account__user__quovo} from 'ctx-core/quovo/path'
import {mount__currency} from 'ctx-core/currency/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-nav.tag'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    path__portfolio__account__user__quovo,
    path__portfolio_history__account__user__quovo
  })
  const {ctx} = tag
  mount__currency(tag)
  portfolio__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.portfolio__quovo__agent
      .on('change', on$change__portfolio__quovo)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.portfolio__quovo__agent
      .off('change', on$change__portfolio__quovo)
  }
  function on$change__portfolio__quovo() {
    log(`${logPrefix}|on$change__portfolio__quovo`)
    tag.update()
  }
}