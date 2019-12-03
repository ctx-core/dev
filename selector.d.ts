export declare function _has__dom(): boolean;
export declare const has__dom: typeof _has__dom;
export declare function _no__dom(): boolean;
export declare const no__dom: typeof _no__dom;
export declare function _if__has__dom(fn: any): (...args: any[]) => any;
export declare function _if__no__dom(fn: any): (...args: any[]) => any;
/**
 * The first matching HTMLElement from the selector
 * @param {string} selector - the DOM query selector
 * @param {HTMLElement=} parent
 * @returns {HTMLElement} the first HTMLElement matching the selector
 */
export declare function _dom(selector: any, parent?: HTMLElement): any;
/**
 * The first matching HTMLElement from the selector
 *
 * - If selector is an object, return selector.
 * @param {string,object} selector - the DOM query selector
 * @param {HTMLElement} parent
 * @returns {HTMLElement} the first HTMLElement matching the selector
 */
export declare function _dom2(selector: any, parent?: HTMLElement): any;
/**
 * All matching HTMLElements from the selector
 * @param {string} selector - the DOM query selector
 * @param {HTMLElement=} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export declare function _a1__dom(selector: any, parent?: any): any;
export declare const __dom: typeof _a1__dom;
export declare const _node_list__dom: typeof _a1__dom;
export declare const _NL__dom: typeof _a1__dom;
/**
 * All matching HTMLElements from the selector.
 *
 * - If selector is an object, return selector.
 * @param {string|*} selector - the DOM query selector
 * @param {HTMLElement=} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export declare function __dom2(selector: any, parent?: HTMLElement): any;
/**
 * Returns true if it is a DOM node
 * @param {object} obj
 * @returns {boolean}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
export declare function isNode(obj: any): boolean;
/**
 * Returns true if it is a DOM element
 * @param {object} obj
 * @returns {*}
 * @see {@link http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object}
 */
export declare function isElement(obj: any): boolean;
/**
 * Returns the first matching dom element in el -> ...parent
 * @param {HTMLElement} element
 * @param {string} selector
 * @param {boolean=} check__self
 * @returns {*|Node}
 */
export declare function closest(selector: any, element: any, check__self?: boolean): any;
export declare function _matches__vendor(): any;
