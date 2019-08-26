'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var array = require('@ctx-core/array');

function parse__a1__arg(a1__arg) {
    const flag_regex = /^--?(.*)/;
    const h__flag = {};
    let i = 0;
    while (i < a1__arg.length) {
        const flag = a1__arg[i];
        const match = flag_regex.test(flag);
        if (match) {
            if (!flag_regex.test(a1__arg[i + 1])) {
                const value = a1__arg[i + 1];
                h__flag[flag] = value;
                i += 2;
                continue;
            }
        }
        h__flag[flag] = true;
        i += 1;
    }
    return h__flag;
}
function _a1__arg__default(a1__arg, defaults = {}) {
    const a1__arg__default = a1__arg.slice(0);
    const h__flag = parse__a1__arg(a1__arg__default);
    for (let dfn__flag in defaults) {
        const a1__flag = dfn__flag.split(/\s*,\s*/);
        if (array.every(a1__flag, flag => !(flag in h__flag))) {
            const value = defaults[dfn__flag];
            const value__ = typeof value === 'function' ? value() : value;
            const flag = array.find(a1__flag, flag => /^--/.test(flag))
                || a1__flag[0];
            a1__arg__default.push(flag, value__);
        }
    }
    return a1__arg__default;
}

exports._a1__arg__default = _a1__arg__default;
exports.parse__a1__arg = parse__a1__arg;
