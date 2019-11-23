declare type Opts__html__webfont__fout = {
    WebFontConfig?: any;
    families?: string[];
};
/**
 * Html to guard agaist flash of unfocused text with Google Fonts.
 * @param opts
 * @param opts.WebFontConfig
 * @param opts.families
 * @returns {string}
 * @example `_html__webfont__fout({ families: ['Open Sans'] })`
 * @example `_html__webfont__fout({ WebFontConfig: { custom: { families: ['My Font', 'My Other Font:n4,i4,n7'], urls: ['/fonts.css'] }} })`
 */
export declare function _html__webfont__fout(opts?: Opts__html__webfont__fout): string;
declare type Opts__html__gtag = {
    GOOGLE_TRACKING_ID?: string;
};
/**
 * Html to add gtag.js to the site
 * @param opts
 * @param opts.GOOGLE_TRACKING_ID
 * @returns {string}
 */
export declare function _html__gtag(opts?: Opts__html__gtag): string;
/**
 * Html to add ga.js to the site
 * @param opts
 * @param opts.GOOGLE_TRACKING_ID || opts.GA_ID
 * @returns {string} html
 */
export declare function _script__google__analytics(...a1__opts: any[]): string;
/**
 * Html to add gtm.js to the page
 * @param opts
 * @param opts.GTM_ID
 * @returns {string}
 */
export declare function _html__script__gtm(opts?: {}): string;
export declare const _script__gtm: typeof _html__script__gtm;
declare type Opts__html__script__head__gtm = {
    GTM_ID?: string;
    dataLayer?: [];
};
/**
 * Google Tag Manager script html to place at the top of `<head>`
 * @param opts
 * @param opts.GTM_ID
 * @returns {string} html
 */
export declare function _html__script__head__gtm(opts?: Opts__html__script__head__gtm): string;
declare type Opts__html__script__body__gtm = {
    GTM_ID?: string;
};
/**
 * Google Tag Manager script html to place at the top of `<body>`
 * @param opts
 * @param opts.GTM_ID
 * @returns {string} html
 */
export declare function _html__script__body__gtm(opts?: Opts__html__script__body__gtm): string;
export {};
