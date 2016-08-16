// TODO: make this composable
// ENV configuration
// censible-core.env
// CTX_ENV=./censible-core.env,./another.env
import {assign,clone} from "ctx-core/object/lib";
import uuid from "uuid";
import {throw__error} from "ctx-core/error/lib";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/env";
log(logPrefix);
// global.riot = riot;
if (typeof window === "object") {
  throw "env cannot be run in browser environments";
}
const process$env = process.env;
if (!process$env.NODE_ENV) {
  require("dotenv").config();
  if (!process$env.NODE_ENV) {
    throw__env$missing("NODE_ENV");
  }
}
const localhost = process$env$("LOCALHOST")
    , isLocalhost = !!localhost
    , WEB_CONCURRENCY = process$env$("WEB_CONCURRENCY") || 4
    , NODE_ENV = process$env$("NODE_ENV")
    , RELEASE_VERSION = process$env$("HEROKU_RELEASE_VERSION", "RELEASE_VERSION")
    , SOURCE_VERSION = process$env$("SOURCE_VERSION")
    , CACHE_VERSION = process$env$("CACHE_VERSION") || RELEASE_VERSION || SOURCE_VERSION || Math.random().toString()
    ;
let env = clone(process$env, {
  noJson: () => {},
  whitelist_salt: Object.freeze(uuid()),
  isDevelopment: NODE_ENV == "development",
  isLocalhost: !!isLocalhost,
  isProduction: NODE_ENV == "production",
  isTest: NODE_ENV == "test",
  NODE_ENV: NODE_ENV,
  PORT: process$env.PORT || 3002,
  RELEASE_VERSION: RELEASE_VERSION,
  SOURCE_VERSION: SOURCE_VERSION,
  CACHE_VERSION: CACHE_VERSION,
  WEB_CONCURRENCY: WEB_CONCURRENCY
});
env.minify = !env.isLocalhost && !env.isTest;
export default env;
export {env};
export function env__assign() {
  return assign(env, ...arguments);
}
export function process$env$(...keys) {
  let key = keys.find(key => process$env[key]);
  return process$env[key];
}
export function throw__env$missing(env$name) {
  throw__error({}, {
    error_message: `${env$name} environment variable not set.\n` +
        `development: make sure ${env$name} is set in your .env file\n` +
        `heroku: make sure ${env$name} is set using \`heroku config:set\``
  });
}