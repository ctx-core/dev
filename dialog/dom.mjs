import {clone} from 'ctx-core/object/lib.mjs'
import {agent__dialogs
      , agent__dialog} from 'ctx-core/dialog/agent.mjs'
import {mount__layers} from 'ctx-core/layer/dom.mjs'
import {navigate} from 'ctx-core/route/lib.mjs'
import {agent__route} from 'ctx-core/route/agent.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/dialog/dom.mjs'
export function mount__dialog(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__dialog`)
  const ctx__mount = clone(...ctx__mount$$)
  let {ctx} = tag
  mount__layers(tag, ctx__mount)
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  return tag
  function onmount() {
    log(`${logPrefix}|mount__dialog|onmount`)
    agent__route(ctx).on('change', __change__agent__route)
    agent__dialog(ctx).on('change', __change__agent__dialog)
    agent__dialogs(ctx).pick__on(ctx__mount)
    agent__dialog(ctx).pick__on(ctx__mount)
    reload__dialog()
  }
  function onunmount() {
    log(`${logPrefix}|mount__dialog|onunmount`)
    agent__route(ctx).off('change', __change__agent__route)
    agent__dialog(ctx).off('change', __change__agent__dialog)
    agent__dialogs(ctx).pick__off(ctx__mount)
    agent__dialog(ctx).pick__off(ctx__mount)
  }
  function __change__agent__route() {
    log(`${logPrefix}|mount__dialog|__change__agent__route`)
    reload__dialog()
  }
  function __change__agent__dialog() {
    log(`${logPrefix}|mount__dialog|__change__agent__dialog`)
    if (!ctx.dialog) {
      navigate(
        ctx,
        ctx.path__route)
    }
    tag.update()
  }
  function reload__dialog() {
    log(`${logPrefix}|mount__dialog|reload__dialog`)
    const {query__route} = ctx
        , dialog__query__route = query__route && query__route.dialog
        , {agent__dialogs} = ctx
        , dialogs = agent__dialogs.__0 || []
    let dialog, indexOf__dialog
    for (let i=dialogs.length-1; i >= 0; i--) {
      dialog = dialogs[i]
      if (dialog.name__tag === dialog__query__route) {
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
          name__tag: dialog__query__route
        }
        agent__dialogs.push({
          dialogs: [dialog]
        })
      }
    }
    return ctx
  }
}