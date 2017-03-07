import {tag__assign} from 'ctx-core/riot/tag'
import {$format__currency} from 'ctx-core/currency/lib'
import {tran_type$map} from 'ctx-core/quovo/lib'
import {portfolio_history__quovo__agent} from 'ctx-core/quovo/agent'
import {mount__currency} from 'ctx-core/currency/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-history'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    $format__currency,
    tran_type$map: tran_type$map,
    registerElement: [
      'x-headers',
      'x-date',
      'quovo-tran-type',
      'x-market-code',
      'x-ticker',
      'x-ticker-name',
      'quovo-portfolio-history-quantity',
      'quovo-portfolio-history-value'
    ]
  })
  const {ctx} = tag
  mount__currency(tag)
  portfolio_history__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.portfolio_history__quovo__agent.pick__on({on$change__portfolio_history__quovo})
    tag.update__ctx()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.portfolio_history__quovo__agent.pick__off({on$change__portfolio_history__quovo})
  }
  function on$change__portfolio_history__quovo() {
    log(`${logPrefix}|on$change__portfolio_history__quovo`)
    tag.update__ctx()
  }
}