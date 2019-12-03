declare type opts__get__asset = {
    key__asset: string;
    dir__root: string;
};
/**
 * @typedef opts__get__asset
 * @param {string}[key__asset]
 * @param {string}[dir__root]
 */
/**
 * GET asset
 * @param opts
 * @returns {get__asset}
 * @private
 */
export declare function _get__asset(opts: opts__get__asset): (_: any, res: any) => Promise<void>;
export {};
