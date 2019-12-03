/// <reference types="node" />
export declare const __queue__flash: import("svelte/store").Writable<any[]>;
export declare let timeout__flash: number;
export declare const __flash: import("svelte/store").Readable<any>;
export declare const __message__flash: import("svelte/store").Readable<any>;
export declare const __error__flash: import("svelte/store").Readable<any>;
export declare const __id__timeout__expire__flash: import("svelte/store").Readable<NodeJS.Timeout>;
export declare function add__flash(ctx__flash: any): void;
export declare function shift__flash(): void;
export declare function add__message__flash(message__flash: any, rest: any): void;
export declare function add__error__flash(error__flash: any, rest: any): void;
export declare function cancel__expire__flash(): void;
