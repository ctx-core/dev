export declare function _store__search_result({ __query, _data, clear }: {
    __query: any;
    _data: any;
    clear: any;
}): void;
/**
 * Returns a `up__item__search` function, which sets `__idx` & `__item` to the previous value
 * @param {Store} __search_result
 * @param {Store} __item
 * @param {Store} __idx
 * @returns {Function}
 */
export declare function _up__item__search({ __search_result, __idx, }: {
    __search_result: any;
    __idx: any;
}): () => void;
/**
 * Returns a `down__item__search` function, which sets `__idx` & `__item` to the next value
 * @param {Store} __search_result
 * @param {Store} __item
 * @param {Store} __idx
 * @returns {Function}
 */
export declare function _down__item__search({ __search_result, __idx, }: {
    __search_result: any;
    __idx: any;
}): () => void;
