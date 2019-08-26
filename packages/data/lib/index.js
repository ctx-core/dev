'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var combinators = require('@ctx-core/combinators');
var array = require('@ctx-core/array');

/**
 * Returns a h1__filter with the values filtered by `fn`.
 * @param {{}} h1
 * @param {function}[fn]
 * @returns {h1__filter}
 */
function _h1__filter(h1, fn = combinators.I__) {
    if (!h1)
        return;
    const h1__filter = {};
    for (let key in h1) {
        h1__filter[key] = !!(fn(h1[key], key, h1));
    }
    return h1__filter;
}
/**
 * Returns a function that calls _h1__filter with fn
 * @param {function}[fn]
 * @returns {function<{{}}>}
 */
function _fn__h1__filter(fn = combinators.I__) {
    return h1 => _h1__filter(h1, fn);
}
/**
 * Returns a h1__filter where the value is a
 * boolean of whether the array has items present
 */
const _h1__present__a1 = _fn__h1__filter(array._present__a1);

exports._fn__h1__filter = _fn__h1__filter;
exports._h1__filter = _h1__filter;
exports._h1__present__a1 = _h1__present__a1;
