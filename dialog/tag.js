import {clone} from 'ctx-core/object/lib'
import {dialogs__agent,dialog__agent} from 'ctx-core/dialog/agent'
import {mount__layers} from 'ctx-core/layer/tag'
import {navigate} from 'ctx-core/route/lib'
import {route$hash__agent} from 'ctx-core/route/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dialog/tag'
export function mount__dialog(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__dialog`)
  const mount$ctx = clone(...mount$ctx$$)
  let ctx = tag.ctx
  mount__layers(tag, mount$ctx)
  dialogs__agent(ctx)
  dialog__agent(ctx)
  route$hash__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|mount__dialog|on$mount`)
    ctx.route$hash__agent.on('change', route$hash__refresh__agent)
    ctx.dialog__agent.pick__on({on$change__dialog})
    ctx.dialogs__agent.pick__on(mount$ctx)
    ctx.dialog__agent.pick__on(mount$ctx)
    route$hash__refresh__agent()
  }
  function on$unmount() {
    log(`${logPrefix}|mount__dialog|on$unmount`)
    ctx.route$hash__agent.off('change', route$hash__refresh__agent)
    ctx.dialog__agent.pick__off({on$change__dialog})
    ctx.dialogs__agent.pick__off(mount$ctx)
    ctx.dialog__agent.pick__off(mount$ctx)
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
    tag.update__ctx()
  }
  function reload__dialog() {
    log(`${logPrefix}|mount__dialog|reload__dialog`)
    const route$query = ctx.route$query
        , route$dialog = route$query && route$query.dialog
        , dialogs__agent = ctx.dialogs__agent
        , dialogs = dialogs__agent.$() || []
    let dialog = dialogs
          .reverse()
          .find(
            dialog =>
              dialog.tag$name === route$dialog)
      , indexOf__dialog = (dialog && dialogs.lastIndexOf(dialogs)) || -1
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