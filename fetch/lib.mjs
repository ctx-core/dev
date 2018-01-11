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
 * @property {Fetch.get__http} get__http - HTTP GET generator
 * @property {Fetch.put__http} put__http - HTTP PUT generator
 * @property {Fetch.post__http} post__http - HTTP POST generator
 * @property {Fetch.delete__http} delete__http - HTTP DELETE generator
 * @property {Fetch.patch__http} patch__http - HTTP PATCH generator
 */
import {assign,clone,ensure} from 'ctx-core/object/lib'
import {concat__array} from 'ctx-core/array/lib'
import {throw__error} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/fetch/lib.mjs'
export const fetch = $fetch()
export const fetch2 = $fetch2()
export function $fetch() {
  log(`${logPrefix}|$fetch`)
  const fetch =
          typeof window === 'undefined'
          ? require('isomorphic-fetch')
          : window.fetch
  return fetch
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
    get__http,
    put__http,
    post__http,
    delete__http,
    patch__http
  }, ...arguments)
  function fetch2(ctx) {
    log(`${logPrefix}|fetch2`)
    const ctx__fetch = fetch2.$ctx__fetch(...arguments)
    if (!ctx__fetch.url && !ctx__fetch.path) {
      throw__error(
        ctx__fetch,
        {error_message: 'no url or path defined'})
    }
    const method = $method__fetch(ctx__fetch)
        , url = $url__fetch(ctx__fetch)
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
   * @function get__http
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function get__http(ctx, ...array__ctx__fetch) {
    log(`${logPrefix}|get__http`)
    return fetch2(ctx, ...(concat__array(array__ctx__fetch, {method: 'GET'})))
  }
  /**
   * HTTP PUT generator function
   * @function put__http
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function put__http(ctx, ...array__ctx__fetch) {
    log(`${logPrefix}|put__http`)
    return fetch2(ctx, ...(concat__array(array__ctx__fetch, {method: 'PUT'})))
  }
  /**
   * HTTP POST generator function
   * @function post__http
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function post__http(ctx, ...array__ctx__fetch) {
    log(`${logPrefix}|post__http`)
    return fetch2(ctx, ...(concat__array(array__ctx__fetch, {method: 'POST'})))
  }
  /**
   * HTTP DELETE generator function
   * @function delete__http
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function delete__http(ctx, ...array__ctx__fetch) {
    log(`${logPrefix}|delete__http`)
    return fetch2(ctx, ...(concat__array(array__ctx__fetch, {method: 'DELETE'})))
  }
  /**
   * HTTP PATCH generator function
   * @function patch__http
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...ctx__fetch} ctx__fetch
   * @returns {ctx__fetch}
   */
  async function patch__http(ctx, ...array__ctx__fetch) {
    log(`${logPrefix}|patch__http`)
    return fetch2(ctx, ...(concat__array(array__ctx__fetch, {method: 'PATCH'})))
  }
}
/**
 * Clones a new ctx__fetch from arguments
 * @function $ctx__fetch
 * @memberof Fetch
 * @param {...ctx} ctx - cloned ctx
 * @return {ctx__fetch}
 */
export function $ctx__fetch(ctx, ...array__ctx__fetch) {
  return clone(...array__ctx__fetch)
}
export function $method__fetch() {
  const ctx__fetch = assign(...arguments)
  return (ctx__fetch.method || 'GET').toUpperCase()
}
export function $url__fetch() {
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
  ensure(ctx__fetch.headers || {}, ctx.headers || {})
  return ctx__fetch
}