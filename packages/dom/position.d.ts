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
 * Returns the `[left, top]` offset position of the given el
 * @param {HTMLElement} el
 * @returns {[number, number]}
 */
export declare function _xy__offset(el: any): any[];
