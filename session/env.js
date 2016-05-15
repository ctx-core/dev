import env,{env$assign,process$env$,throw$env$missing} from "ctx-core/env";
env$assign({
  session$key: env.session$key || process$env$("SESSION_KEY") || throw$env$missing("SESSION_KEY")
});
export default env;