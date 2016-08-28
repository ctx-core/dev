import env,{env__assign,process$env$} from 'ctx-core/env'
import riot from 'riot'
const RIOT_URL =
        process$env$('RIOT_URL')
        || new__RIOT_URL()
global.riot = riot
env__assign({
  RIOT_URL
})
export default env
function new__RIOT_URL() {
  const riot_version = riot.version.replace('v', '')
      , maybe$min = env.LOCALHOST ? '' : '.min'
  return `https://cdnjs.cloudflare.com/ajax/libs/riot/${riot_version}/riot${maybe$min}.js`
}