import {clone} from 'ctx-core/object/lib'
import {throw__error} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth/tag'
export function mount__authentication(tag, ...array__opts) {
  log(`${logPrefix}|mount__authentication`)
  let {ctx} = tag
  const opts = clone(...array__opts)
      , {agent__authentication} = opts
  if (!agent__authentication) {
    throw__error(ctx, 'Missing opts.agent__authentication') }
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  return tag
  function on$mount() {
    log(`${logPrefix}|on$mount`)
    agent__authentication.on('change', on$change__authentication)
  }
  function on$unmount() {
    log(`${logPrefix}|on$unmount`)
    agent__authentication.off('change', on$change__authentication)
  }
  function on$change__authentication() {
    log(`${logPrefix}|on$change__authentication`)
    tag.update()
  }
}