/**
 * number library
 * @module @ctx-core/number/lib
 */
/**
 * @type {number}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number}
 */
export declare const INT__MAX = 9007199254740991;
export declare const INT__MIN = -9007199254740991;
/**
 * Convert hex to int
 * @param {string} hex
 * @returns {Int}
 */
export declare function _int__hex(hex: any): number;
/**
 * Convert int to hex
 * @param {Int} rgb
 * @returns {string}
 */
export declare function _hex__int(rgb: any): any;
/**
 * @property {number} power represented as a string
 * @typedef denominations
 * @example
 * {7: 'mn', 10: 'bn', 13: 'tn'}
 */
/**
 * Normalization text for a number
 * @param {number} number
 * @param {module:@ctx-core/number/lib~denominations} denominations
 * @returns {string}
 * @example
 * `$${abbreviate__number(amount, {6: 'mm', 9: 'bn', 12: 'tn'})}`
 */
export declare function abbreviate__number(number: any, denominations: any): string;
export declare function format__commas(number: any): any;
export declare function unformat__commas(string: any): any;
export declare function format__percentage(number: any): string;
export declare function unformat__percentage(percentage: any): number;
export declare function isNaN__float(number: any): boolean;
export declare function isFloat(number: any): boolean;
export declare const isNumber: typeof isFloat;
export declare function increment__sequence(): number;
export declare function _text__number__or__mdash(number: any): string;
