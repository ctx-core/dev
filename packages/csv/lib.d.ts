declare type Opts__transform__table__csv = {
    _cell?: (value: any, column: number, row: number) => any;
};
export declare function transform__table__csv(csv?: string, opts?: Opts__transform__table__csv): any[];
export declare function cast__rows(rows: any, columns: any): void;
export declare function push__row_id__i(rows: any, columns: any): void;
export declare function toLowerCase__column_name(csv: any): string;
export declare const toLowerCase__column_name__csv: typeof toLowerCase__column_name;
export {};
