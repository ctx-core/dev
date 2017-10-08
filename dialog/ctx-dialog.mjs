import {tag__assign} from 'ctx-core/riot/tag'
import {mount__dialog} from 'ctx-core/dialog/dom'
import {$dom
      , $$dom
      , has__class
      , add__class} from 'ctx-core/dom/lib'
import {log,info,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dialog/ctx-dialog'
export function init(tag) {
  log(`${logPrefix}|init`)
  const update__super = tag.update
  tag__assign(tag, {
    className,
    update,
    onclick__root
  })
  const slideOut__delay = 30
      , {ctx} = tag
  let layer
  mount__dialog(tag, {
    on$change__dialogs,
    on$change__dialog
  })
  log(logPrefix)
  let root
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    root = tag.root
    layer = {
      dom$el: root
    }
    ctx.layers__agent.push({layers: [layer]})
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.layers__agent.remove(layer)
  }
  function on$change__dialogs() {
    log(`${logPrefix}|on$change__dialogs`)
    tag.update()
  }
  function on$change__dialog() {
    log(`${logPrefix}|on$change__dialog`)
    root.className = tag.className()
  }
  function onclick__root(e) {
    log(`${logPrefix}|onclick__root`)
    const dom$clear$$ = [
            root,
            $dom('section', root),
            ...Array.from($$dom('ctx-dialog > section > *', root))]
        , {target} = e
    for (let i=0; i < dom$clear$$.length; i++) {
      if (dom$clear$$[i] === target) {
        clear()
        return false
      }
    }
    return true
  }
  function className() {
    log(`${logPrefix}|className`)
    let className$$ = []
    const {dialogs} = ctx
    if (dialogs && dialogs.length) className$$.push('show')
    const {dialog} = ctx
    if (dialog && dialog.tag$name) className$$.push(dialog.tag$name)
    return className$$.join(' ')
  }
  function clear() {
    log(`${logPrefix}|clear`)
    ctx.dialogs__agent.clear()
  }
  function update() {
    log(`${logPrefix}|update`)
    init__hide()
    return update__super.apply(tag, arguments)
  }
  function init__hide() {
    log(`${logPrefix}|init__hide`)
    const hide =
            ctx.dialogs
            && !ctx.dialogs.length
            && has__class(root, 'show')
            && !has__class(root, 'hide__inProgress')
    if (hide) {
      add__class(
        root,
        'hide__inProgress')
      schedule__hide()
    }
  }
  function schedule__hide() {
    log(`${logPrefix}|schedule__init__hide`)
    setTimeout(hide, slideOut__delay)
  }
  function hide() {
    info(`${logPrefix}|hide`)
    root.className = ''
  }
}