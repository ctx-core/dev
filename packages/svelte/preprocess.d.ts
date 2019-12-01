import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';
export declare function compose__a1__preprocess(a1__preprocess: any): PreprocessorGroup;
export declare const _preprocess: typeof compose__a1__preprocess;
export declare function _preprocess__src__compiled(): {
    style: ({ content, attributes, filename }: {
        content?: string;
        attributes: any;
        filename: any;
    }) => {
        code: string;
        map: any;
    };
    script: ({ content, attributes, filename }: {
        content?: string;
        attributes: any;
        filename: any;
    }) => {
        code: string;
        map: any;
    };
};
