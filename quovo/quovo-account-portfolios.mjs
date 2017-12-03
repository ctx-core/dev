import {tag__assign} from 'ctx-core/riot/tag'
import {agent__account__portfolios__quovo
      , agent__portfolio_id__quovo} from 'ctx-core/quovo/agent'
import {path__portfolio__account__user__quovo} from 'ctx-core/quovo/path'
import {format__currency} from 'currency/lib'
import {mount__currency} from 'ctx-core/currency/dom'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-account-portfolios'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    format__currency,
    path__portfolio__account__user__quovo,
    registerElement: [
      'quovo-portfolio',
      'quovo-portfolio-name',
      'quovo-portfolio-type',
      'quovo-portfolio-category',
      'quovo-portfolio-value'
    ]
  })
  const {ctx} = tag
  mount__currency(tag)
  agent__account__portfolios__quovo(ctx)
  agent__portfolio_id__quovo(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.agent__account__portfolios__quovo.on('change', on$change__quovo__account__portfolios)
    ctx.agent__portfolio_id__quovo.on('change', on$change__portfolio_id__quovo)
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__account__portfolios__quovo.off('change', on$change__quovo__account__portfolios)
    ctx.agent__portfolio_id__quovo.off('change', on$change__portfolio_id__quovo)
  }
  function on$change__quovo__account__portfolios() {
    log(`${logPrefix}|on$change__quovo__account__portfolios`)
    tag.update()
  }
  function on$change__portfolio_id__quovo() {
    log(`${logPrefix}|on$change__portfolio_id__quovo`)
    tag.update()
  }
}