export declare function get__cookie(key: any): string;
declare type Opts__set__cookie = {
    expires?: number | string | Date;
    path?: string;
    domain?: string;
    schedule?: string;
};
export declare function set__cookie(key: any, value: any, opts?: Opts__set__cookie): boolean;
declare type Opts__remove__cookie = {
    domain?: string;
    path?: string;
};
export declare function remove__cookie(key: any, opts?: Opts__remove__cookie): boolean;
export declare function has__cookie(key: any): boolean;
export declare function keys__cookie(): string[];
export {};
