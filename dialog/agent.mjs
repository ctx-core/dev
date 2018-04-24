/**
 * Agent methods for dialogs.
 * @module ctx-core/dialog/agent
 */
import {clone__concat__array
      , compact__array
      , last__array} from 'ctx-core/array/lib.mjs'
import {ensure__agent} from 'ctx-core/agent/lib.mjs'
import {ensure__agent__array} from 'ctx-core/agent/array.mjs'
import {agent__layers} from 'ctx-core/layer/agent.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/dialog/agent.mjs'
/**
 * An agent acting on an array in the ctx.
 * @typedef {module:ctx-core/agent/array~agent__array} agent__dialogs
 * @property {function} push - Push the scoped ctx dialog values to the ctx.
 * @example
 * let dialog = {name__tag: 'ctx-dialog'}
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
  let agent = ctx.agent__dialogs
  if (agent) return agent
  return ensure__agent__array(ctx, {
    key: 'agent__dialogs',
    scope: ['dialogs'],
    init,
    push,
    remove,
    zIndex,
    has__name__tag,
    findBy__name__tag
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__dialogs|init`)
    agent = this
  }
  function push(...array__ctx__push) {
    log(`${logPrefix}|agent__dialogs|push`)
    const {scope__0} = agent
        , ctx__push = clone__concat__array(...array__ctx__push)
        , dialogs__push = ctx__push[scope__0]
    let layers = []
    for (let i=0; i < dialogs__push.length; i++) {
      let dialog = dialogs__push[i]
      dialog.layer = dialog.layer || {}
      layers.push(dialog.layer)
    }
    agent__layers(ctx).push({layers})
    agent.push__agent__array(...array__ctx__push)
    return agent
  }
  function remove(...array__ctx__remove) {
    log(`${logPrefix}|agent__dialogs|remove`)
    const {scope__0} = agent
        , ctx__remove = clone__concat__array(...array__ctx__remove)
        , remove__dialogs__ =
            compact__array(
              ctx__remove[scope__0]
              || [])
    let remove__dialogs = []
      , layers__remove = []
    for (let i=0; i < remove__dialogs__.length; i++) {
      const $remove__dialog = remove__dialogs__[i]
          , remove__dialog =
              typeof $remove__dialog === 'string'
                      ? agent.findBy__name__tag($remove__dialog)
                      : $remove__dialog
      remove__dialogs.push(remove__dialog)
      layers__remove.push(remove__dialog.layer)
    }
    let ctx__remove = {}
    ctx__remove[scope__0] = remove__dialogs
    agent__layers(ctx).remove({
      layers: layers__remove
    })
    agent.remove__agent__array(ctx__remove)
    return agent
  }
  function zIndex(name__tag) {
    log(`${logPrefix}|agent__dialogs|zIndex`)
    const dialog = agent.findBy__name__tag(name__tag)
        , {layer} = dialog || {}
        , {zIndex=-1} = layer || {}
    return zIndex
  }
  function has__name__tag(name__tag) {
    log(`${logPrefix}|agent__dialogs|has__name__tag`, name__tag)
    return !!(agent.findBy__name__tag(name__tag))
  }
  function findBy__name__tag(name__tag) {
    log(`${logPrefix}|agent__dialogs|findBy__name__tag`, name__tag)
    const {$} = agent
    for (let i=0; i < $.length; i++) {
      const dialog = $[i]
      if (dialog.name__tag === name__tag) {
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
  let agent = ctx.agent__dialog
  if (agent) return agent
  return ensure__agent(ctx, {
    key: 'agent__dialog',
    scope: ['dialog'],
    init,
    remove
  }, ...array__opts)
  function init() {
    log(`${logPrefix}|agent__dialog|init`)
    agent = this
    agent__dialogs(ctx).on('change',
      __change__agent__dialogs)
  }
  function __change__agent__dialogs() {
    log(`${logPrefix}|agent__dialog|__change__agent__dialogs`)
    const {dialogs} = ctx
        , dialog = last__array(dialogs)
    if (agent.__0 !== dialog) {
      agent.set({dialog})
    }
  }
  function remove() {
    log(`${logPrefix}|agent__dialog|remove`)
    agent__dialogs(ctx).remove({
      dialogs: ctx.dialog
    })
  }
}