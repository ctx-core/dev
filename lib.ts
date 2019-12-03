import './ensure_fetch'
import { promisify } from 'util'
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
	ICognitoUserData,
	ICognitoUserAttributeData,
	AuthenticationDetails,
	CognitoUserSession,
} from 'amazon-cognito-identity-js'
export const Pool = new CognitoUserPool(_data__pool())
const _promise__signUp = promisify(Pool.signUp.bind(Pool))
export function _user__cognito(Username:string) {
	return new CognitoUser(_UserData(Username))
}
export async function signUp(username, password, a1__attribute, data__validation = null) {
	return await _promise__signUp(
		username,
		password,
		a1__attribute,
		data__validation,
	)
}
export async function confirmRegistration(Username:string, code:string) {
	const user = _user__cognito(Username)
	const _promise__confirmRegistration =
		promisify(user.confirmRegistration.bind(user))
	return await _promise__confirmRegistration(code, true)
}
export async function resendConfirmationCode(Username:string) {
	const user = _user__cognito(Username)
	const _promise__resendConfirmationCode = promisify(user.resendConfirmationCode.bind(user))
	return await _promise__resendConfirmationCode()
}
export type ctx__user__session = {
	user:CognitoUser
	session:CognitoUserSession
}
export async function authenticateUser(Username:string, Password:string):Promise<ctx__user__session> {
	const AuthenticationDetails__ = new AuthenticationDetails({
		Username,
		Password,
	})
	const user = _user__cognito(Username)
	return new Promise((resolve, reject)=>{
		user.authenticateUser(AuthenticationDetails__, {
			onSuccess(session:CognitoUserSession) {
				resolve({ session, user })
			},
			onFailure(err) {
				reject(err.message || JSON.stringify(err))
			},
		})
	})
}
export async function getUserAttributes(user:CognitoUser):Promise<CognitoUserAttribute[]> {
	return promisify(user.getUserAttributes.bind(user))()
}
export type Function__inputVerificationCode = (data:any)=>void
export async function getAttributeVerificationCode(user:CognitoUser, inputVerificationCode:Function__inputVerificationCode) {
	return new Promise((resolve, reject)=>{
		user.getAttributeVerificationCode('email', {
			onSuccess() {
				resolve()
			},
			onFailure(err) {
				reject(err.message || JSON.stringify(err))
			},
			inputVerificationCode,
		})
	})
}
export async function deleteAttributes(user:CognitoUser, a1__attribute:string[]) {
	const _promise__deleteAttributes = promisify(user.deleteAttributes.bind(user))
	return await _promise__deleteAttributes(a1__attribute)
}
export async function updateAttributes(user:CognitoUser, a1__attribute:ICognitoUserAttributeData[]) {
	const _promise__updateAttributes =
		promisify(user.updateAttributes.bind(user))
	return await _promise__updateAttributes(a1__attribute)
}
export async function changePassword(user:CognitoUser, oldPassword:string, newPassword:string) {
	const _promise__changePassword = promisify(user.changePassword.bind(user))
	return await _promise__changePassword(oldPassword, newPassword)
}
export async function forgotPassword(user:CognitoUser, inputVerificationCode?:Function__inputVerificationCode) {
	return new Promise((resolve, reject)=>{
		user.forgotPassword({
			onSuccess(data) {
				resolve(data)
			},
			onFailure(err) {
				reject(err.message || JSON.stringify(err))
			},
			inputVerificationCode,
		})
	})
}
export async function deleteUser(user:CognitoUser) {
	const _promise__deleteUser = promisify(user.deleteUser.bind(user))
	return await _promise__deleteUser()
}
export async function signOut(user:CognitoUser) {
	return user.signOut()
}
export async function globalSignOut(user:CognitoUser) {
	return new Promise((resolve, reject)=>{
		user.globalSignOut({
			onSuccess: resolve,
			onFailure: reject,
		})
	})
}
function _UserData(Username:string):ICognitoUserData {
	return {
		Username,
		Pool,
	}
}
export function _data__pool() {
	return {
		UserPoolId: process.env.COGNITO_USER_POOL_ID,
		ClientId: process.env.COGNITO_APP_CLIENT_ID,
	}
}
