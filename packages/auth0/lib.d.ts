export declare function validate__signup(form: any): {};
export declare function validate__forgot_password(form: any): {
    email?: string;
};
export declare function validate__change_password(form: any): {
    password_confirmation?: string;
};
export declare function validate__email(form: any): {
    email?: string;
};
export declare function validate__password_confirmation(form: any): {
    password_confirmation?: string;
};
export declare function validate__current__token__auth0(token__auth0: any): Promise<void>;
export declare function _user_id(decoded__token__jwt: any): any;
export declare function validate__user(user: any): void;
