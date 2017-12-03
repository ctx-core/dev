import {tag__assign} from 'ctx-core/riot/tag'
import {agent__portfolio__positions__quovo
      , agent__portfolio__quovo} from 'ctx-core/quovo/agent'
import {format__currency} from 'currency/lib'
import {mount__currency} from 'ctx-core/currency/dom'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-details'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    format__currency
  })
  const {ctx} = tag
  mount__currency(tag)
  agent__portfolio__positions__quovo(ctx)
  agent__portfolio__quovo(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.agent__portfolio__quovo.on('change', on$change__portfolio__quovo)
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__portfolio__quovo.off('change', on$change__portfolio__quovo)
  }
  function on$change__portfolio__quovo() {
    log(`${logPrefix}|on$change__portfolio__quovo`)
    tag.update()
  }
}