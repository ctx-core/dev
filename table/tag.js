import {clone} from 'ctx-core/object/lib'
import {
  table__agent,
  row__agent,
  filter__rows__data__agent,
  row_id__agent,
  highlight__rows__data__agent
} from 'ctx-core/table/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'msci_demo/tag'
export function mount__table(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__table`)
  let ctx = tag.ctx
  const mount$ctx = clone(...mount$ctx$$)
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
    ctx.table__agent.pick__on(mount$ctx)
    ctx.row__agent.pick__on(mount$ctx)
    ctx.filter__rows__data__agent.pick__on(mount$ctx)
    ctx.row_id__agent.pick__on(mount$ctx)
    ctx.highlight__rows__data__agent.pick__on(mount$ctx)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.table__agent.pick__off(mount$ctx)
    ctx.row__agent.pick__off(mount$ctx)
    ctx.filter__rows__data__agent.pick__off(mount$ctx)
    ctx.row_id__agent.pick__off(mount$ctx)
    ctx.highlight__rows__data__agent.pick__off(mount$ctx)
  }
}