/**
 * @module @ctx-core/set/lib.js
 */
/**
 * Returns a `set` with the _union of the members
 * @param {*|Array<Array>} nowrap__a2__member
 * @returns {Set} The _union of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export declare function _union(nowrap__a2__member: any): Set<any>;
export declare const _union__set: typeof _union;
/**
 * Returns a `set` with the _intersection of the members
 * @param {*|Array<Array>} __a2__member
 * @returns {Set} The _intersection of the members
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export declare function _intersection(__a2__member: any): Set<any>;
export declare const _intersection__set: typeof _intersection;
/**
 * Returns a new set with a _difference of the array-like arguments.
 * @param {*|Array<Array>} __a2__member - An array-like to perform the _difference operation on.
 * @returns {Set} The _difference of the array-like arguments.
 * @see {@link http://www.2ality.com/2015/01/es6-set-operations.html}
 */
export declare function _difference(__a2__member: any): Set<any>;
export declare const _difference__set: typeof _difference;
