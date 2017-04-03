import {tag__assign} from 'ctx-core/riot/tag'
import {format__currency} from 'ctx-core/currency/lib'
import {account__user__quovo__agent} from 'ctx-core/quovo/agent'
import {path__account__user__quovo} from 'ctx-core/quovo/path'
import {mount__currency} from 'ctx-core/currency/tag'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo/quovo-user-account-nav'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    format__currency,
    path__account__user__quovo
  })
  const {ctx} = tag
  mount__currency(tag)
  account__user__quovo__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.account__user__quovo__agent.pick__on({on$change__account__user__quovo})
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.account__user__quovo__agent.pick__off({on$change__account__user__quovo})
  }
  function on$change__account__user__quovo() {
    log(`${logPrefix}|on$change__account__user__quovo`)
    tag.update()
  }
}