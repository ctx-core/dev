import {assign} from 'ctx-core/object/lib'
import {valid__email} from 'ctx-core/email/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/lib.mjs'
export function validate__signup(form) {
  const errors__email =
          validate__email(form)
      , errors__password_confirmation =
          validate__password_confirmation(form)
      , errors__signup = {}
  let has__errors
  if (errors__email || errors__password_confirmation) {
    has__errors = true
    assign(errors__signup, errors__email, errors__password_confirmation)
  }
  return has__errors && errors__signup
}
export function validate__forgot_password(form) {
  return validate__email(form)
}
export function validate__change_password(form) {
  return validate__password_confirmation(form)
}
export function validate__email(form) {
  const {email} = form
      , errors__email = {}
  let has__errors
  // if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
  //   errors__signup.password = 'Your password must be at least 8 characters and contain at least one upper case letter, one lower case letter, and one number.'
  //   has__errors = true
  // }
  if (!valid__email(email)) {
    errors__email.email = 'Please enter a valid email address.'
    has__errors = true
  }
  return has__errors && errors__email
}
export function validate__password_confirmation(form) {
  const { password
        , password_confirmation
        } = form
      , errors__change_password = {}
  let has__errors
  if (password != password_confirmation) {
    errors__change_password.password_confirmation =
      'Your passwords do not match.'
    has__errors = true
  }
  return has__errors && errors__change_password
}