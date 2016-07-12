import env,{env$assign,process$env$,throw$env$missing} from "ctx-core/env";
env$assign({
  SESSION_KEY: env.SESSION_KEY || process$env$("SESSION_KEY") || throw$env$missing("SESSION_KEY")
});
export default env;