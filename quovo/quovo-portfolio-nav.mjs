import {tag__assign} from 'ctx-core/riot/tag'
import {agent__portfolio__quovo} from 'ctx-core/quovo/agent'
import {path__portfolio__account__user__quovo
      , path__portfolio_history__account__user__quovo} from 'ctx-core/quovo/path'
import {mount__currency} from 'ctx-core/currency/dom'
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
  agent__portfolio__quovo(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.agent__portfolio__quovo
      .on('change', on$change__portfolio__quovo)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__portfolio__quovo
      .off('change', on$change__portfolio__quovo)
  }
  function on$change__portfolio__quovo() {
    log(`${logPrefix}|on$change__portfolio__quovo`)
    tag.update()
  }
}