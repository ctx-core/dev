import env
    , { assign__env
      , $env__process} from 'ctx-core/env'
const D3_URL =
        env.D3_URL
        || $env__process('D3_URL')
        || 'https://cdnjs.cloudflare.com/ajax/libs/d3/4.1.0/d3.min.js'
assign__env({D3_URL})
export default env