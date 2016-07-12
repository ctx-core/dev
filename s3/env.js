import env,{env$assign,process$env$,throw$env$missing} from "ctx-core/env";
const AWS_ACCESS_KEY_ID = process$env$("AWS_ACCESS_KEY_ID") || throw$env$missing("AWS_ACCESS_KEY_ID")
    , AWS_SECRET_ACCESS_KEY = process$env$("AWS_SECRET_ACCESS_KEY") || throw$env$missing("AWS_SECRET_ACCESS_KEY")
    , AWS_REGION = process$env$("AWS_REGION") || "us-east-1";
env$assign({
  AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY,
  AWS_REGION: AWS_REGION
});
export default env;