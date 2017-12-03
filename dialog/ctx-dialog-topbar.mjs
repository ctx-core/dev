import {tag__assign} from 'ctx-core/riot/tag'
import {agent__dialogs} from 'ctx-core/dialog/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'dialog/ctx-dialog-topbar'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    onclick__back_button: onclick__back_button,
    registerElement: ['ctx-back-button']
  })
  const {ctx} = tag
  agent__dialogs(ctx)
  function onclick__back_button() {
    log(`${logPrefix}|onclick__back_button`)
    clear()
  }
  function clear() {
    log(`${logPrefix}|clear`)
    ctx.agent__dialogs.remove({
      dialogs: [tag.opts.dialog]
    })
  }
}