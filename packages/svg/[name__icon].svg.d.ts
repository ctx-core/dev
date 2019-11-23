/**
 * @typedef Request - Express request
 */
/**
 * @typedef Response - Express response
 */
export declare type Opts__get = {
    fn?: (req: any, res: any) => Promise<any>;
    resolve?: (path: string) => string;
};
/**
 * Returns a `get` http handler that processes the svelte component whose path
 * is returned from `opts.resolve`.
 * @param opts
 * @param {function(string)} opts.resolve - Function to resolve path from string
 * @returns {function(Request,Response)} {get}
 */
export declare function _get(opts?: Opts__get): (req: any, res: any) => Promise<void>;
