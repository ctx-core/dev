import {clone} from 'ctx-core/object/lib'
import {
  ctx_rows__agent,
  ctx_row__agent,
  columns__agent,
  ctx_rows$filter__agent,
  ctx_row_id__agent,
  ctx_rows$filter$highlight__agent
} from 'ctx-core/table/agent'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'msci_demo/tag'
export function mount__table(tag, ...mount$ctx$$) {
  log(`${logPrefix}|mount__table`)
  let ctx = tag.ctx
  const mount$ctx = clone(...mount$ctx$$)
  ctx_row_id__agent(ctx)
  ctx_rows__agent(ctx)
  ctx_row__agent(ctx)
  columns__agent(ctx)
  ctx_rows$filter__agent(ctx)
  ctx_rows$filter$highlight__agent(ctx)
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    ctx.columns__agent.pick__on(mount$ctx)
    ctx.ctx_rows__agent.pick__on(mount$ctx)
    ctx.ctx_row__agent.pick__on(mount$ctx)
    ctx.ctx_rows$filter__agent.pick__on(mount$ctx)
    ctx.ctx_row_id__agent.pick__on(mount$ctx)
    ctx.ctx_rows$filter$highlight__agent.pick__on(mount$ctx)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    ctx.columns__agent.pick__off(mount$ctx)
    ctx.ctx_rows__agent.pick__off(mount$ctx)
    ctx.ctx_row__agent.pick__off(mount$ctx)
    ctx.ctx_rows$filter__agent.pick__off(mount$ctx)
    ctx.ctx_row_id__agent.pick__off(mount$ctx)
    ctx.ctx_rows$filter$highlight__agent.pick__off(mount$ctx)
  }
}