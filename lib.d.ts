export declare function _queue(max?: number): {
    add(fn: any): Promise<unknown>;
    close(): Promise<unknown>;
};
/**
 * Rate limit function factory.
 * @param {number}max__ops - Maximum number of ops per inverval
 * @param {number}interval - The time to count ops
 * @param {boolean}allow__bursts - Allow bursts of ops or space ops along interval
 * @returns {function(*=): Promise<unknown>}
 * @link {@see https://www.matteoagosti.com/blog/2013/01/22/rate-limiting-function-calls-in-javascript/}
 */
export declare function _rate_limit(max__ops: any, interval: any, allow__bursts?: boolean): (fn: any) => Promise<unknown>;
