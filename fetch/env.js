import env,{assign__env,process$env$} from 'ctx-core/env'
import 'ctx-core/version/env'
import cdnjs from 'ctx-core/fetch/cdnjs.json'
const FETCH_URL =
        process$env$('FETCH_URL')
        || cdnjs.latest
assign__env({
  FETCH_URL
})
export default env