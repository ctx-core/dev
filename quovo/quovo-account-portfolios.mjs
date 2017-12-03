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
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    ctx.agent__account__portfolios__quovo.on('change', onchange__quovo__account__portfolios)
    ctx.agent__portfolio_id__quovo.on('change', onchange__portfolio_id__quovo)
    tag.update()
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    ctx.agent__account__portfolios__quovo.off('change', onchange__quovo__account__portfolios)
    ctx.agent__portfolio_id__quovo.off('change', onchange__portfolio_id__quovo)
  }
  function onchange__quovo__account__portfolios() {
    log(`${logPrefix}|onchange__quovo__account__portfolios`)
    tag.update()
  }
  function onchange__portfolio_id__quovo() {
    log(`${logPrefix}|onchange__portfolio_id__quovo`)
    tag.update()
  }
}