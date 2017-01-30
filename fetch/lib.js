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
 * @typedef {fetch$ctx} fetch$ctx
 * @property {string} method - HTTP method
 * @property {string} url - HTTP url
 * @property {string} url_base - Concatenated with path. Used only if url is not defined.
 * @property {string} path - Concatenated with url_base. Used only if url is not defined.
 * @property {object} headers - HTTP headers
 * @property {string} body - HTTP body
 * @property {fetch$response} response - The fetch response
 */
/**
 * Fetch API function with decorated methods.
 * @namespace fetch
 * @function fetch
 * @static
 * @param {...{module:ctx-core/fetch/lib~fetch$ctx}} fetch$ctx
 * @return {Promise<module:ctx-core/fetch/lib~fetch$ctx>}
 * @property {Fetch.$fetch$ctx} $fetch$ctx
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
export let fetch = $fetch()
const logPrefix = 'ctx-core/fetch/lib'
/**
 * Creates a new fetch api function that returns a {@link Promise}.
 * @param {...Fetch$assign} Fetch$assign - {@link ctx} assigned onto new instance of Fetch
 * @return {Fetch}
 * @todo: Remove wrapping logic & use bare-bones fetch where possible
 */
export function $fetch() {
  return assign(fetch, {
    $fetch$ctx,
    ensure__headers,
    http$get,
    http$put,
    http$post,
    http$delete,
    http$patch
  }, ...arguments)
  function fetch(ctx) {
    log(`${logPrefix}|fetch`)
    const fetch$ctx = fetch.$fetch$ctx(...arguments)
    if (!fetch$ctx.url && !fetch$ctx.path) {
      throw__error(fetch$ctx, {error_message: 'no url or path defined'}) }
    const method = $fetch$method(fetch$ctx)
        , url = $http$url(fetch$ctx)
        , {body} = fetch$ctx
    assign(fetch$ctx, {
      method,
      url,
      body
    })
    fetch.ensure__headers(fetch$ctx, ctx)
    log(`${logPrefix}|fetch|1`, `${fetch$ctx.method} ${url}`)
    let isomorphic$fetch
    if (typeof window === 'object') {
      isomorphic$fetch = window.fetch
    } else {
      isomorphic$fetch = require('isomorphic-fetch')
    }
    return isomorphic$fetch(url, fetch$ctx)
      .then($fetch$then(fetch$ctx))
      .catch($fetch$catch(fetch$ctx))
  }
  function $fetch$then(fetch$ctx) {
    return (response) => {
      assign(fetch$ctx, {response, http$response: response})
      return fetch$ctx
    }
  }
  function $fetch$catch(fetch$ctx) {
    return (error$ctx) => {
      assign(error$ctx, {error_message: error$ctx.toString()})
      throw__error(fetch$ctx, error$ctx)
    }
  }

  /**
   * HTTP GET generator function
   * @function http$get
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...fetch$ctx} fetch$ctx
   * @returns {fetch$ctx}
   */
  function *http$get(ctx, ...fetch$ctx$$) {
    log(`${logPrefix}|http$get`)
    return yield fetch(ctx, ...(concat__array(fetch$ctx$$, {method: 'GET'})))
  }

  /**
   * HTTP PUT generator function
   * @function http$put
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...fetch$ctx} fetch$ctx
   * @returns {fetch$ctx}
   */
  function *http$put(ctx, ...fetch$ctx$$) {
    log(`${logPrefix}|http$put`)
    return yield fetch(ctx, ...(concat__array(fetch$ctx$$, {method: 'PUT'})))
  }
  /**
   * HTTP POST generator function
   * @function http$post
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...fetch$ctx} fetch$ctx
   * @returns {fetch$ctx}
   */
  function *http$post(ctx, ...fetch$ctx$$) {
    log(`${logPrefix}|http$post`)
    return yield fetch(ctx, ...(concat__array(fetch$ctx$$, {method: 'POST'})))
  }
  /**
   * HTTP DELETE generator function
   * @function http$delete
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...fetch$ctx} fetch$ctx
   * @returns {fetch$ctx}
   */
  function *http$delete(ctx, ...fetch$ctx$$) {
    log(`${logPrefix}|http$delete`)
    return yield fetch(ctx, ...(concat__array(fetch$ctx$$, {method: 'DELETE'})))
  }
  /**
   * HTTP PATCH generator function
   * @function http$patch
   * @memberof Fetch
   * @param {ctx} ctx
   * @param {...fetch$ctx} fetch$ctx
   * @returns {fetch$ctx}
   */
  function *http$patch(ctx, ...fetch$ctx$$) {
    log(`${logPrefix}|http$patch`)
    return yield fetch(ctx, ...(concat__array(fetch$ctx$$, {method: 'PATCH'})))
  }
}
/**
 * Clones a new fetch$ctx from arguments
 * @function $fetch$ctx
 * @memberof Fetch
 * @param {...ctx} ctx - cloned ctx
 * @return {fetch$ctx}
 */
export function $fetch$ctx(ctx, ...fetch$ctx$$) {
  return clone(...fetch$ctx$$)
}
export function $fetch$method() {
  log(`${logPrefix}|$fetch$method`)
  const fetch$ctx = assign(...arguments)
  return (fetch$ctx.method || 'GET').toUpperCase()
}
export function $http$url() {
  log(`${logPrefix}|$http$url`)
  const fetch$ctx = assign(...arguments)
      , url =
          fetch$ctx.url
          || `${fetch$ctx.url_base || ''}${fetch$ctx.path}`
  return url
}
/**
 * Assigns http headers for fetch http request
 * @function ensure__headers
 * @memberof Fetch
 * @param {fetch$ctx} fetch$ctx
 * @param {...HTTP__Headers} headers
 * @returns {fetch$ctx}
 */
export function ensure__headers(fetch$ctx, ctx) {
  log(`${logPrefix}|ensure__headers`)
  ensure(fetch$ctx.headers || {}, ctx.headers || {})
  return fetch$ctx
}