import { GraphQLError } from 'graphql';
export declare type Resolvers = any;
export declare type DocumentNode = any;
export declare type TypeDefs = string | string[] | DocumentNode | DocumentNode[];
export declare type GraphQLSchema = any;
export interface has_state {
    state: any;
}
export declare class ValidationError extends GraphQLError implements has_state {
    constructor(errors: any);
    state: any;
}
export declare function _validation_errors__graphql(payload: any): any;
export declare function gql(a1: TemplateStringsArray): String;
