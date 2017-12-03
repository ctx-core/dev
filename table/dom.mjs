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
  let ctx = tag.ctx
  const ctx__mount = clone(...ctx__mount$$)
  agent__table(ctx)
  agent__row_id(ctx)
  agent__row(ctx)
  agent__filter__rows__data(ctx)
  agent__highlight__rows__data(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.agent__table.pick__on(ctx__mount)
    ctx.agent__row.pick__on(ctx__mount)
    ctx.agent__filter__rows__data.pick__on(ctx__mount)
    ctx.agent__row_id.pick__on(ctx__mount)
    ctx.agent__highlight__rows__data.pick__on(ctx__mount)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.agent__table.pick__off(ctx__mount)
    ctx.agent__row.pick__off(ctx__mount)
    ctx.agent__filter__rows__data.pick__off(ctx__mount)
    ctx.agent__row_id.pick__off(ctx__mount)
    ctx.agent__highlight__rows__data.pick__off(ctx__mount)
  }
}