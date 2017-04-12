import {clone} from 'ctx-core/object/lib'
import {dialogs__agent,dialog__agent} from 'ctx-core/dialog/agent'
import {mount__layers} from 'ctx-core/layer/tag'
import {navigate} from 'ctx-core/route/lib'
import {route$hash__agent} from 'ctx-core/route/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dialog/tag'
export function mount__dialog(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__dialog`)
  const ctx__mount = clone(...ctx__mount$$)
  let {ctx} = tag
  mount__layers(tag, ctx__mount)
  dialogs__agent(ctx)
  dialog__agent(ctx)
  route$hash__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|mount__dialog|on$mount`)
    ctx.route$hash__agent.on('change', route$hash__refresh__agent)
    ctx.dialog__agent.on('change', on$change__dialog)
    ctx.dialogs__agent.pick__on(ctx__mount)
    ctx.dialog__agent.pick__on(ctx__mount)
    route$hash__refresh__agent()
  }
  function on$unmount() {
    log(`${logPrefix}|mount__dialog|on$unmount`)
    ctx.route$hash__agent.off('change', route$hash__refresh__agent)
    ctx.dialog__agent.off('change', on$change__dialog)
    ctx.dialogs__agent.pick__off(ctx__mount)
    ctx.dialog__agent.pick__off(ctx__mount)
  }
  function route$hash__refresh__agent() {
    log(`${logPrefix}|mount__dialog|route$hash__refresh__agent`)
    reload__dialog()
  }
  function on$change__dialog() {
    log(`${logPrefix}|mount__dialog|on$change__dialog`)
    if (!ctx.dialog) {
      navigate(ctx, ctx.route$path)
    }
    tag.update()
  }
  function reload__dialog() {
    log(`${logPrefix}|mount__dialog|reload__dialog`)
    const route$query = ctx.route$query
        , route$dialog = route$query && route$query.dialog
        , dialogs__agent = ctx.dialogs__agent
        , dialogs = dialogs__agent.$() || []
    let dialog, indexOf__dialog
    for (let i=dialogs.length-1; i >= 0; i--) {
      dialog = dialogs[i]
      if (dialog.tag$name === route$dialog) {
        indexOf__dialog = i
        break
      }
    }
    if (route$dialog) {
      if (indexOf__dialog > -1) {
        dialogs__agent.remove({
          dialogs: dialogs.slice(indexOf__dialog + 1)
        })
      } else {
        dialog = {
          tag$name: route$dialog
        }
        dialogs__agent.push({
          dialogs: [dialog]
        })
      }
    }
    return ctx
  }
}