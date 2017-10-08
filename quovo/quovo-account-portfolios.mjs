import {tag__assign} from 'ctx-core/riot/tag'
import {quovo__account__portfolios__agent
      , portfolio_id__quovo__agent} from 'ctx-core/quovo/agent'
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
  quovo__account__portfolios__agent(ctx)
  portfolio_id__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.quovo__account__portfolios__agent.on('change', on$change__quovo__account__portfolios)
    ctx.portfolio_id__quovo__agent.on('change', on$change__portfolio_id__quovo)
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.quovo__account__portfolios__agent.off('change', on$change__quovo__account__portfolios)
    ctx.portfolio_id__quovo__agent.off('change', on$change__portfolio_id__quovo)
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