import {clone} from 'ctx-core/object/lib'
import {throw__error} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth/tag'
export function mount__authentication(tag, ...opts$ctx$$) {
  log(`${logPrefix}|mount__authentication`)
  let ctx = tag.ctx
  const opts$ctx = clone(...opts$ctx$$)
      , authentication__agent = opts$ctx.authentication__agent
  if (!authentication__agent) {
    throw__error(ctx, 'Missing opts$ctx.authentication__agent') }
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    authentication__agent.pick__on({on$change__authentication})
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    authentication__agent.pick__off({on$change__authentication})
  }
  function on$change__authentication() {
    log(`${logPrefix}|on$change__authentication`)
    tag.update__ctx()
  }
}