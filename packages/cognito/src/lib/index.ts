import './ensure_fetch'
import { promisify } from 'util'
import {
	config as config__aws,
	CognitoIdentityCredentials,
} from 'aws-sdk/global'
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
	ICognitoUserData,
	ICognitoUserAttributeData,
	AuthenticationDetails,
	CognitoUserSession,
} from 'amazon-cognito-identity-js'
const Pool = new CognitoUserPool(_data__pool())
const _promise__signUp = promisify(Pool.signUp)
// https://www.npmjs.com/package/amazon-cognito-identity-js
export type opts__signUp = {
	Username: string;
	Password: string;
	a1__attribute: CognitoUserAttribute[];
}
export async function signUp(opts: opts__signUp) {
	const {
		Username,
		Password,
		a1__attribute,
	} = opts
	return await _promise__signUp(Username, Password, a1__attribute, null)
}
export async function confirmRegistration({ Username, code, }) {
	const UserData = _UserData({ Username })
	const user = new CognitoUser(UserData)
	const _promise__confirmRegistration =
		promisify<string, boolean>(user.confirmRegistration)
	return await _promise__confirmRegistration(code, true)
}
export async function resendConfirmationCode({ Username }) {
	const UserData = _UserData({ Username })
	const user = new CognitoUser(UserData)
	const _promise__resendConfirmationCode = promisify(user.resendConfirmationCode)
	return await _promise__resendConfirmationCode()
}
export async function authenticateUser({ Username, Password }) {
	const AuthenticationDetails__ = new AuthenticationDetails({
		Username,
		Password,
	})
	const UserData = _UserData({ Username })
	const user = new CognitoUser(UserData)
	return new Promise((resolve, reject) => {
		user.authenticateUser(AuthenticationDetails__, {
			onSuccess(session: CognitoUserSession) {
				// const accessToken = session.getAccessToken().getJwtToken()
				const AWS_REGION = process.env.AWS_REGION
				const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID
				config__aws.region = AWS_REGION
				const credentials = new CognitoIdentityCredentials({
					IdentityPoolId: COGNITO_USER_POOL_ID,
					Logins: {
						// Change the key below according to the specific region your user Pool is in.
						[`cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`]:
							session.getIdToken().getJwtToken()
					}
				})
				config__aws.credentials = credentials
				//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
				credentials.refresh(error => {
					if (error) {
						reject(error)
					} else {
						// Instantiate aws sdk service objects now that the credentials have been updated.
						// example: var s3 = new AWS.S3();
						resolve({ session, user })
					}
				})
			},
			onFailure(err) {
				reject(err.message || JSON.stringify(err))
			},
		})
	})
}
export async function getUserAttributes({ user }): Promise<CognitoUserAttribute> {
	return promisify(user.getUserAttributes)()
}
export type Function__inputVerificationCode = (data: any) => void
export type opts__getAttributeVerificationCode = {
	user: CognitoUser;
	inputVerificationCode: Function__inputVerificationCode;
}
export async function getAttributeVerificationCode(opts: opts__getAttributeVerificationCode) {
	const { user, inputVerificationCode } = opts
	return new Promise((resolve, reject) => {
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
export type opts__deleteAttributes = {
	user: CognitoUser;
	a1__attribute: string[];
}
export async function deleteAttributes(opts: opts__deleteAttributes) {
	const {
		user,
		a1__attribute,
	} = opts
	const _promise__deleteAttributes = promisify<string[]>(user.deleteAttributes)
	return await _promise__deleteAttributes(a1__attribute)
}
export type opts__updateAttributes = {
	user: CognitoUser;
	a1__attribute: ICognitoUserAttributeData[];
}
export async function updateAttributes(opts: opts__updateAttributes) {
	const { user, a1__attribute } = opts
	const _promise__updateAttributes =
		promisify<ICognitoUserAttributeData[]>(user.updateAttributes)
	return await _promise__updateAttributes(a1__attribute)
}
export type opts__changePassword = {
	user: CognitoUser;
	oldPassword: string;
	newPassword: string;
}
export async function changePassword(opts: opts__changePassword) {
	const {
		user,
		oldPassword,
		newPassword,
	} = opts
	const _promise__changePassword = promisify(user.changePassword)
	return await _promise__changePassword(oldPassword, newPassword)
}
export type opts__forgotPassword = {
	user: CognitoUser;
	inputVerificationCode?: Function__inputVerificationCode;
}
export async function forgotPassword(opts: opts__forgotPassword) {
	const {
		user,
		inputVerificationCode,
	} = opts
	return new Promise((resolve, reject) => {
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
export type opts__user = {
	user: CognitoUser;
}
export async function deleteUser(opts: opts__user) {
	const { user } = opts
	const _promise__deleteUser = promisify(user.deleteUser)
	return await _promise__deleteUser()
}
export async function signOut(opts: opts__user) {
  const { user } = opts
	return user.signOut()
}
export async function globalSignOut(opts: opts__user) {
  const { user } = opts
	return new Promise((resolve, reject) => {
		user.globalSignOut({
			onSuccess: resolve,
			onFailure: reject,
		})
	})
}
function _UserData({ Username }): ICognitoUserData {
	return {
		Username,
		Pool: new CognitoUserPool({
			UserPoolId: process.env.COGNITO_USER_POOL_ID,
			ClientId: process.env.COGNITO_APP_CLIENT_ID,
		}),
	}
}
export function _data__pool() {
	return {
		UserPoolId: process.env.COGNITO_USER_POOL_ID,
		ClientId: process.env.COGNITO_APP_CLIENT_ID,
	}
}
