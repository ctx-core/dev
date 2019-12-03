export declare function _version(opts?: any): any;
/**
 *
 * @param {*}ctx
 * @param src__script
 * @param opts
 * @returns {string}
 */
export declare function _versioned__js(src__script: any, opts?: {
    debug?: boolean;
    minify?: boolean;
}): string;
/**
 * versioned file
 * @param {*}ctx
 * @param {string} url
 * @returns {string}
 */
export declare function _versioned(url: string, opts?: any): string;
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
export declare function _query__version(opts?: any): string;
