import {clone} from 'ctx-core/object/lib'
import {
  table__agent,
  row__agent,
  filter__rows__data__agent,
  row_id__agent,
  highlight__rows__data__agent
} from 'ctx-core/table/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/table/tag'
export function mount__table(tag, ...ctx__mount$$) {
  log(`${logPrefix}|mount__table`)
  let ctx = tag.ctx
  const ctx__mount = clone(...ctx__mount$$)
  table__agent(ctx)
  row_id__agent(ctx)
  row__agent(ctx)
  filter__rows__data__agent(ctx)
  highlight__rows__data__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.table__agent.pick__on(ctx__mount)
    ctx.row__agent.pick__on(ctx__mount)
    ctx.filter__rows__data__agent.pick__on(ctx__mount)
    ctx.row_id__agent.pick__on(ctx__mount)
    ctx.highlight__rows__data__agent.pick__on(ctx__mount)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.table__agent.pick__off(ctx__mount)
    ctx.row__agent.pick__off(ctx__mount)
    ctx.filter__rows__data__agent.pick__off(ctx__mount)
    ctx.row_id__agent.pick__off(ctx__mount)
    ctx.highlight__rows__data__agent.pick__off(ctx__mount)
  }
}