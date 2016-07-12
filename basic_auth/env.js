import env,{env__assign,process$env$,throw__env$missing} from "ctx-core/env";
const isLocalhost = env.isLocalhost
    , BASIC_AUTH_LOGIN = env.BASIC_AUTH_LOGIN || process$env$("BASIC_AUTH_LOGIN") || (isLocalhost && throw__env$missing("BASIC_AUTH_LOGIN")) || null
    , BASIC_AUTH_PASSWORD = env.BASIC_AUTH_PASSWORD || process$env$("BASIC_AUTH_PASSWORD") || (isLocalhost && throw__env$missing("BASIC_AUTH_PASSWORD")) || null;
env__assign({
  BASIC_AUTH_LOGIN: BASIC_AUTH_LOGIN,
  BASIC_AUTH_PASSWORD: BASIC_AUTH_PASSWORD
});
export default env;