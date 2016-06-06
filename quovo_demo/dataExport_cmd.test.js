#!/usr/bin/env babel-node
import {assign} from "ctx-core/object/lib";
import {array$flatten$$} from "ctx-core/array/lib";
import env from "ctx-core/quovo_demo/env";
import {co$catch$error$throw} from "ctx-core/co/lib";
import fsp from "fs-promise";
import {dataExport$cmd} from "./cmd";
import {assert$equal} from "ctx-core/test/asserts";
import path from "path";
import {log,info,error,debug} from "ctx-core/logger/lib";
const outputDir = path.resolve(__dirname, "data")
    , logPrefix = "quovo_demo/dataExport_cmd";
let ctx = {
  quovo$user$id: env.quovo$user$id__demo,
  quovo$account$id: env.quovo$account$id__demo
};
co$catch$error$throw(ctx, function *() {
  log(`${logPrefix}|co`);
  yield dataExport$cmd(ctx);
  yield fsp.mkdirp(outputDir);
  yield fsp.remove(`${outputDir}/*`);
  yield array$flatten$$([
    json$write$file(ctx.quovo$account$$, `${outputDir}/accounts.json`),
    json$write$file(ctx.quovo$brokerage$$, `${outputDir}/brokerages.json`),
    json$write$file(ctx.quovo$portfolio$$ctx$$.map(
      o => o.quovo$portfolio), `${outputDir}/portfolios.json`),
    ctx.quovo$portfolio$$ctx$$.map(quovo$portfolio$ctx => {
      let quovo$portfolio$id = quovo$portfolio$ctx.quovo$portfolio$id;
      return [
        json$write$file(quovo$portfolio$ctx.quovo$portfolio, `${outputDir}/portfolio.${quovo$portfolio$id}.json`),
        json$write$file(quovo$portfolio$ctx.quovo$portfolio$history, `${outputDir}/portfolio.${quovo$portfolio$id}.history.json`)
      ];
    }),
    json$write$file(ctx.quovo$position$$, `${outputDir}/positions.json`),
    json$write$file(ctx.quovo$user$$, `${outputDir}/users.json`)
  ]);
  return ctx;
});
function *json$write$file($, file$path) {
  info(`${logPrefix}|json$write$file`, file$path);
  const $json = JSON.stringify($, null, 2);
  return yield fsp.writeFile(file$path, $json);
}