'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var util = require('util');
var amazonCognitoIdentityJs = require('amazon-cognito-identity-js');

if (!global.fetch) global.fetch = require('node-fetch');

const Pool = new amazonCognitoIdentityJs.CognitoUserPool(_data__pool());
const _promise__signUp = util.promisify(Pool.signUp.bind(Pool));
function _user__cognito(Username) {
    return new amazonCognitoIdentityJs.CognitoUser(_UserData(Username));
}
async function signUp(username, password, a1__attribute, data__validation = null) {
    return await _promise__signUp(username, password, a1__attribute, data__validation);
}
async function confirmRegistration(Username, code) {
    const user = _user__cognito(Username);
    const _promise__confirmRegistration = util.promisify(user.confirmRegistration.bind(user));
    return await _promise__confirmRegistration(code, true);
}
async function resendConfirmationCode(Username) {
    const user = _user__cognito(Username);
    const _promise__resendConfirmationCode = util.promisify(user.resendConfirmationCode.bind(user));
    return await _promise__resendConfirmationCode();
}
async function authenticateUser(Username, Password) {
    const AuthenticationDetails__ = new amazonCognitoIdentityJs.AuthenticationDetails({
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
    return util.promisify(user.getUserAttributes.bind(user))();
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
    const _promise__deleteAttributes = util.promisify(user.deleteAttributes.bind(user));
    return await _promise__deleteAttributes(a1__attribute);
}
async function updateAttributes(user, a1__attribute) {
    const _promise__updateAttributes = util.promisify(user.updateAttributes.bind(user));
    return await _promise__updateAttributes(a1__attribute);
}
async function changePassword(user, oldPassword, newPassword) {
    const _promise__changePassword = util.promisify(user.changePassword.bind(user));
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
    const _promise__deleteUser = util.promisify(user.deleteUser.bind(user));
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

exports._data__pool = _data__pool;
exports._user__cognito = _user__cognito;
exports.authenticateUser = authenticateUser;
exports.changePassword = changePassword;
exports.confirmRegistration = confirmRegistration;
exports.deleteAttributes = deleteAttributes;
exports.deleteUser = deleteUser;
exports.forgotPassword = forgotPassword;
exports.getAttributeVerificationCode = getAttributeVerificationCode;
exports.getUserAttributes = getUserAttributes;
exports.globalSignOut = globalSignOut;
exports.resendConfirmationCode = resendConfirmationCode;
exports.signOut = signOut;
exports.signUp = signUp;
exports.updateAttributes = updateAttributes;
