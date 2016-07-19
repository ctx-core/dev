/**
 * Module wrapping the fetch http client for ctx-core
 * @module ctx-core/fetch/lib
 */
/**
 * Fetch API function with decorated methods.
 * @namespace Fetch
 * @arg {...ctx} ctx - created by new__fetch$ctx
 * @return {Promise}
 * @property {Fetch.new__fetch$ctx} new__fetch$ctx
 * @property {Fetch.assign__headers} assign__headers
 * @property {Fetch.http$get} http$get - HTTP GET generator
 * @property {Fetch.http$put} http$put - HTTP PUT generator
 * @property {Fetch.http$post} http$post - HTTP POST generator
 * @property {Fetch.http$delete} http$delete - HTTP DELETE generator
 * @property {Fetch.http$patch} http$patch - HTTP PATCH generator
 */
import {assign,clone} from "ctx-core/object/lib";
import {array$concat} from "ctx-core/array/lib";
import {throw__error} from "ctx-core/error/lib";
import {log,error,debug} from "ctx-core/logger/lib";
import isomorphic$fetch from "isomorphic-fetch";
export let fetch = new__fetch();
const logPrefix = "ctx-core/fetch/lib";
/**
 * Creates a new fetch api function that returns a {@link Promise}.
 * @arg {...Fetch$assign} Fetch$assign - {@link ctx} assigned onto new instance of Fetch
 * @return {Fetch}
 * @todo: Remove wrapping logic & use bare-bones fetch where possible
 */
export function new__fetch() {
  return assign(fetch, {
    new__fetch$ctx: new__fetch$ctx,
    assign__headers: assign__headers,
    http$get: http$get,
    http$put: http$put,
    http$post: http$post,
    http$delete: http$delete,
    http$patch: http$patch
  }, ...arguments);
  function fetch() {
    log(`${logPrefix}|fetch`);
    const fetch$ctx = fetch.new__fetch$ctx(...arguments);
    if (!fetch$ctx.url && ! fetch$ctx.path) {
      throw__error(fetch$ctx, {error_message: "no url or path defined"}); }
    const method = new__fetch$method(fetch$ctx)
        , url = new__http$url(fetch$ctx)
        , body = fetch$ctx.body;
    assign(fetch$ctx, {
      method: method,
      url: url,
      body: body
    });
    fetch.assign__headers(fetch$ctx);
    return isomorphic$fetch(url, fetch$ctx)
      .then(new__fetch$then(fetch$ctx))
      .catch(new__fetch$catch(fetch$ctx))
  }
  /**
   * Clones a new fetch$ctx from arguments
   * @function new__fetch$ctx
   * @memberof Fetch
   * @arg {...ctx} ctx - cloned ctx
   * @return {fetch$ctx}
   */
  function new__fetch$ctx() {
    return clone(...arguments);
  }
  function new__fetch$then(fetch$ctx) {
    return (response) => {
      log(`${logPrefix}|new__fetch$then|fn`);
      assign(fetch$ctx, {response: response, http$response: response});
      return fetch$ctx;
    }
  }
  function new__fetch$catch(fetch$ctx) {
    return (error_message) => {
      log(`${logPrefix}|new__fetch$catch|fn`);
      error("Connection Error");
      error(`${logPrefix}|new__fetch$catch`, error_message);
      assign(fetch$ctx, {error_message: error_message});
      return fetch$ctx;
    };
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
    log(`${logPrefix}|http$get`);
    return yield fetch(ctx, ...(array$concat(fetch$ctx$$, {method: "GET"})));
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
    log(`${logPrefix}|http$put`);
    return yield fetch(ctx, ...(array$concat(fetch$ctx$$, {method: "PUT"})));
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
    log(`${logPrefix}|http$post`);
    return yield fetch(ctx, ...(array$concat(fetch$ctx$$, {method: "POST"})));
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
    log(`${logPrefix}|http$delete`);
    return yield fetch(ctx, ...(array$concat(fetch$ctx$$, {method: "DELETE"})));
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
    log(`${logPrefix}|http$patch`);
    return yield fetch(ctx, ...(array$concat(fetch$ctx$$, {method: "PATCH"})));
  }
}
export function new__fetch$descriptor() {
  log(`${logPrefix}|new__fetch$descriptor`);
  const fetch$ctx = assign(...arguments);
  return `${new__fetch$method(fetch$ctx)} ${new__http$url(fetch$ctx)}`;
}
export function new__fetch$method() {
  log(`${logPrefix}|new__fetch$method`);
  const fetch$ctx = assign(...arguments);
  return (fetch$ctx.method || "GET").toUpperCase();
}
export function new__http$url() {
  log(`${logPrefix}|new__http$url`);
  const fetch$ctx = assign(...arguments)
      , url = fetch$ctx.url || `${fetch$ctx.url$base || ""}${fetch$ctx.path}`;
  return url;
}
/**
 * Assigns http headers for fetch http request
 * @function assign__headers
 * @memberof Fetch
 * @arg {fetch$ctx} fetch$ctx
 * @arg {...HTTP__Headers} headers
 * @returns {fetch$ctx}
 */
export function assign__headers(fetch$ctx, ...headers) {
  log(`${logPrefix}|assign__headers`);
  if (!fetch$ctx.headers) fetch$ctx.headers = clone(...headers);
  return fetch$ctx;
}
/**
 * ctx used by Fetch function
 * @typedef {fetch$ctx} fetch$ctx
 * @property {string} method - HTTP method
 * @property {string} url - HTTP url
 * @property {string} url$base - Concatenated with path. Used only if url is not defined.
 * @property {string} path - Concatenated with url$base. Used only if url is not defined.
 * @property {object} headers - HTTP headers
 * @property {string} body - HTTP body
 */