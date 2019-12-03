export declare function _workspaces(): Promise<any>;
export declare function each__package__json(txt__glob: any, fn: any): Promise<void>;
export declare function cli__npm_check_updates__monorepo(): Promise<void>;
declare type Opts__threads = {
    threads?: number;
    workspace_name?: string | string[];
};
export declare function npm_check_updates__monorepo(opts?: Opts__threads): Promise<{}>;
export declare function run_parallel__workspaces(cmd_a1: any, opts?: Opts__threads): Promise<{}>;
export {};
