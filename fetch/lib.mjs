/**
 * Module wrapping the fetch http client for ctx-core
 * @module ctx-core/fetch/lib
 */
/**
 * @typedef {Object} fetch$response
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response}
 */
/**
 * ctx used by Fetch function
 * @typedef {ctx__fetch} ctx__fetch
 * @property {string} method - HTTP method
 * @property {string} url - HTTP url
 * @property {object} headers - HTTP headers
 * @property {string} body - HTTP body
 * @property {fetch$response} response - The fetch response
 */
/**
 * Fetch API function with decorated methods.
 * @namespace fetch
 * @function fetch
 * @static
 * @param {...{module:ctx-core/fetch/lib~ctx__fetch}} ctx__fetch
 * @return {Promise<module:ctx-core/fetch/lib~ctx__fetch>}
 * @property {Fetch.$ctx__fetch} $ctx__fetch
 * @property {Fetch.ensure__headers} ensure__headers
 * @property {Fetch.http$get} http$get - HTTP GET generator
 * @property {Fetch.http$put} http$put - HTTP PUT generator
 * @property {Fetch.http$post} http$post - HTTP POST generator
 * @property {Fetch.http$delete} http$delete - HTTP DELETE generator
 * @property {Fetch.http$patch} http$patch - HTTP PATCH generator
 */
import {assign,clone,ensure} from 'ctx-core/object/lib'
import {concat__array} from 'ctx-core/array/lib'
import {throw__error} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/fetch/lib'
export const fetch = $fetch()
export const fetch2 = $fetch2()
export function $fetch() {
  log(`${logPrefix}|$fetch2`)
  let fetch__window
  if (typeof window === 'undefined') {
    fetch__window = require('isomorphic-fetch')
  } else {
    fetch__window = window.fetch
  }
  return fetch__window
}
/**
 * Creates a new fetch api function that returns a {@link Promise}.
 * @param {...Fetch$assign} Fetch$assign - {@link ctx} assigned onto new instance of Fetch
 * @return {Fetch}
 * @todo: Remove wrapping logic & use bare-bones fetch where possible
 */
export function $fetch2() {
  return assign(fetch2, {
    $ctx__fetch,
    ensure__headers,
    http$get,
    http$put,
    http$post,
    http$delete,
    http$patch
  }, ...arguments)
  function fetch2(ctx) {
    log(`${logPrefix}|fetch2`)
    const ctx__fetch = fetch2.$ctx__fetch(...arguments)
    if (!ctx__fetch.url && !ctx__fetch.path) {
      throw__error(ctx__fetch, {error_message: 'no url or path defined'}) }
    const method = $fetch$method(ctx__fetch)
        , url = $http$url(ctx__fetch)
        , {body} = ctx__fetch
    assign(ctx__fetch, {
      method,
      url,
      body
    })
    fetch2.ensure__headers(ctx__fetch, ctx)
    log(`${logPrefix}|fetch2|1`, `${ctx__fetch.method} ${url}`)
    return fetch(url, ctx__fetch).catch($fetch$catch(ctx__fetch))
  }
  function $fetch$catch(ctx__fetch) {
    return (ctx__error) => {
      assign(ctx__error, {error_message: ctx__error.toString()})
      throw__error(ctx__fetch, ctx__error)
    }
  }
  /**
   * HTTP GET generator function
   * @function http$get
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function http$get(ctx, ...ctx__fetch$$) {
    log(`${logPrefix}|http$get`)
    return fetch2(ctx, ...(concat__array(ctx__fetch$$, {method: 'GET'})))
  }
  /**
   * HTTP PUT generator function
   * @function http$put
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function http$put(ctx, ...ctx__fetch$$) {
    log(`${logPrefix}|http$put`)
    return fetch2(ctx, ...(concat__array(ctx__fetch$$, {method: 'PUT'})))
  }
  /**
   * HTTP POST generator function
   * @function http$post
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function http$post(ctx, ...ctx__fetch$$) {
    log(`${logPrefix}|http$post`)
    return fetch2(ctx, ...(concat__array(ctx__fetch$$, {method: 'POST'})))
  }
  /**
   * HTTP DELETE generator function
   * @function http$delete
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function http$delete(ctx, ...ctx__fetch$$) {
    log(`${logPrefix}|http$delete`)
    return fetch2(ctx, ...(concat__array(ctx__fetch$$, {method: 'DELETE'})))
  }
  /**
   * HTTP PATCH generator function
   * @function http$patch
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function http$patch(ctx, ...ctx__fetch$$) {
    log(`${logPrefix}|http$patch`)
    return fetch2(ctx, ...(concat__array(ctx__fetch$$, {method: 'PATCH'})))
  }
}
/**
 * Clones a new ctx__fetch from arguments
 * @function $ctx__fetch
 * @memberof Fetch
 * @param {...ctx} ctx - cloned ctx
 * @return {ctx__fetch}
 */
export function $ctx__fetch(ctx, ...ctx__fetch$$) {
  return clone(...ctx__fetch$$)
}
export function $fetch$method() {
  log(`${logPrefix}|$fetch$method`)
  const ctx__fetch = assign(...arguments)
  return (ctx__fetch.method || 'GET').toUpperCase()
}
export function $http$url() {
  log(`${logPrefix}|$http$url`)
  const ctx__fetch = assign(...arguments)
      , {url} = ctx__fetch
  return url
}
/**
 * Assigns http headers for fetch2 http request
 * @function ensure__headers
 * @memberof Fetch
 * @param {ctx__fetch} ctx__fetch
 * @param {...HTTP__Headers} headers
 * @returns {ctx__fetch}
 */
export function ensure__headers(ctx__fetch, ctx) {
  log(`${logPrefix}|ensure__headers`)
  ensure(ctx__fetch.headers || {}, ctx.headers || {})
  return ctx__fetch
}