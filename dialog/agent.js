/**
 * Agent methods for dialogs.
 * @module ctx-core/dialog/agent
 */
import {clone} from 'ctx-core/object/lib'
import {clone__concat__array
      , compact__array
      , last__array} from 'ctx-core/array/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {array__agent} from 'ctx-core/agent/array'
import {layers__agent} from 'ctx-core/layer/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dialog/agent'
/**
 * An agent acting on an array in the ctx.
 * @typedef {module:ctx-core/agent/array~array__agent} dialogs__agent
 * @property {function} push - Push the scoped ctx dialog values to the ctx.
 * @example
 * let dialog = {tag$name: 'ctx-dialog'}
 * dialog__agent.push({dialogs: dialog})
 * dialog__agent.remove({dialogs: dialog})
 */
/**
 * Ensures an agent that acts on an array of layers.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @returns {module:ctx-core/dialog/agent~dialogs__agent}
 */
export function dialogs__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|dialogs__agent`)
  const ctx__agent = clone(...ctx__agent$$)
  layers__agent(ctx)
  let agent
  return array__agent(ctx, {
    key: 'dialogs__agent',
    scope: ['dialogs'],
    init,
    push,
    remove,
    zIndex,
    has__tag$name,
    findBy__tag$name
  }, ctx__agent)
  function init() {
    log(`${logPrefix}|dialogs__agent|init`)
    agent = this
  }
  function push(...push$ctx$$) {
    log(`${logPrefix}|dialogs__agent|push`)
    const scope$ = agent.scope$()
        , push$ctx = clone__concat__array(...push$ctx$$)
        , dialogs__push = push$ctx[scope$]
    let layers = []
    for (let i=0; i < dialogs__push.length; i++) {
      let dialog = dialogs__push[i]
      dialog.layer = dialog.layer || {}
      layers.push(dialog.layer)
    }
    ctx.layers__agent.push({layers})
    agent.push__array__agent(...push$ctx$$)
    return agent
  }
  function remove(...remove$ctx$$) {
    log(`${logPrefix}|dialogs__agent|remove`)
    const scope$ = agent.scope$()
        , remove$ctx$ = clone__concat__array(...remove$ctx$$)
        , $remove__dialogs = compact__array(remove$ctx$[scope$] || [])
    let remove__dialogs = []
      , layers__remove = []
    for (let i=0; i < $remove__dialogs.length; i++) {
      const $remove__dialog = $remove__dialogs[i]
          , remove__dialog =
              typeof $remove__dialog === 'string'
                      ? agent.findBy__tag$name($remove__dialog)
                      : $remove__dialog
      remove__dialogs.push(remove__dialog)
      layers__remove.push(remove__dialog.layer)
    }
    let remove$ctx = {}
    remove$ctx[scope$] = remove__dialogs
    ctx.layers__agent.remove({
      layers: layers__remove
    })
    agent.remove__array__agent(remove$ctx)
    return agent
  }
  function zIndex(tag$name) {
    log(`${logPrefix}|dialogs__agent|zIndex`)
    const dialog = agent.findBy__tag$name(tag$name)
        , {layer} = dialog || {}
        , {zIndex=-1} = layer || {}
    return zIndex
  }
  function has__tag$name(tag$name) {
    log(`${logPrefix}|dialogs__agent|has__tag$name`, tag$name)
    return !!(agent.findBy__tag$name(tag$name))
  }
  function findBy__tag$name(tag$name) {
    log(`${logPrefix}|dialogs__agent|findBy__tag$name`, tag$name)
    const $$ = agent.$()
    for (let i=0; i < $$.length; i++) {
      const dialog = $$[i]
      if (dialog.tag$name === tag$name) {
        return dialog
      }
    }
  }
}
/**
 * A representation of a dialog.
 * @typedef dialog
 * @property {module:ctx-core/layer/lib~layer} layer
 */
/**
 * The first dialog in ctx.dialogs
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~ctx__agent}
 * @returns {module:ctx-core/dialog/agent~dialog}
 */
export function dialog__agent(ctx, ...ctx__agent$$) {
  log(`${logPrefix}|dialog__agent`)
  dialogs__agent(ctx)
  let agent
  return ensure__agent(ctx, {
    key: 'dialog__agent',
    scope: ['dialog'],
    init,
    remove
  }, ...ctx__agent$$)
  function init() {
    log(`${logPrefix}|dialog__agent|init`)
    agent = this
    ctx.dialogs__agent.pick__on({on$change__dialogs})
  }
  function on$change__dialogs() {
    log(`${logPrefix}|dialog__agent|on$change__dialogs`)
    const {dialogs} = ctx
        , dialog = last__array(dialogs)
    if (agent.$() !== dialog) {
      agent.set({dialog})
    }
  }
  function remove() {
    log(`${logPrefix}|dialog__agent|remove`)
    ctx.dialogs__agent.remove({
      dialogs: ctx.dialog
    })
  }
}