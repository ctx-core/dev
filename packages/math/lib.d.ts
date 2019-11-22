export declare const PHI: number;
/**
 * Degrees to Radians
 * {number} degrees
 * @returns {number} radians
 */
export declare function _rad__deg(deg: any): number;
/**
 * Radians to Degrees
 * @param {number} rad
 * @returns {number} degrees
 */
export declare function _deg__rad(rad: any): number;
/**
 * Returns the negative of the numeric argument
 * @param {number} number
 * @returns {number}
 */
export declare function negative(number: any): number;
/**
 * Adds the arguments
 * @param {...number[]} a1__numerator
 * @returns {number}
 */
export declare function add(...a1__numerator: any[]): number;
/**
 * Multiplies the arguments
 * @param {number} a1__numerator
 * @returns {number}
 */
export declare function mul(product: any, ...a1__numerator: any[]): any;
/**
 * Subtracts each in a1__denominator from the value
 * @param {number} value
 * @param {number} a1__denominator
 * @returns {number}
 */
export declare function sub(value: any, ...a1__denominator: any[]): any;
/**
 * Divides each in a1__denominator from the value
 * @param {number} value
 * @param {number} a1__denominator
 * @returns {number}
 */
export declare function div(value: any, ...a1__denominator: any[]): any;
/**
 * Sum of the numerators
 * @param {number} numerators
 * @returns {number}
 */
export declare const _sum: typeof add;
export declare const sum: typeof add;
/**
 * Returns the sum of the values mapped by _numerator
 * @param {number=} a1
 * @param {function(number)} _numerator
 * @returns {number}
 */
export declare function _sum__fn(a1: any, _numerator: any): number;
/**
 * Returns the sum of the items in a1__numerator, adding 0 if an item is falsy.
 * @param {number[]} a1__numerator
 * @returns {number}
 */
export declare function _sum__numerator__or__0(a1__numerator: any): number;
/**
 * Averages the items in in a1
 * @param {number[]} a1
 * @param {function(number): number} _numerator
 * @returns {number}
 */
export declare function _avg__fn(a1: any, _numerator: any): number;
/**
 * Averages the items in in a1, adding 0 if the item is falsy
 * @param {number[]} a1__numerator
 * @returns {number}
 */
export declare function _avg__numerator__or__0(a1__numerator: any): number;
/**
 * Average of the a1__numerator
 * @param {number} a1__numerator
 * @returns {number}
 */
export declare function avg(...a1__numerator: any[]): number;
/**
 * Returns an array of eqidistant segment boundaries from the count & range
 * @param ctx
 * @param {int} ctx.segment$count - The number of segments in the return value (count of segment boundaries is `ctx.segment$count + 1`)
 * @param {array.<number>} ctx.range - sorted list of the range of values. `ctx.range[0]` - low, `_last(ctx.range)` - high
 * @returns {array.<number>}
 */
export declare function _a1__point__segment__equidistant(ctx: any): any[];
/**
 * Returns the index of the segment
 * @param value
 * @param {[]} a1__point
 * @returns {number}
 */
export declare function index__point__segment(value: any, a1__point: any): number;
