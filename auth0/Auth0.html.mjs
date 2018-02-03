import {$assign__offs
      , offs__call} from 'ctx-core/observable/lib'
import {$$dom} from 'ctx-core/dom/lib'
import {post__signup__dbconnections__auth0
      , post__token__oauth__auth0
      , post__start__passwordless__auth0
      , post__change_password__auth} from 'ctx-core/auth0/fetch'
import {agent__userinfo__auth0} from 'ctx-core/auth0/agent'
import {agent__auth0} from 'ctx-core/auth0/agent'
import {agent__token__auth0} from 'ctx-core/auth0/agent'
import {validate__signup
      , validate__forgot_password
      , validate__change_password} from 'ctx-core/auth0/lib'
import {log,warn,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/auth0/Auth0.html.mjs'
export function oncreate() {
  log(`${logPrefix}|oncreate`)
  const C = this
      , ctx = C.get('ctx')
  agent__auth0(ctx)
  agent__token__auth0(ctx)
  agent__userinfo__auth0(ctx)
  $assign__offs(C)
    .change(ctx.agent__auth0,
      __change__agent__auth0)
  C.observe('class__opened__auth0',
    __observe__class__opened__auth0)
  function __change__agent__auth0() {
    log(`${logPrefix}|__change__agent__auth0`)
    const { view__auth0
          , class__opened__auth0
          } = ctx
    C.set(
      { view__auth0,
        class__opened__auth0})
  }
  function __observe__class__opened__auth0(class__opened__auth0) {
    log(`${logPrefix}|__observe__class__opened__auth0`)
    if (ctx.class__opened__auth0 != class__opened__auth0) {
      ctx.agent__auth0.set({
        class__opened__auth0
      })
    }
  }
}
export function ondestroy() {
  log(`${logPrefix}|ondestroy`)
  const C = this
  offs__call(C)
}
export function __close(e, ctx) {
  log(`${logPrefix}|__close`)
  e.preventDefault()
  ctx.agent__auth0.close()
}
export function __submit__signup(e, ctx) {
  log(`${logPrefix}|__submit__signup`)
  e.preventDefault()
  const C = this
      , { email__signup
        , password__signup
        , password_confirmation__signup
        } = C.refs
      , email = email__signup.value
      , password = password__signup.value
      , password_confirmation =
          password_confirmation__signup.value
      , errors__signup =
          validate__signup({
            email,
            password,
            password_confirmation
          })
  if (errors__signup) {
    set__errors(C, {errors__signup})
    return false
  }
  signup(ctx, C, {
    email,
    password
  })
}
export function __submit__login(e, ctx) {
  log(`${logPrefix}|__submit__login`)
  e.preventDefault()
  const C = this
      , { username__login
        , password__login
        } = C.refs
      , username = username__login.value
      , password = password__login.value
  login(ctx, C, {username, password})
}
export async function __submit__forgot_password(e, ctx) {
  log(`${logPrefix}|__submit__forgot_password`)
  e.preventDefault()
  const C = this
      , {email__forgot_password} = C.refs
      , email = email__forgot_password.value
      , form =
          { connection: 'email',
            send: 'link',
            email}
      , errors__forgot_password =
          validate__forgot_password(form)
  if (errors__forgot_password) {
    set__errors(C, {errors__forgot_password})
    return
  }
  await post__start__passwordless__auth0(ctx, form)
  ctx.agent__auth0.open__forgot_password__check_email()
}
export function __submit__change_password(e, ctx) {
  log(`${logPrefix}|__submit__change_password`)
  e.preventDefault()
  const C = this
      , { password__change_password
        , password_confirmation__change_password
        } = C.refs
      , password = password__change_password.value
      , password_confirmation =
          password_confirmation__change_password.value
      , errors__change_password =
          validate__change_password(
            { password,
              password_confirmation})
  if (errors__change_password) {
    set__errors(C, {errors__change_password})
    return false
  }
  change_password(ctx, C, {
    password
  })
}
async function signup(ctx, C, form) {
  log(`${logPrefix}|signup`)
  clear__errors(C)
  const response =
          await post__signup__dbconnections__auth0(ctx, form)
      , userinfo__auth0 = await response.json()
      , {statusCode} = userinfo__auth0
  if (statusCode) {
    const { code
          , description
          } = userinfo__auth0
        , errors__signup = {}
        , email =
            code === 'user_exists'
            ? 'This Email is already signed up'
            : description
    errors__signup.email = email
    set__errors(C, {errors__signup})
    return
  }
  ctx.agent__userinfo__auth0.set({userinfo__auth0})
  schedule__clear__forms(C)
  login(ctx, C, {
    username: form.email,
    password: form.password})
}
async function login(ctx, C, form) {
  log(`${logPrefix}|login`)
  clear__errors(C)
  const response =
          await post__token__oauth__auth0(ctx, form)
      , token__auth0 = await response.json()
      , {error} = token__auth0
  if (error) {
    const errors__login =
            { email:
                token__auth0.error_description}
    set__errors(C, {errors__login})
    ctx.agent__token__auth0.set({token__auth0: false})
    return
  }
  ctx.agent__token__auth0.set({token__auth0})
  schedule__clear__forms(C)
  ctx.agent__auth0.close()
}
async function change_password(ctx, C, form) {
  log(`${logPrefix}|change_password`)
  clear__errors(C)
  const {password} = form
  let error
  try {
    const response =
            await post__change_password__auth(ctx, password)
        , json = await response.json()
    if (!response.ok) {
      if (response.status == 401) {
        ctx.agent__auth0.open__login()
        const errors__login =
                {email: 'Authentication Error - Login'}
        set__errors(C, {errors__login})
        return
      }
      error =
        json.error
        || 'Error changing Password'
    }
  } catch (e) {
    warn(e)
    error = e.message
  }
  if (error) {
    const errors__change_password =
            {password: error}
    set__errors(C, {errors__change_password})
    return
  }
  schedule__clear__forms(C)
  ctx.agent__auth0.close()
}
function schedule__clear__forms(C) {
  const {root} = C.refs
  setTimeout(() => {
    log(`${logPrefix}|clear__forms`)
    clear__inputs($$dom('input[type=text]', root))
    clear__inputs($$dom('input[type=password]', root))
  }, 100)
}
function clear__inputs(inputs) {
  for (let i=0; i < inputs.length; i++) {
    const input = inputs[i]
    input.value = ''
  }
}
function set__errors(C, errors) {
  log(`${logPrefix}|set__errors`)
  const { errors__signup={}
        , errors__login={}
        , errors__forgot_password={}
        , errors__change_password={}
        } = errors
  C.set(
    { errors__signup,
      errors__login,
      errors__forgot_password,
      errors__change_password})
}
function clear__errors(C) {
  log(`${logPrefix}|clear__errors`)
  set__errors(C, {})
}