/**
 * @typedef opts__builder
 * @property {function<boolean>} _match - Returns whether or not to process this markup as markdown
 */
/**
 * @typedef opts__preprocess
 * @property {string} content
 * @property {string} filename
 * @property {string} attributes
 */
/**
 * @typedef ctx__code__map
 * @property {string} code
 * @property {string} map
 */
export declare function compose__a1__preprocess(a1__preprocess: any): {
    markup: (opts__preprocess?: {}) => Promise<any>;
    script: (opts__preprocess?: {}) => Promise<any>;
    style: (opts__preprocess?: {}) => Promise<any>;
};
export declare const _preprocess: typeof compose__a1__preprocess;
