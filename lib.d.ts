export declare function spin(_: any, { duration }: {
    duration: any;
}): {
    duration: any;
    css: (t: any) => string;
};
export declare function typewriter(node: any, { speed }: {
    speed?: number;
}): {
    duration: number;
    tick: (t: any) => void;
};
export declare function whoosh(node: any, params: any): {
    delay: any;
    duration: any;
    easing: any;
    css: (t: any, _: any) => string;
};
