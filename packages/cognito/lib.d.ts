import './ensure_fetch';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, ICognitoUserAttributeData, CognitoUserSession } from 'amazon-cognito-identity-js';
export declare const Pool: CognitoUserPool;
export declare function _user__cognito(Username: string): CognitoUser;
export declare function signUp(username: any, password: any, a1__attribute: any, data__validation?: any): Promise<any>;
export declare function confirmRegistration(Username: string, code: string): Promise<any>;
export declare function resendConfirmationCode(Username: string): Promise<any>;
export declare type ctx__user__session = {
    user: CognitoUser;
    session: CognitoUserSession;
};
export declare function authenticateUser(Username: string, Password: string): Promise<ctx__user__session>;
export declare function getUserAttributes(user: CognitoUser): Promise<CognitoUserAttribute[]>;
export declare type Function__inputVerificationCode = (data: any) => void;
export declare function getAttributeVerificationCode(user: CognitoUser, inputVerificationCode: Function__inputVerificationCode): Promise<unknown>;
export declare function deleteAttributes(user: CognitoUser, a1__attribute: string[]): Promise<any>;
export declare function updateAttributes(user: CognitoUser, a1__attribute: ICognitoUserAttributeData[]): Promise<any>;
export declare function changePassword(user: CognitoUser, oldPassword: string, newPassword: string): Promise<any>;
export declare function forgotPassword(user: CognitoUser, inputVerificationCode?: Function__inputVerificationCode): Promise<unknown>;
export declare function deleteUser(user: CognitoUser): Promise<any>;
export declare function signOut(user: CognitoUser): Promise<void>;
export declare function globalSignOut(user: CognitoUser): Promise<unknown>;
export declare function _data__pool(): {
    UserPoolId: string;
    ClientId: string;
};
