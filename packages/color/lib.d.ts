/**
 * Convert hex to a comma-delimited rgb string
 * @param hex
 * @returns {string}
 * @example
 * _rgb__hex('ABC') // '170,187,204'
 * _rgb__hex('123456') // '18,52,86'
 */
export declare function _str__hex__color__rgb__comma_delim(hex: any): string;
declare type Opts___a1__color__rgb__phi__hsv = {
    length: number;
    hsv: (number | string)[];
};
/**
 * Returns an array of colors with a given sv (`[saturation, value]`)
 * with h (hue) seperated by `1/PHI`
 * @param opts
 * @param {Integer} opts.length
 * @param {Array} opts.sv
 * @returns {Array}
 * @see {@link https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/}
 */
export declare function _a1__color__rgb__phi__hsv(opts: Opts___a1__color__rgb__phi__hsv): any[];
/**
 * Returns a rgb array value from the given `(h,s,v)` (Hue, Saturation, Value)
 * @param {Integer} h - Hue
 * @param {Integer} s - Saturation
 * @param {Integer} v - Value
 * @returns {[red,green,blue]}
 * @see {@link http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB}
 */
export declare function _a1__color__rgb__from__a1__color__hsv(a1__color__hsv: any): number[];
/**
 * Inverted color for a1__color__rgb as a1__color__rgb
 * @param a1__color__rgb
 * @returns {a1__color__rgb}
 */
export declare function invert__a1__color__rgb(a1__color__rgb: any): any;
export {};
