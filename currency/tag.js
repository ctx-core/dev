import {assign} from 'ctx-core/object/lib'
import {format__currency,format__money} from 'ctx-core/currency/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/currency/tag'
export function mount__currency(tag) {
  log(`${logPrefix}|mount__currency`)
  assign(tag, {
    format__currency,
    format__money
  })
}