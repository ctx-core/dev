import {$style} from 'ctx-core/html/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/ripple-effect/lib'
export function onclick__ripple_effect(e) {
  log(`${logPrefix}|onclick__ripple_effect`)
  const { currentTarget
        , clientX
        , clientY} = e
      , { left: left__currentTarget
        , top: top__currentTarget} = currentTarget.getBoundingClientRect()
      , $ripple = document.createElement('div')
      , {offsetHeight: length} = currentTarget
      , style = {
          height: length,
          width: length
        }
      , ripple_color = currentTarget.getAttribute('data-ripple-color')
  style.top = (clientY - top__currentTarget) - length/2
  style.left = (clientX - left__currentTarget) - length/2
  if (ripple_color) style.background = ripple_color
  $ripple.classList.add('ripple-effect')
  $ripple.setAttribute('style', $style(style))
  currentTarget.appendChild($ripple)
  window.setTimeout(() => {
    currentTarget.removeChild($ripple)
  }, 2000)
}