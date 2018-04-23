import {assign} from 'ctx-core/object/lib.mjs'
import {format__currency,format__money} from 'ctx-core/currency/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/currency/dom.mjs'
export function mount__currency(tag) {
  log(`${logPrefix}|mount__currency`)
  assign(tag, {
    format__currency,
    format__money
  })
}