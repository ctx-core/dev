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
export declare function _dom(selector: any, parent: any): any;
/**
 * The first matching HTMLElement from the selector
 *
 * - If selector is an object, return selector.
 * @param {string,object} selector - the DOM query selector
 * @param {HTMLElement} parent
 * @returns {HTMLElement} the first HTMLElement matching the selector
 */
export declare function _dom2(selector: any, parent: any): any;
/**
 * All matching HTMLElements from the selector
 * @param {string} selector - the DOM query selector
 * @param {HTMLElement=} parent
 * @returns {NodeList} a NodeList of the HTMLElements matching the selector
 */
export declare function _a1__dom(selector: any, parent: any): any;
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
export declare function __dom2(selector: any, parent: any): any;
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
export declare function closest(selector: any, element: any, check__self: any): any;
export declare function _matches__vendor(): any;
export declare function offset(el: any): {
    top: number;
    left: number;
};
/**
 * Is the HTMLElement hidden?
 * @param {HTMLElement} el
 * @returns {boolean} true if `el` is hidden
 */
export declare function is_hidden(el: any): boolean;
/**
 * Is the HTMLElement visible?
 * @param {HTMLElement} el
 * @returns {boolean} true if `el` is visible
 */
export declare function is_visible(el: any): boolean;
/**
 * The constructor for DOM element name__element
 * @param {string} name__element
 * @returns {Function} The {@link HTMLElement} constructor
 */
export declare function constructor__element(name__element: any): any;
/**
 * The ctx from the query params in `window.location.hash` formatted as a url
 * @typedef {ctx} query__hash__location
 */
/**
 * Returns an query__hash__location
 * @param {Object.<string,function>} ctx__transform- Transform Functions for the `window.location.anchor` query params
 * @returns {query__hash__location}
 * @example
 * $query__hash__location({
 *	 id: parseInt
 * })
 */
export declare function _query__hash__location(ctx__transform: any): {};
export declare const $query__hash__location: typeof _query__hash__location;
/**
 * Scroll to the top of the parentElement
 * @param {Node} el
 * @param {boolean=} scrollWindow=true
 * @returns {Node}
 */
export declare function scrollTop(el: any, scrollWindow?: boolean): any;
/**
 * Returns the `[left, top]` offset position of the given el
 * @param {HTMLElement} el
 * @returns {[number, number]}
 */
export declare function _xy__offset(el: any): any[];
/**
 * Remove hash from `window.location.href` without refreshing the page
 */
export declare function empty__location__window(): void;
export declare function contains__class(el: any, class_name: any): any;
export declare const has__class: typeof contains__class;
export declare function set__class(el: any, class_name: any, value: any): any;
export declare function add__class(el: any, class_name: any): any;
export declare function toggle__class(el: any, class_name: any): any;
export declare function remove__class(el: any, class_name: any): any;
export declare function check__element(el: any): any;
export declare function _hash__url__string(url: any): any;
export declare const $hash__url__string: typeof _hash__url__string;
export declare function _BoundingClientRect(el: any): {
    top: any;
    bottom: any;
    left: any;
    right: any;
    height: any;
    width: any;
    length: any;
};
export declare function __click__anchor__scroll(event: any, root: any): void;
export declare function anchor__scroll(href: any, root: any): void;
export declare function scrollIntoView__child__collection(parent: any, child: any): void;
export declare function _hostname(): string;
export declare function _bcr__scroll(node: any, scroll_node?: HTMLElement): {
    top: any;
    right: number;
    bottom: number;
    left: any;
    height: any;
    width: any;
    x: any;
    y: any;
};
export declare function _bcr__offset(node: any): {
    top: any;
    right: any;
    bottom: any;
    left: any;
    height: any;
    width: any;
    x: any;
    y: any;
};
export declare function trigger__native_event(node: any, event_name: any, bubbles?: boolean, cancelable?: boolean): Event;
export declare function trigger__custom_event(node: any, event_name: any, detail?: {}): any;
