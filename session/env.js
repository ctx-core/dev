import env,{
  env__assign,
  process$env$,
  throw__env$missing} from 'ctx-core/env'
env__assign({
  SESSION_KEY:
    env.SESSION_KEY
    || process$env$('SESSION_KEY')
    || throw__env$missing('SESSION_KEY')
})
export default env