// TODO: make this composable
// ENV configuration
// censible-core.env
// CTX_ENV=./censible-core.env,./another.env
import {assign,clone} from "./object/lib";
import uuid from "uuid";
import {error$throw} from "./error/lib";
import {log,debug} from "./logger/lib";
if (typeof window === "object") {
  throw "env cannot be run in browser environments";
}
const process$env = process.env;
if (!process$env.NODE_ENV) {
  require("dotenv").config();
  if (!process$env.NODE_ENV) {
    throw$env$missing("NODE_ENV");
  }
}
const localhost = process$env$("LOCALHOST")
    , isLocalhost = !!localhost
    , worker$count = process$env$("WEB_CONCURRENCY") || 4
    , node$env = process$env$("NODE_ENV")
    , source$version = process$env$("SOURCE_VERSION")
    , cache$version = process$env$("CACHE_VERSION") || source$version || Math.random().toString()
    , logPrefix = "env"
    ;
const env = {
  noJson: () => {},
  cmd$api$whitelist$salt: Object.freeze(uuid()),
  isDevelopment: node$env == "development",
  isLocalhost: !!isLocalhost,
  isProduction: node$env == "production",
  isTest: node$env == "test",
  node$env: node$env,
  port: process$env.PORT || 3002,
  source$version: source$version,
  cache$version: cache$version,
  worker$count: worker$count
};
export default env;
export function env$assign() {
  return assign(env, ...arguments);
}
export function process$env$(...keys) {
  let key = keys.find(key => process$env[key]);
  return process$env[key];
}
export function throw$env$missing(env$name) {
  error$throw({}, {
    error$message: `${env$name} environment variable not set.\n` +
        `development: make sure ${env$name} is set in your .env file\n` +
        `heroku: make sure ${env$name} is set using \`heroku config:set\``
  });
}