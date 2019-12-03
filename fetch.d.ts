declare type Params__get__client_grants__v2__auth0 = {
    query?: string;
    json?: any;
};
export declare function get__client_grants__v2__auth0(params: Params__get__client_grants__v2__auth0): Promise<any>;
declare type Params__patch__client__v2__auth0 = {
    client_id?: string;
    body?: string;
    json?: any;
};
export declare function patch__client__v2__auth0(params: Params__patch__client__v2__auth0): Promise<any>;
/**
 *
 * @param store
 * @returns {Promise<*>}
 * @see {@link https://auth0.com/docs/api-auth/tutorials/client-credentials}
 * @see {@link https://auth0.com/docs/api-auth/which-oauth-flow-to-use}
 * @see {@link https://auth0.com/docs/clients/client-grant-types}
 * @see {@link https://auth0.com/docs/api-auth/grant/authorization-code}
 * @see {@link https://auth0.com/docs/protocols/oauth2}
 */
export declare function patch__user__v2__auth0(user_id: any, form: any): Promise<any>;
export declare function get__user__v2__auth0({ AUTH0_DOMAIN, user_id }: {
    AUTH0_DOMAIN: any;
    user_id: any;
}): Promise<any>;
declare type Params__get__users_by_email__v2__auth0 = {
    email: string;
};
export declare function get__users_by_email__v2__auth0(params: Params__get__users_by_email__v2__auth0): Promise<any>;
export declare function _audience(): string;
export declare function _body__client_credentials__management(): {
    grant_type: string;
    client_id: string;
    client_secret: string;
    audience: string;
};
export {};
