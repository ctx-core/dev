/**
 * @typedef obj__metadata__content
 * @property {object} metadata
 * @property {string} content
 */
/**
 * @typedef hljs - highlight.js object
 */
/**
 * Returns `{ metadata, content }`
 * @param {string} markdown
 * @returns {obj__metadata__content}
 */
export declare function _frontmatter__content(markdown: any): {
    frontmatter: {};
    content: any;
};
export declare const _h1__frontmatter__content__markdown: typeof _frontmatter__content;
/**
 * @typedef opts__html__markdown
 * @property {hljs} [opts.hljs]
 */
/**
 * Returns html from the given markdown
 * @param {string} markdown
 * @param {opts__html__markdown} opts
 * @returns {string}
 */
export declare function _html__markdown(markdown: any): any;
export declare function _is__code__override(infostring: any): any;
export declare function _txt__path__file__md__resolve(txt__path: any): Promise<string | false>;
/**
 * @typedef opts__dir
 * @property {string} dir
 */
/**
 * Name for a markdown file
 * @typedef {string} name__md
 */
declare type Opts__dir = {
    dir: string;
};
/**
 * Returns an array of names for each markdown file in opts__dir
 * @param {opts__dir} opts__dir
 * @returns {Promise<name__md[]>}
 */
export declare function _a1__name(opts__dir: Opts__dir): Promise<any[]>;
/**
 * @typedef {Function} HTTP_Handler
 */
/**
 * @typedef body__a1__name__path
 * @property {name__md[]} a1__name
 * @property {string} path__source
 * @property {string} path
 */
/**
 * @typedef body__ctx__parse__md__path
 * @property {string} path__source
 * @property {string} path
 */
/**
 * Returns a GET [HTTP_Handler](#HTTP_Handler)
 * that responds with a body__a1__name__path or a body__ctx__parse__md__path
 * @param opts__dir
 * @returns {Function}
 */
export declare function _get__a1__segment(opts__dir: Opts__dir): (req: any, res: any) => Promise<void>;
export {};
