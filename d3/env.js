import env,{env__assign,process$env$} from 'ctx-core/env'
const D3_URL = process$env$('D3_URL')
      || 'https://cdnjs.cloudflare.com/ajax/libs/d3/4.1.0/d3.min.js'
env__assign({
  D3_URL: D3_URL
})
export default env