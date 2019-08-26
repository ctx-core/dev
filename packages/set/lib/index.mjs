import { _a1__wrap } from '@ctx-core/function';

/**
 * @module @ctx-core/set/lib.js
 */
/**
 * Returns a `set` with the _union of the members
 * @param {*|Array<Array>} nowrap__a2__member
 * @returns {Set} The _union of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
function _union(nowrap__a2__member) {
    const a1__nowrap__a1__member = _a1__wrap(nowrap__a2__member);
    let a1__member__set = [];
    for (let i = 0; i < a1__nowrap__a1__member.length; i++) {
        const a1__member = _a1__wrap(a1__nowrap__a1__member[i]);
        a1__member__set.push(...a1__member);
    }
    return new Set(a1__member__set);
}
const _union__set = _union;
/**
 * Returns a `set` with the _intersection of the members
 * @param {*|Array<Array>} __a2__member
 * @returns {Set} The _intersection of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
function _intersection(__a2__member) {
    const a1__nowrap__a1__member = _a1__wrap(__a2__member);
    const [__a1__root, ...a1__nowrap__a1__rest] = a1__nowrap__a1__member;
    const set__rest = _union(a1__nowrap__a1__rest);
    const a1__root = _a1__wrap(__a1__root);
    let a1__member__set = [];
    for (let i = 0; i < a1__root.length; i++) {
        const root = a1__root[i];
        if (set__rest.has(root))
            a1__member__set.push(root);
    }
    return new Set(a1__member__set);
}
const _intersection__set = _intersection;
/**
 * Returns a new set with a _difference of the array-like arguments.
 * @param {*|Array<Array>} __a2__member - An array-like to perform the _difference operation on.
 * @returns {Set} The _difference of the array-like arguments.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
function _difference(__a2__member) {
    const a1__nowrap__a1__member = _a1__wrap(__a2__member);
    const [__a1__root, ...a1__nowrap__a1__rest] = a1__nowrap__a1__member;
    const set__rest = _union(a1__nowrap__a1__rest);
    const a1__root = _a1__wrap(__a1__root);
    let a1__member__set = [];
    for (let i = 0; i < a1__root.length; i++) {
        const x = a1__root[i];
        if (!set__rest.has(x))
            a1__member__set.push(x);
    }
    return new Set(a1__member__set);
}
const _difference__set = _difference;

export { _difference, _difference__set, _intersection, _intersection__set, _union, _union__set };
