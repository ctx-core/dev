import '@ctx-core/svelte/preprocess';
declare type Opts__builder = {
    extension?: string;
    _match?: ({ filename: string }: {
        filename: any;
    }) => boolean;
};
/**
 * Returns a markup preprocessor for svelte-rollup.
 * @param {opts__builder} opts__builder
 * @returns {function(opts__preprocess): {ctx__code__map}}
 */
export declare function _markup(opts__builder?: Opts__builder): (opts: any) => Promise<{
    code: string;
    map: any;
}>;
export declare const markup: (opts: any) => Promise<{
    code: string;
    map: any;
}>;
export declare const markup__markdown: (opts: any) => Promise<{
    code: string;
    map: any;
}>;
export declare function _preprocess__markdown(opts__builder?: {}): {
    markup: (opts: any) => Promise<{
        code: string;
        map: any;
    }>;
};
export {};
