export declare function _hostname(): string;
/**
 * Remove hash from `window.location.href` without refreshing the page
 */
export declare function empty__location__window(): void;
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
export declare function _hash__url__string(url: any): any;
export declare const $hash__url__string: typeof _hash__url__string;
