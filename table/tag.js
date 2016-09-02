import {clone} from 'ctx-core/object/lib'
import {
  row$ctx$$__agent,
  row$ctx__agent,
  columns__agent,
  row$ctx$$__filter__agent,
  row_id__agent,
  row$ctx$$__filter__highlight__agent
} from 'ctx-core/table/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'msci_demo/tag'
export function mount__table(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__table`)
  let ctx = tag.ctx
  const mount$ctx = clone(...mount$ctx$$)
  row_id__agent(ctx)
  row$ctx$$__agent(ctx)
  row$ctx__agent(ctx)
  columns__agent(ctx)
  row$ctx$$__filter__agent(ctx)
  row$ctx$$__filter__highlight__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.columns__agent.pick__on(mount$ctx)
    ctx.row$ctx$$__agent.pick__on(mount$ctx)
    ctx.row$ctx__agent.pick__on(mount$ctx)
    ctx.row$ctx$$__filter__agent.pick__on(mount$ctx)
    ctx.row_id__agent.pick__on(mount$ctx)
    ctx.row$ctx$$__filter__highlight__agent.pick__on(mount$ctx)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.columns__agent.pick__off(mount$ctx)
    ctx.row$ctx$$__agent.pick__off(mount$ctx)
    ctx.row$ctx__agent.pick__off(mount$ctx)
    ctx.row$ctx$$__filter__agent.pick__off(mount$ctx)
    ctx.row_id__agent.pick__off(mount$ctx)
    ctx.row$ctx$$__filter__highlight__agent.pick__off(mount$ctx)
  }
}