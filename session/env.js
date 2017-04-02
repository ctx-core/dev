import env
      , {assign__env
      , $env__process
      , throw__missing__env} from 'ctx-core/env'
assign__env({
  SESSION_KEY:
    env.SESSION_KEY
    || $env__process('SESSION_KEY')
    || throw__missing__env('SESSION_KEY')
})
export default env