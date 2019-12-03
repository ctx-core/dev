import '@ctx-core/svelte/preprocess';
export declare type Opts__fn_markup = {
    _match?: ({ filename: string }: {
        filename: any;
    }) => string;
};
/**
 * Returns a svg preprocessor for svelte-rollup.
 * @param {opts__builder} opts__builder
 * @returns {function(opts__preprocess): {ctx__code__map}}
 */
export declare function _markup(opts__builder?: Opts__fn_markup): (opts: any) => Promise<{
    code: any;
    map: any;
}>;
export declare const markup: (opts: any) => Promise<{
    code: any;
    map: any;
}>;
export declare const markup__markdown: (opts: any) => Promise<{
    code: any;
    map: any;
}>;
export declare function _preprocess__svg(opts__builder?: {}): {
    markup: (opts: any) => Promise<{
        code: any;
        map: any;
    }>;
};
