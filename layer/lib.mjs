/**
 * Layers methods
 * @module ctx-core/layer/lib
 */
import {assign} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/layer/lib.mjs'
/**
 * A representation of a css layer.
 * @typedef layer
 * @property {numeric} zIndex - The layer's z-index css property.
 */
/**
 * Returns a new layer.
 * @param {...layer$ctx} layer$ctx - Assigned to the new layer.
 * @returns {module:ctx-core/layer/lib~layer}
 */
export function $layer() {
  log(`${logPrefix}|$layer`)
  let layer = assign({
    zIndex: null
  }, ...arguments)
  return layer
}