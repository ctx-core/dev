import {assign} from "ctx-core/object/lib";
import env,{env$assign,process$env$,throw$env$missing} from "ctx-core/env";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/basic_auth/env";
const isLocalhost = env.isLocalhost
    , basic_auth$login = env.basic_auth$login || process$env$("BASIC_AUTH_LOGIN") || (isLocalhost && throw$env$missing("BASIC_AUTH_LOGIN")) || null
    , basic_auth$password = env.basic_auth$password || process$env$("BASIC_AUTH_PASSWORD") || (isLocalhost && throw$env$missing("BASIC_AUTH_PASSWORD")) || null;
env$assign({
  basic_auth$login: basic_auth$login,
  basic_auth$password: basic_auth$password
});
export default env;