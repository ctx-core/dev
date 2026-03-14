export declare const ASSET_EXTENSIONS: RegExp
export interface object_store_asset_config_T {
	asset_base_url: string
	base_path?: string
	hash_length?: number
}
export declare function object_store_asset_url_(file_path: string, config: object_store_asset_config_T): Promise<string>
export declare function object_store_asset_url_sync_(file_path: string, content: Buffer, config: object_store_asset_config_T): string
export declare function is_asset_(file_path: string, extensions?: RegExp): boolean
