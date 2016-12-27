import env
      , {assign__env
      , process$env$
      , throw__env$missing} from 'ctx-core/env'
assign__env({
  SESSION_KEY:
    env.SESSION_KEY
    || process$env$('SESSION_KEY')
    || throw__env$missing('SESSION_KEY')
})
export default env