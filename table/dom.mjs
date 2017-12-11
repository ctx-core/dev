import {clone} from 'ctx-core/object/lib'
import {
  agent__table,
  agent__row,
  agent__filter__rows__data,
  agent__row_id,
  agent__highlight__rows__data
} from 'ctx-core/table/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/table/dom.mjs'
export function mount__table(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__table`)
  let {ctx} = tag
  const ctx__mount = clone(...ctx__mount$$)
  agent__table(ctx)
  agent__row_id(ctx)
  agent__row(ctx)
  agent__filter__rows__data(ctx)
  agent__highlight__rows__data(ctx)
  tag.on('mount', onmount)
  tag.on('unmount', onunmount)
  return tag
  function onmount() {
    log(`${logPrefix}|onmount`)
    ctx.agent__table.pick__on(ctx__mount)
    ctx.agent__row.pick__on(ctx__mount)
    ctx.agent__filter__rows__data.pick__on(ctx__mount)
    ctx.agent__row_id.pick__on(ctx__mount)
    ctx.agent__highlight__rows__data.pick__on(ctx__mount)
  }
  function onunmount() {
    log(`${logPrefix}|onunmount`)
    ctx.agent__table.pick__off(ctx__mount)
    ctx.agent__row.pick__off(ctx__mount)
    ctx.agent__filter__rows__data.pick__off(ctx__mount)
    ctx.agent__row_id.pick__off(ctx__mount)
    ctx.agent__highlight__rows__data.pick__off(ctx__mount)
  }
}