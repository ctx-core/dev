import env,{assign__env,process$env$} from 'ctx-core/env'
import 'ctx-core/version/env'
import cdnjs from 'ctx-core/webcomponents-lite/cdnjs.json'
const WEB_COMPONENTS_LITE_URL =
        process$env$('WEB_COMPONENTS_LITE_URL')
        || `https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/${cdnjs.version}/webcomponents-lite.js`
assign__env({
  WEB_COMPONENTS_LITE_URL
})
export default env