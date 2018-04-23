import {$style} from 'ctx-core/html/lib.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/ripple-effect/lib.mjs'
export function __click__ripple_effect(e) {
  log(`${logPrefix}|__click__ripple_effect`)
  const { currentTarget
        , clientX
        , clientY
        } = e
      , { left: left__currentTarget
        , top: top__currentTarget
        } = currentTarget.getBoundingClientRect()
      , div = document.createElement('div')
      , {offsetHeight, offsetWidth} = currentTarget
      , length = Math.min(offsetHeight, offsetWidth)
      , style = {
          height: length,
          width: length}
      , color__ripple =
          currentTarget.getAttribute('color__ripple')
  style.top =
    (clientY - top__currentTarget) - length/2
  style.left =
    (clientX - left__currentTarget) - length/2
  if (color__ripple) {
    style.background = color__ripple
  }
  div.classList.add('ripple-effect')
  div.setAttribute('style', $style(style))
  currentTarget.appendChild(div)
  window.setTimeout(
    () => currentTarget.removeChild(div),
    2000)
}