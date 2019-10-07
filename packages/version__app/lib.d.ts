export declare function _version(ctx?: any): any;
/**
 *
 * @param {*}ctx
 * @param src__script
 * @param opts
 * @returns {string}
 */
export declare function _versioned__js(ctx: any, src__script: any, opts?: {
    debug?: boolean;
    minify?: boolean;
}): string;
/**
 * versioned file
 * @param {*}ctx
 * @param {string} url
 * @returns {string}
 */
export declare function _versioned(ctx: any, url: string): string;
/**
 * _versioned with ctx
 * @param {*}ctx
 * @returns {string}
 */
export declare function __versioned(ctx: any): (url: any) => string;
/**
 * version query param
 * @returns {string}
 */
export declare function _query__version(ctx: any): string;
