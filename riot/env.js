import env,{env__assign,process$env$} from "ctx-core/env";
import riot from "riot";
const RIOT_URL = process$env$("RIOT_URL") ||
  `https://cdnjs.cloudflare.com/ajax/libs/riot/${riot.version.replace("v", "")}/riot.min.js`;
global.riot = riot;
env__assign({
  RIOT_URL: RIOT_URL
});
export default env;