import {assign} from "ctx-core/object/lib";
import env,{env$assign,process$env$,throw$env$missing} from "ctx-core/env";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "quovo_demo/env";
const quovo$access_token$key$prefix = env.quovo$access_token$key$prefix || process$env$("QUOVO_ACCESS_TOKEN_KEY_PREFIX") || "censible-core"
    , quovo$login = env.quovo$login || process$env$("QUOVO_LOGIN") || throw$env$missing("QUOVO_LOGIN")
    , quovo$password = env.quovo$password || process$env$("QUOVO_PASSWORD") || throw$env$missing("QUOVO_PASSWORD")
    , quovo$brokerage$id__demo = env.quovo$brokerage$id__demo || process$env$("QUOVO_BROKERAGE_ID_DEMO", "QUOVO_BROKERAGE_ID_TEST", "TEST_QUOVO_BROKERAGE_ID") || throw$env$missing("QUOVO_BROKERAGE_ID_DEMO")
    , quovo$brokerage$username__demo = env.quovo$brokerage$username__demo || process$env$("QUOVO_BROKERAGE_USERNAME_DEMO", "QUOVO_BROKERAGE_USERNAME_TEST", "TEST_QUOVO_BROKERAGE_USERNAME") || throw$env$missing("QUOVO_BROKERAGE_USERNAME_DEMO")
    , quovo$brokerage$password__demo = env.quovo$brokerage$password__demo || process$env$("QUOVO_BROKERAGE_PASSWORD_DEMO", "QUOVO_BROKERAGE_PASSWORD_TEST", "TEST_QUOVO_BROKERAGE_PASSWORD") || throw$env$missing("QUOVO_BROKERAGE_PASSWORD_DEMO")
    , quovo$user$id__demo = env.quovo$user$id__demo || process$env$("QUOVO_USER_ID_DEMO", "QUOVO_USER_ID_TEST", "TEST_QUOVO_USER_ID") || throw$env$missing("QUOVO_USER_ID_DEMO")
    , quovo$username__demo = env.quovo$username__demo || process$env$("QUOVO_USERNAME_DEMO", "QUOVO_USERNAME_TEST", "TEST_QUOVO_USERNAME") || throw$env$missing("QUOVO_USERNAME_DEMO")
    , quovo$account$id__demo = env.quovo$account$id__demo || process$env$("QUOVO_ACCOUNT_ID_DEMO", "QUOVO_ACCOUNT_ID_TEST", "TEST_QUOVO_ACCOUNT_ID") || throw$env$missing("QUOVO_ACCOUNT_ID_DEMO")
    , quovo$portfolio$id__demo = env.quovo$portfolio$id__demo || process$env$("QUOVO_PORTFOLIO_ID_DEMO", "QUOVO_PORTFOLIO_ID_TEST", "TEST_QUOVO_PORTFOLIO_ID") || throw$env$missing("QUOVO_PORTFOLIO_ID_DEMO");
env$assign({
  quovo$access_token$key$prefix: quovo$access_token$key$prefix,
  quovo$login: quovo$login,
  quovo$password: quovo$password,
  quovo$brokerage$id__demo: parseInt(quovo$brokerage$id__demo),
  quovo$brokerage$username__demo: quovo$brokerage$username__demo,
  quovo$brokerage$password__demo: quovo$brokerage$password__demo,
  quovo$user$id__demo: parseInt(quovo$user$id__demo),
  quovo$username__demo: quovo$username__demo,
  quovo$account$id__demo: parseInt(quovo$account$id__demo),
  quovo$portfolio$id__demo: parseInt(quovo$portfolio$id__demo)
});
export default env;
export function fn$quovo$user__demo(ctx) {
  return {
    username: ctx.quovo$username,
    name: "Censible Test2",
    email: "development@censible.com",
    phone: ""
  };
}