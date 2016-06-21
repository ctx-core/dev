import {assign} from "ctx-core/object/lib";
import AWS from "aws-sdk";
import fs from "fs";
import co_fs from "co-fs";
import shelljs from "shelljs";
import path from "path";
import "./env";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/s3/lib";
export function *memoized$s3$getObject() {
  log(`${logPrefix}|memoized$s3$getObject`);
  const ctx = assign(...arguments)
      , cache_path = ctx.cache_path;
  let s3$object;
  if (yield co_fs.exists(cache_path)) {
    log(`${logPrefix}|memoized$s3$getObject|cache_path|+exists`);
    s3$object = (yield co_fs.readFile(cache_path)).toString();
  } else {
    log(`${logPrefix}|memoized$s3$getObject|cache_path|-exists`);
    s3$object = yield s3$getObject$promise(ctx);
  }
  return assign(ctx, {
    s3$object: s3$object
  });
}
function s3$getObject$promise(ctx) {
  log(`${logPrefix}|s3$getObject$promise`);
  const s3 = new AWS.S3()
      , cache_path = ctx.cache_path;
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|s3$getObject$promise|Promise`);
      let csv = "";
      s3.getObject({
        Bucket: ctx.Bucket,
        Key: ctx.Key
      }, (err, request) => {
        log(`${logPrefix}|s3$getObject$promise|Promise|request`);
        if (err) {
          error(`${logPrefix}|s3$getObject$promise|Promise|request|err`, err);
          reject(err);
        } else {
          log(`${logPrefix}|s3$getObject$promise|Promise|request|success`);
          shelljs.exec(`mkdir -p ${path.dirname(cache_path)}`);
          csv = request.Body;
          fs.writeFile(cache_path, csv, {flag: "w"}, err => {
            if (err) {
              reject(err);
            } else {
              resolve(csv);
            }
          });
        }
      });
    });
}