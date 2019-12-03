/// <reference types="node" />
import { ChildProcessWithoutNullStreams } from 'child_process';
import { ReadableStream, WritableStream } from 'memory-streams';
export declare class Aspell {
    child_process: ChildProcessWithoutNullStreams;
    private queue__;
    constructor(__line: any);
    get queue(): any[];
    run(word: string): Promise<unknown>;
    end(): void;
}
export declare class Aspell__top extends Aspell {
    aspell__compound: Aspell__compound;
    constructor(aspell__compound: any);
}
export declare class Aspell__compound extends Aspell {
    constructor();
}
export declare function _aspell(__line: any): Aspell;
export declare function _token_a1(phrases: any): any;
export declare function _title_case__compound__line__aspell(line: any): string[];
export declare function _streams__word_segmentation(): {
    aspell__top: Aspell__top;
    aspell__compound: Aspell__compound;
};
export declare function close__streams__word_segmentation(streams__word_segmentation: any): void;
export declare function _stream_a1__compound_words(): (ReadableStream | WritableStream)[];
export declare type Opts__segment__words = {
    aspell__top?: any;
    aspell__compound?: any;
};
export declare function segment__words(phrases: any, { aspell__top, aspell__compound, }?: Opts__segment__words): Promise<any>;
