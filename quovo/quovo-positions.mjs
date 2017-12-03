import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {agent__positions__quovo
      , agent__portfolio__positions__quovo} from 'ctx-core/quovo/agent'
import {mount__currency} from 'ctx-core/currency/dom'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-positions'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {format__currency})
  const {ctx} = tag
  mount__currency(tag)
  agent__positions__quovo(ctx)
  agent__portfolio__positions__quovo(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.agent__positions__quovo
      .on('change', on$change__positions__quovo)
    ctx.agent__portfolio__positions__quovo
      .on('change', on$change__portfolio__positions__quovo)
    tag.update()
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__positions__quovo
      .off('change', on$change__positions__quovo)
    ctx.agent__portfolio__positions__quovo
      .off('change', on$change__portfolio__positions__quovo)
  }
  function on$change__positions__quovo() {
    log(`${logPrefix}|on$change__positions__quovo`)
    tag.update()
  }
  function on$change__portfolio__positions__quovo() {
    log(`${logPrefix}|on$change__portfolio__positions__quovo`)
    tag.update()
  }
}