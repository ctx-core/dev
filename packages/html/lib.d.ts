export declare function escape__html(html__unsafe: any): any;
/**
 * Returns a string of attrs for an html element
 * @param {Object} obj - Key/Value pairs of the attrs
 * @returns {String} The attrs for an html element
 */
export declare function _attrs(obj: any): string;
/**
 * Returns class html attribute from obj
 * @param {Object} obj - key/value pairs of classes. Truthy values will have key class added. Falsy values will have key class ignored.
 * @returns {string} List of classes
 * @example
 * _class({class_1: true, class_2: false, class_3: true}) // returns 'class_1 class_3'
 */
export declare function _class(obj: any, ...a1__class: any[]): string;
/**
 * Assigns additional styles to the style attribute on the HTMLElement el.
 * @param {module:ctx-core/dom/lib~HTMLElement} el - Element to set style on. Existing styles are kept unless overwritten by obj.
 * @param {Object} styles - key/value pairs of the styles
 * @returns {module:ctx-core/dom/lib~HTMLElement}
 */
export declare function assign__style(el: any, styles: any): any;
/**
 * Returns class style attribute from obj
 * @param {Object} obj - key/value pairs of styles
 * @returns {string} style
 * @example
 * _style({position: 'absolute, left: '5px'}) // returns 'position: absolute; left: 5px;'
 */
export declare function _style(obj: any, ...a1__style: any[]): string;
/**
 * Parses a style string & returns an object with each style
 * @param {string} str__style
 * @returns {Object} key/value pair of styles
 * @example
 * $styles__obj('position: absolute; left: 5px;') // returns {position: 'absolute, left: '5px'}
 */
export declare function _OBJ__styles(str__style: any): {};
/**
 * Returns a string of escaped html
 * @param {string} unsafe
 * @returns {XML|string} - Escaped HTML
 */
export declare function _html(unsafe: any): any;
/**
 * html for css link tags
 * @returns {string}
 */
export declare function _html__links(): string;
/**
 * html for js script tags
 * @returns {string}
 */
export declare function _html__js(): string;
/**
 * versioned css file url
 * @param src__script
 */
export declare function _css__path__versioned(src__script: any): string;
