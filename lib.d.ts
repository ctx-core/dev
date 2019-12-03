declare type Ctx__currency_code = {
    currency_code?: string;
    currency?: string;
};
declare type Opts__format__currency = {
    digits?: number;
};
declare type Opts__default = {
    default?: string;
    currency_code?: string;
    currency?: string;
    digits?: number;
};
/**
 * Formats currency to USD ($) with commas
 * @param {string|number} amount - The currency amount to be outputted
 * @param {*} opts
 * @param {*} opts.default
 * @param {string=} opts.currency_code
 * @param {string=} opts.currency
 * @param {Int=} opts.digits
 * @returns {string} The formatted currency with as USD
 * @example
 * format__currency(1000000) // $1,000,000.00
 * @example
 * format__currency(1000000, {digits: 0}) // $1,000,000
 */
export declare function format__currency(amount: any, opts?: Opts__default | string): string;
export declare function _format__currency(opts?: {}): (amount: any) => string;
/**
 * Remove currency delimiter & commas from string representing amount.
 * @param {string|number} amount
 * @param opts
 * @returns {string}
 */
export declare function unformat__currency(amount: any, opts?: Opts__default): any;
/**
 * Formats money value with commas (no currency type)
 * @param {string|number} amount - The currency amount to be outputted
 * @param {number} [digits=2] - Format currency with decimal places to represent cents
 * @returns {string} The formatted money without currency type
 */
export declare function format__money(amount: any, opts?: Opts__format__currency): any;
export declare const currencies: {
    ALL: string;
    AFN: string;
    ARS: string;
    AWG: string;
    AUD: string;
    AZN: string;
    BSD: string;
    BBD: string;
    BYR: string;
    BZD: string;
    BMD: string;
    BOB: string;
    BAM: string;
    BWP: string;
    BGN: string;
    BRL: string;
    BND: string;
    KHR: string;
    CAD: string;
    KYD: string;
    CLP: string;
    CNY: string;
    COP: string;
    CRC: string;
    HRK: string;
    CUP: string;
    CZK: string;
    DKK: string;
    DOP: string;
    XCD: string;
    EGP: string;
    SVC: string;
    EEK: string;
    EUR: string;
    FKP: string;
    FJD: string;
    GHC: string;
    GIP: string;
    GTQ: string;
    GGP: string;
    GYD: string;
    HNL: string;
    HKD: string;
    HUF: string;
    ISK: string;
    INR: string;
    IDR: string;
    IRR: string;
    IMP: string;
    ILS: string;
    JMD: string;
    JPY: string;
    JEP: string;
    KES: string;
    KPW: string;
    KRW: string;
    KGS: string;
    LAK: string;
    LVL: string;
    LBP: string;
    LRD: string;
    LTL: string;
    MKD: string;
    MYR: string;
    MUR: string;
    MXN: string;
    MNT: string;
    MZN: string;
    NAD: string;
    NPR: string;
    ANG: string;
    NZD: string;
    NIO: string;
    NGN: string;
    NOK: string;
    OMR: string;
    PKR: string;
    PAB: string;
    PYG: string;
    PEN: string;
    PHP: string;
    PLN: string;
    QAR: string;
    RON: string;
    RUB: string;
    RMB: string;
    SHP: string;
    SAR: string;
    RSD: string;
    SCR: string;
    SGD: string;
    SBD: string;
    SOS: string;
    ZAR: string;
    LKR: string;
    SEK: string;
    CHF: string;
    SRD: string;
    SYP: string;
    TZS: string;
    TWD: string;
    THB: string;
    TTD: string;
    TRY: string;
    TRL: string;
    TVD: string;
    UGX: string;
    UAH: string;
    GBP: string;
    USD: string;
    UYU: string;
    UZS: string;
    VEF: string;
    VND: string;
    YER: string;
    ZWD: string;
    GEL: string;
    KZT: string;
};
/**
 * Returns the symbol for the given `__currency_code.currency`. Defaults to `$`
 * @param {*|string}__currency_code
 * @param {string=}__currency_code.currency_code
 * @param {string=}__currency_code.currency
 * @returns {string} The currency symbol
 * @See {@link https://github.com/bengourley/currency-symbol-map}
 * @See {@link https://raw.githubusercontent.com/bengourley/currency-symbol-map/master/map.js}
 */
export declare function _symbol__currency(__currency_code?: Ctx__currency_code | string): any;
export {};
