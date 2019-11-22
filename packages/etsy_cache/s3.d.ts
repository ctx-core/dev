declare type Opts__put__a1__listing__etsy = {
    region?: string;
    Bucket?: string;
    KEY__A1__LISTING__ETSY?: string;
};
export declare function put__a1__listing__etsy(a1__listing__etsy: any, opts?: Opts__put__a1__listing__etsy): Promise<import("@aws-sdk/client-s3-node/types/PutObjectOutput").PutObjectOutput>;
export declare const put__arr__listing__etsy: typeof put__a1__listing__etsy;
declare type Opts__put__a1__images__listing__etsy = {
    region?: string;
    Bucket?: string;
    KEY__A1__IMAGES__LISTING__ETSY?: string;
};
export declare function put__a1__images__listing__etsy(a1__images__listing__etsy: any, opts?: Opts__put__a1__images__listing__etsy): Promise<import("@aws-sdk/client-s3-node/types/PutObjectOutput").PutObjectOutput>;
export declare const put__arr__images__listing__etsy: typeof put__a1__images__listing__etsy;
export declare function put__cache__etsy(): Promise<void>;
export {};
