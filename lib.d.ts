import { falsy } from '@ctx-core/function';
import { I__ } from '@ctx-core/combinators';
export declare type h1__filter = {
    [key: string]: boolean;
};
/**
 * Returns a h1__filter with the values filtered by `fn`.
 * @param {{}} h1
 * @param {function}[fn]
 * @returns {h1__filter}
 */
export declare function _h1__filter(h1: falsy | any, fn?: typeof I__): falsy | h1__filter;
/**
 * Returns a function that calls _h1__filter with fn
 * @param {function}[fn]
 * @returns {function<{{}}>}
 */
export declare function _fn__h1__filter(fn?: typeof I__): (h1: any) => false | "" | 0 | h1__filter;
/**
 * Returns a h1__filter where the value is a
 * boolean of whether the array has items present
 */
export declare const _h1__present__a1: (h1: any) => false | "" | 0 | h1__filter;
