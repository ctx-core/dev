import './string.includes.polyfill';
export declare function _acronym(string: any): any;
export declare function isString(obj: any): boolean;
export declare function lPad(str: any, padString: any, length: any): any;
export declare function rPad(str: any, padString: any, length: any): any;
export declare function splice__string(str: any, idx: any, rem: any, s: any): any;
export declare function _title_case(str: any): any;
export declare const titleCase: typeof _title_case;
export declare const toTitleCase: typeof _title_case;
export declare const titleCase__string: typeof _title_case;
/**
 * Applies Array#splice semantics on a string.
 * A new string is returned instead rather than mutating the original `str` argument.
 *
 * @param str
 * @param index
 * @param count
 * @param add
 * @returns {*}
 * @see {@link https://stackoverflow.com/a/21350614/142571}
 */
export declare function splice__str(str: any, index?: number, count?: number, add?: any): any;
export declare function isUpperCase(word: any): boolean;
export declare function isLowerCase(word: any): boolean;
