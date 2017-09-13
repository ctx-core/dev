import  env
      , { assign__env
        , $env__process} from 'ctx-core/env'
import 'ctx-core/version/env'
import cdnjs from 'ctx-core/fetch/cdnjs.json'
const FETCH_URL =
        env.FETCH_URL
        || $env__process('FETCH_URL')
        || `https://cdnjs.cloudflare.com/ajax/libs/fetch/${cdnjs.version}/fetch.js`
assign__env({
  FETCH_URL
})
export default env