import { promisify } from 'util';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

if (!global.fetch) global.fetch = require('node-fetch');

const Pool = new CognitoUserPool(_data__pool());
const _promise__signUp = promisify(Pool.signUp.bind(Pool));
function _user__cognito(Username) {
    return new CognitoUser(_UserData(Username));
}
async function signUp(username, password, a1__attribute, data__validation = null) {
    return await _promise__signUp(username, password, a1__attribute, data__validation);
}
async function confirmRegistration(Username, code) {
    const user = _user__cognito(Username);
    const _promise__confirmRegistration = promisify(user.confirmRegistration.bind(user));
    return await _promise__confirmRegistration(code, true);
}
async function resendConfirmationCode(Username) {
    const user = _user__cognito(Username);
    const _promise__resendConfirmationCode = promisify(user.resendConfirmationCode.bind(user));
    return await _promise__resendConfirmationCode();
}
async function authenticateUser(Username, Password) {
    const AuthenticationDetails__ = new AuthenticationDetails({
        Username,
        Password,
    });
    const user = _user__cognito(Username);
    return new Promise((resolve, reject) => {
        user.authenticateUser(AuthenticationDetails__, {
            onSuccess(session) {
                resolve({ session, user });
            },
            onFailure(err) {
                reject(err.message || JSON.stringify(err));
            },
        });
    });
}
async function getUserAttributes(user) {
    return promisify(user.getUserAttributes.bind(user))();
}
async function getAttributeVerificationCode(user, inputVerificationCode) {
    return new Promise((resolve, reject) => {
        user.getAttributeVerificationCode('email', {
            onSuccess() {
                resolve();
            },
            onFailure(err) {
                reject(err.message || JSON.stringify(err));
            },
            inputVerificationCode,
        });
    });
}
async function deleteAttributes(user, a1__attribute) {
    const _promise__deleteAttributes = promisify(user.deleteAttributes.bind(user));
    return await _promise__deleteAttributes(a1__attribute);
}
async function updateAttributes(user, a1__attribute) {
    const _promise__updateAttributes = promisify(user.updateAttributes.bind(user));
    return await _promise__updateAttributes(a1__attribute);
}
async function changePassword(user, oldPassword, newPassword) {
    const _promise__changePassword = promisify(user.changePassword.bind(user));
    return await _promise__changePassword(oldPassword, newPassword);
}
async function forgotPassword(user, inputVerificationCode) {
    return new Promise((resolve, reject) => {
        user.forgotPassword({
            onSuccess(data) {
                resolve(data);
            },
            onFailure(err) {
                reject(err.message || JSON.stringify(err));
            },
            inputVerificationCode,
        });
    });
}
async function deleteUser(user) {
    const _promise__deleteUser = promisify(user.deleteUser.bind(user));
    return await _promise__deleteUser();
}
async function signOut(user) {
    return user.signOut();
}
async function globalSignOut(user) {
    return new Promise((resolve, reject) => {
        user.globalSignOut({
            onSuccess: resolve,
            onFailure: reject,
        });
    });
}
function _UserData(Username) {
    return {
        Username,
        Pool,
    };
}
function _data__pool() {
    return {
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: process.env.COGNITO_APP_CLIENT_ID,
    };
}

export { _data__pool, _user__cognito, authenticateUser, changePassword, confirmRegistration, deleteAttributes, deleteUser, forgotPassword, getAttributeVerificationCode, getUserAttributes, globalSignOut, resendConfirmationCode, signOut, signUp, updateAttributes };
