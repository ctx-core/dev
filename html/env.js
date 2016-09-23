import env,{env__assign,process$env$} from 'ctx-core/env'
const WEB_COMPONENTS_LITE_URL =
        process$env$('WEB_COMPONENTS_LITE_URL')
        || 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.22/webcomponents-lite.js'
env__assign({
  WEB_COMPONENTS_LITE_URL
})
export default env