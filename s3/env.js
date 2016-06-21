import env,{env$assign,process$env$,throw$env$missing} from "ctx-core/env";
const aws$accessKeyId = process$env$("AWS_ACCESS_KEY_ID") || throw$env$missing("AWS_ACCESS_KEY_ID")
    , aws$secretAccessKey = process$env$("AWS_SECRET_ACCESS_KEY") || throw$env$missing("AWS_SECRET_ACCESS_KEY")
    , aws$region = process$env$("AWS_REGION") || "us-east-1";
env$assign({
  aws$accessKeyId: aws$accessKeyId,
  aws$secretAccessKey: aws$secretAccessKey,
  aws$region: aws$region
});
export default env;