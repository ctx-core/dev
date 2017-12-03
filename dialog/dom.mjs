import {clone} from 'ctx-core/object/lib'
import {agent__dialogs,agent__dialog} from 'ctx-core/dialog/agent'
import {mount__layers} from 'ctx-core/layer/dom'
import {navigate} from 'ctx-core/route/lib'
import {agent__route} from 'ctx-core/route/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dialog/dom.mjs'
export function mount__dialog(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__dialog`)
  const ctx__mount = clone(...ctx__mount$$)
  let {ctx} = tag
  mount__layers(tag, ctx__mount)
  agent__dialogs(ctx)
  agent__dialog(ctx)
  agent__route(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|mount__dialog|on$mount`)
    ctx.agent__route.on('change', on$change__route)
    ctx.agent__dialog.on('change', on$change__dialog)
    ctx.agent__dialogs.pick__on(ctx__mount)
    ctx.agent__dialog.pick__on(ctx__mount)
    reload__dialog()
  }
  function on$unmount() {
    log(`${logPrefix}|mount__dialog|on$unmount`)
    ctx.agent__route.off('change', on$change__route)
    ctx.agent__dialog.off('change', on$change__dialog)
    ctx.agent__dialogs.pick__off(ctx__mount)
    ctx.agent__dialog.pick__off(ctx__mount)
  }
  function on$change__route() {
    log(`${logPrefix}|mount__dialog|on$change__route`)
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
    const {query__route} = ctx
        , dialog__query__route = query__route && query__route.dialog
        , {agent__dialogs} = ctx
        , dialogs = agent__dialogs.$ || []
    let dialog, indexOf__dialog
    for (let i=dialogs.length-1; i >= 0; i--) {
      dialog = dialogs[i]
      if (dialog.tag$name === dialog__query__route) {
        indexOf__dialog = i
        break
      }
    }
    if (dialog__query__route) {
      if (indexOf__dialog > -1) {
        agent__dialogs.remove({
          dialogs: dialogs.slice(indexOf__dialog + 1)
        })
      } else {
        dialog = {
          tag$name: dialog__query__route
        }
        agent__dialogs.push({
          dialogs: [dialog]
        })
      }
    }
    return ctx
  }
}