/**
 * @module @ctx-core/functional/lib
 * @see {@link http://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/}
 */
export declare const curry: (fn: any) => (...arg_a1: any[]) => any;
export declare const flip: (fn: any) => (...arg_a1: any[]) => any;
export declare const curry__flip: (fn: any) => (...arg_a1: any[]) => any;
/**
 *
 * @param fn__append
 * @returns {function(*=): *}
 * @private
 * @see {@link https://medium.com/@kevincennis/currying-in-javascript-c66080543528}
 */
export declare function _fn__curry(fn__append: any): (fn: any) => (...arg_a1: any[]) => any;
/**
 * map :: Monad m => (a -> b) -> m a -> m b
 */
export declare const map: (...arg_a1: any[]) => any;
/**
 * chain :: Monad m => (a -> m b) -> m a -> m b
 */
export declare const chain: (...arg_a1: any[]) => any;
/**
 * ap :: Monad m => m (a -> b) -> m a -> m b
 */
export declare const ap: (...arg_a1: any[]) => any;
/**
 * orElse :: Monad m => m a -> a -> m a
 */
export declare const orElse: (...arg_a1: any[]) => any;
/**
 * m1.map(fn).ap(m2)
 * @param {function} m1
 * @param {module:ctx-core/functional/lib~maybe} m1 - subject `maybe`
 * @param {module:ctx-core/functional/lib~maybe} m2 - applied `maybe`
 * @returns {module:ctx-core/functional/lib~maybe}
 */
export declare const liftA2: (...arg_a1: any[]) => any;
