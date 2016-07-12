import env,{env__assign,process$env$} from "ctx-core/env";
const RIOT_URL = process$env$("RIOT_URL") || "https://cdnjs.cloudflare.com/ajax/libs/riot/2.5.0/riot.min.js";
env__assign({
  RIOT_URL: RIOT_URL
});
export default env;