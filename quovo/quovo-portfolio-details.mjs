import {tag__assign} from 'ctx-core/riot/tag.mjs'
import {agent__portfolio__quovo} from 'ctx-core/quovo/agent.mjs'
import {format__currency} from 'currency/lib.mjs'
import {mount__currency} from 'ctx-core/currency/dom.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo/quovo-portfolio-details.mjs'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    format__currency
  })
  const {ctx} = tag
  mount__currency(tag)
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  function onmount() {
    log(`${logPrefix}|onmount`)
    agent__portfolio__quovo(ctx).on('change',
      __change__agent__portfolio__quovo)
    tag.update()
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    agent__portfolio__quovo(ctx).off('change',
      __change__agent__portfolio__quovo)
  }
  function __change__agent__portfolio__quovo() {
    log(`${logPrefix}|__change__agent__portfolio__quovo`)
    tag.update()
  }
}