import {clone} from 'ctx-core/object/lib'
import {ensure__agent} from 'ctx-core/agent/lib'
import deepEqual from 'deep-equal'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/agent/dictionary.mjs'
export function agent__dictionary(ctx, ...array__opts) {
  log(`${logPrefix}|agent__dictionary`)
  const agent =
          ensure__agent(ctx, {
            upsert__item,
            remove__item
          }, ...array__opts)
  return agent
  function upsert__item(id, ctx__item) {
    log(`${logPrefix}|agent__dictionary|upsert__item`)
    const {entities} = ctx
        , item__ = entities[id]
    let item
    if (item__) {
      item = clone(item__, ctx__item)
      if (!deepEqual(item__, item)) {
        entities[id] = item
        trigger__change__item(id, item, item__)
      }
    } else {
      item = clone(ctx__item)
      entities[id] = item
      trigger__add__item(id, item)
    }
    return item
  }
  function remove__item(id) {
    log(`${logPrefix}|agent__dictionary|remove__item`)
    const {entities} = ctx
        , item = entities[id]
    if (item) {
      delete entities[id]
      trigger__remove__item(id, item)
    }
    return item
  }
  function trigger__add__item(id, item) {
    setTimeout(() => {
      agent.trigger(`add__item:${id}`, item)
      agent.trigger('add__item', item)
    }, 0)
  }
  function trigger__change__item(id, item, item__old) {
    setTimeout(() => {
      agent.trigger(`change__item:${id}`, item, item__old)
      agent.trigger('change__item', id, item, item__old)
    }, 0)
    return agent
  }
  function trigger__remove__item(id, item) {
    setTimeout(() => {
      agent.trigger(`remove__item:${id}`, item)
      agent.trigger('remove__item', id, item)
    }, 0)
  }
}