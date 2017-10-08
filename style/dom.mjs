import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/style/dom.mjs'
export function px__rem(rem=1) {
  log(`${logPrefix}|px__rem`)
  return rem * parseFloat(
    getComputedStyle(
      document.documentElement
    )
    .fontSize
  );
}
export function rem__px(px=16) {
  log(`${logPrefix}|rem__px`)
  return px / px__rem(1)
}