export declare function _path__ref_data_symbols(): string;
export declare function get__ref_data_symbols(opts?: {}): Promise<any>;
export declare function _ref_data_symbols(opts?: {}): Promise<any>;
declare type Opts__path__ref_data_exchange_symbols = {
    exchange: string;
};
export declare function _path__ref_data_exchange_symbols({ exchange }: Opts__path__ref_data_exchange_symbols): string;
export declare function get__ref_data_exchange_symbols(opts: any, params: Opts__path__ref_data_exchange_symbols): Promise<any>;
export declare function _ref_data_exchange_symbols(opts: any, params: any): Promise<any>;
export declare function _path__ref_data_exchanges(): string;
export declare function get__ref_data_exchanges(opts?: {}): Promise<any>;
export declare function _ref_data_exchanges(opts?: {}): Promise<any>;
export declare function _path__fx_rate({ from, to }: {
    from: any;
    to: any;
}): string;
export declare function get__fx_rate({ from, to }: {
    from: any;
    to: any;
}, opts?: {}): Promise<any>;
export declare function _fx_rate(params: any, opts?: {}): Promise<any>;
export declare function _path__marketcap({ ticker }: {
    ticker: any;
}): string;
export declare function get__marketcap({ ticker }: {
    ticker: any;
}, opts?: {}): Promise<any>;
export declare function _marketcap(params: any, opts?: {}): Promise<any>;
export declare function _path__peRatio({ ticker }: {
    ticker: any;
}): string;
export declare function get__peRatio({ ticker }: {
    ticker: any;
}, opts?: {}): Promise<any>;
export declare function _peRatio(params: any, opts?: {}): Promise<any>;
export declare function _path__ytdChangePercent({ ticker }: {
    ticker: any;
}): string;
export declare function get__ytdChangePercent({ ticker }: {
    ticker: any;
}, opts?: {}): Promise<any>;
export declare function _ytdChangePercent(params: any, opts?: {}): Promise<any>;
/**
 * @param opts
 * @param {string}opts.ticker
 * @returns {string}
 */
export declare function _path__quote({ ticker }: {
    ticker: any;
}): string;
export declare function get__quote({ ticker }: {
    ticker: any;
}, opts?: {}): Promise<any>;
export declare function _quote(params: any, opts?: {}): Promise<any>;
export declare function fetch__iex(path: any, opts?: {}): Promise<any>;
export {};
