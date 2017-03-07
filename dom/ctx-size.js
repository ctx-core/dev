import {tag__assign} from 'ctx-core/riot/tag'
import {assign} from 'ctx-core/object/lib'
import {$dom} from 'ctx-core/dom/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/dom/ctx-size'
export function init(tag) {
  log(`${logPrefix}|init`)
  tag__assign(tag, {
    registerElement: ['ctx-lte-960', 'ctx-gte-768', 'ctx-lte-650', 'ctx-lte-480']
  })
  const {ctx, root} = tag
      , getComputedStyle = window.getComputedStyle
  let $isLte960, $isGte768, $isLte650, $isLte480
  tag.on('mount', on$mount)
  tag.on('unmount', on$unmount)
  console.log(logPrefix)
  // TODO: Handle window.onresize
  function on$mount() {
    console.log(`${logPrefix}|on$mount`)
    $isLte960 = $dom('ctx-lte-960', root)
    $isGte768 = $dom('ctx-gte-768', root)
    $isLte650 = $dom('ctx-lte-650', root)
    $isLte480 = $dom('ctx-lte-480', root)
    assign(tag.ctx, {
      isLte960,
      isLte650,
      isLte768,
      isLte480
    })
  }
  function on$unmount() {
    console.log(`${logPrefix}|on$mount`)
    ctx.isLte480 = null
    ctx.isLte650 = null
    ctx.isGte768 = null
    ctx.isLte960 = null
  }
  function isLte960() {
    console.log(`${logPrefix}|isLte960`)
    return getComputedStyle($isLte960).display === 'block'
  }
  function isLte768() {
    console.log(`${logPrefix}|isLte768`)
    return getComputedStyle($isLte768).display === 'block'
  }
  function isLte650() {
    console.log(`${logPrefix}|isLte650`)
    return getComputedStyle($isLte650).display === 'block'
  }
  function isLte480() {
    console.log(`${logPrefix}|isLte480`)
    return getComputedStyle($isLte480).display === 'block'
  }
}