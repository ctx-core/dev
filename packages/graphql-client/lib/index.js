'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var object = require('@ctx-core/object');
require('@ctx-core/logger');

const use_chalk = typeof window === 'undefined' && typeof require === 'function';
const chalk = _chalk();
function _chalk() {
	if (use_chalk) {
		return require('chalk')
	} else {
		return function chalk(...args) {
			return args
		}
	}
}

/**
 * dom library
 * @module @ctx-core/dom/lib.js
 */
function _has__dom() {
	return typeof window === 'object'
}
function _no__dom() {
	return typeof window === 'undefined'
}

/**
 * Module wrapping the fetch http client for ctx-core
 * @module @ctx-core/fetch/lib
 */
let fn__fetch;
async function fetch() {
	if (!fn__fetch) fn__fetch = await _fetch();
	return fn__fetch(...arguments)
}
async function _fetch() {
	return (
		_no__dom()
		? require('isomorphic-fetch')
		: window.fetch
	)
}
const Response =
	_no__dom()
	? require('isomorphic-fetch').Response
	: window.Response;
const Request = _no__dom() ? require('isomorphic-fetch').Request : window.Request;

function _fetch__graphql(url, headers__1 = {}, http_opts__1 = {}) {
    return async function fetch__graphql(body, headers__2 = {}, http_opts__2 = {}) {
        const response = await fetch(url, object.assign({
            method: 'POST',
            headers: object.assign({
                'Content-Type': 'application/json',
            }, headers__1, headers__2),
            body,
        }, http_opts__1, http_opts__2));
        if (!response.ok) {
            throw `Error fetching graphql`;
        }
        const payload = await response.json();
        if (payload.errors)
            throw payload;
        return payload;
    };
}
function _url__graphql(host = '127.0.0.1') {
    if (_has__dom())
        return '/graphql';
    const host_port = `${host}${_txt__port__graphql()}`;
    return `http://${host_port}/graphql`;
}
function _txt__port__graphql(port = process.env.PORT) {
    return (port || 80) === 80 ? '' : `:${port}`;
}
const fetch__graphql = _fetch__graphql(_url__graphql());

exports._fetch__graphql = _fetch__graphql;
exports._txt__port__graphql = _txt__port__graphql;
exports._url__graphql = _url__graphql;
exports.fetch__graphql = fetch__graphql;
