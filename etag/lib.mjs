/*!
 * Fork of jshttp/etag
 * @see {@link https://github.com/jshttp/etag}
 */
'use strict'
import crypto from 'crypto'
import fs from 'fs'
/**
 * Module dependencies.
 * @private
 */
const {Stats} = fs
    , base64PadCharRegExp = /=+$/
    , {toString} = Object.prototype
/**
 * Create a simple ETag.
 *
 * @param {string|Buffer|Stats} entity
 * @param {object} [options]
 * @param {boolean} [options.weak]
 * @return {String}
 * @public
 */
export function _etag(entity, options) {
  if (entity == null) {
    throw new TypeError('argument entity is required')
  }
  // support fs.Stats object
  const isStats = _isStats(entity)
      , weak = options && typeof options.weak === 'boolean'
        ? options.weak
        : isStats
  // validate argument
  if (
    !isStats
    && typeof entity !== 'string'
    && !Buffer.isBuffer(entity)
  ) {
    throw new TypeError('argument entity must be string, Buffer, or fs.Stats')
  }
  // generate entity tag
  const tag = isStats
        ? stattag(entity)
        : entitytag(entity)
  return weak ? `W/${tag}` : tag
}
/**
 * Generate an entity tag.
 *
 * @param {Buffer|string} entity
 * @return {string}
 * @private
 */
function entitytag(entity) {
  if (entity.length === 0) {
    // fast-path empty
    return '"0-1B2M2Y8AsgTpgAmY7PhCfg"'
  }
  // compute hash of entity
  const hash =
          crypto
          .createHash('md5')
          .update(entity, 'utf8')
          .digest('base64')
          .replace(base64PadCharRegExp, '')
  // compute length of entity
  const len = typeof entity === 'string'
        ? Buffer.byteLength(entity, 'utf8')
        : entity.length
  return `"${len.toString(16)}-${hash}"`
}
/**
 * Determine if object is a Stats object.
 *
 * @param {object} obj
 * @return {boolean}
 * @api private
 */
function _isStats(obj) {
  // genuine fs.Stats
  if (typeof Stats === 'function' && obj instanceof Stats) {
    return true
  }
  // quack quack
  return  obj
          && typeof obj === 'object'
          && 'ctime' in obj
          && toString.call(obj.ctime) === '[object Date]'
          && 'mtime' in obj
          && toString.call(obj.mtime) === '[object Date]'
          && 'ino' in obj
          && typeof obj.ino === 'number'
          && 'size' in obj
          && typeof obj.size === 'number'
}
/**
 * Generate a tag for a stat.
 *
 * @param {object} stat
 * @return {string}
 * @private
 */
function stattag(stat) {
  const mtime = stat.mtime.getTime().toString(16)
      , size = stat.size.toString(16)
  return `"${size}-${mtime}"`
}