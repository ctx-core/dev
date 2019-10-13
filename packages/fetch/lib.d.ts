import fetch, { Headers, Request, Response } from '@ctx-core/isomorphic-fetch';
export { fetch, Headers, Request, Response };
export declare function _headers(init: any): any;
export declare function _method__fetch(ctx__fetch: any): string;
export declare function throw__response__fetch(response: any): Promise<void>;
export declare function waitfor__backoff__fibonacci(fn: any, delay?: number): Promise<any>;
export declare const _waitfor__ratelimit__backoff__fibonacci: typeof waitfor__backoff__fibonacci;
