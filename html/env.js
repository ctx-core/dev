import env,{assign__env,process$env$} from 'ctx-core/env'
import 'ctx-core/version/env'
const WEB_COMPONENTS_LITE_URL =
        process$env$('WEB_COMPONENTS_LITE_URL')
        || 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.22/webcomponents-lite.js'
assign__env({
  WEB_COMPONENTS_LITE_URL
})
export default env