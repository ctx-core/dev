export declare const protocol_version = 0;
/**
 * Extracts weak ETag formatted with:
 *
 * - log2(64 ^ 32) ~ 192 bits
 * - {Uint32} protocol version
 * - {Uint32} CACHE_VERSION
 * - {Uint32} timestamp (optional)
 * - 96 bits - rest
 * @param {string} etag - base64 encoded etag format
 */
export declare function _ctx__etag(etag: any): {
    protocol_version: number;
    CACHE_VERSION: number;
    timestamp: number;
};
