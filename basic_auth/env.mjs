import  env
      , { assign__env
        , $env__process
        , throw__missing__env} from 'ctx-core/env'
const {isLocalhost} = env
    , BASIC_AUTH_LOGIN = env.BASIC_AUTH_LOGIN
      || $env__process('BASIC_AUTH_LOGIN')
      || (isLocalhost && throw__missing__env('BASIC_AUTH_LOGIN'))
      || null
    , BASIC_AUTH_PASSWORD = env.BASIC_AUTH_PASSWORD
      || $env__process('BASIC_AUTH_PASSWORD')
      || (isLocalhost && throw__missing__env('BASIC_AUTH_PASSWORD'))
      || null
assign__env({
  BASIC_AUTH_LOGIN,
  BASIC_AUTH_PASSWORD
})
export default env