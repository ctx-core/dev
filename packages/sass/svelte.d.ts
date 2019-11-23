/**
 * @typedef AST__PostCSS
 */
declare type Opts__builder = {
    postcss_plugins?: any[];
};
/**
 * Builder Function that returns a style__sass preprocessor for Svelte.
 * @param opts__builder
 * @param opts__builder.postcss_plugins [autoprefixer]: Plugins for postcss
 * @returns {function(*): Promise<{code, map}>}
 */
export declare function _style__sass(opts__builder?: Opts__builder): (opts: any) => Promise<unknown>;
/**
 * Default style__sass preprocessor for Svelte.
 * @param opts.filename
 * @param opts.content
 * @param opts.attributes
 * @returns {Promise<{code, map}>} A promise returning `{ code, map }`
 */
export declare const style__sass: (opts: any) => Promise<unknown>;
export declare const style: (opts: any) => Promise<unknown>;
/**
 * Takes a postcss ast & wraps each selector with the `:global()` svelte css directive.
 * @param {AST__PostCSS} ast
 * @returns {AST__PostCSS}
 */
export declare function globalize(ast: any): any;
export declare function _preprocess__sass(opts__builder?: {}): {
    style: (opts: any) => Promise<unknown>;
};
export {};
