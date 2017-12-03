/**
 * Agent methods for dialogs.
 * @module ctx-core/dialog/agent
 */
import {clone} from 'ctx-core/object/lib'
import {clone__concat__array
      , compact__array
      , last__array} from 'ctx-core/array/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import {ensure__agent__array} from 'ctx-core/agent/array'
import {agent__layers} from 'ctx-core/layer/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dialog/agent'
/**
 * An agent acting on an array in the ctx.
 * @typedef {module:ctx-core/agent/array~agent__array} agent__dialogs
 * @property {function} push - Push the scoped ctx dialog values to the ctx.
 * @example
 * let dialog = {tag$name: 'ctx-dialog'}
 * agent__dialog.push({dialogs: dialog})
 * agent__dialog.remove({dialogs: dialog})
 */
/**
 * Ensures an agent that acts on an array of layers.
 * @param {module:ctx-core/object/lib~ctx}
 * @param {...module:ctx-core/agent/lib~ctx__agent} ctx__agent
 * @returns {module:ctx-core/dialog/agent~agent__dialogs}
 */
export function agent__dialogs(ctx, ...array__opts) {
  log(`${logPrefix}|agent__dialogs`)
  const opts = clone(...array__opts)
  agent__layers(ctx)
  let agent
  return ensure__agent__array(ctx, {
    key: 'agent__dialogs',
    scope: ['dialogs'],
    init,
    push,
    remove,
    zIndex,
    has__tag$name,
    findBy__tag$name
  }, opts)
  function init() {
    log(`${logPrefix}|agent__dialogs|init`)
    agent = this
  }
  function push(...push$ctx$$) {
    log(`${logPrefix}|agent__dialogs|push`)
    const {scope$} = agent
        , push$ctx = clone__concat__array(...push$ctx$$)
        , dialogs__push = push$ctx[scope$]
    let layers = []
    for (let i=0; i < dialogs__push.length; i++) {
      let dialog = dialogs__push[i]
      dialog.layer = dialog.layer || {}
      layers.push(dialog.layer)
    }
    ctx.agent__layers.push({layers})
    agent.push__agent__array(...push$ctx$$)
    return agent
  }
  function remove(...remove$ctx$$) {
    log(`${logPrefix}|agent__dialogs|remove`)
    const {scope$} = agent
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
    ctx.agent__layers.remove({
      layers: layers__remove
    })
    agent.remove__agent__array(remove$ctx)
    return agent
  }
  function zIndex(tag$name) {
    log(`${logPrefix}|agent__dialogs|zIndex`)
    const dialog = agent.findBy__tag$name(tag$name)
        , {layer} = dialog || {}
        , {zIndex=-1} = layer || {}
    return zIndex
  }
  function has__tag$name(tag$name) {
    log(`${logPrefix}|agent__dialogs|has__tag$name`, tag$name)
    return !!(agent.findBy__tag$name(tag$name))
  }
  function findBy__tag$name(tag$name) {
    log(`${logPrefix}|agent__dialogs|findBy__tag$name`, tag$name)
    const {$} = agent
    for (let i=0; i < $.length; i++) {
      const dialog = $[i]
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
export function agent__dialog(ctx, ...array__opts) {
  log(`${logPrefix}|agent__dialog`)
  agent__dialogs(ctx)
  let agent
  return ensure__agent(ctx, {
    key: 'agent__dialog',
    scope: ['dialog'],
    init,
    remove
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__dialog|init`)
    agent = this
    ctx.agent__dialogs.on('change', onchange__dialogs)
  }
  function onchange__dialogs() {
    log(`${logPrefix}|agent__dialog|onchange__dialogs`)
    const {dialogs} = ctx
        , dialog = last__array(dialogs)
    if (agent.$ !== dialog) {
      agent.set({dialog})
    }
  }
  function remove() {
    log(`${logPrefix}|agent__dialog|remove`)
    ctx.agent__dialogs.remove({
      dialogs: ctx.dialog
    })
  }
}