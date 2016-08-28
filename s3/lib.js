import {clone} from 'ctx-core/object/lib'
import AWS from 'aws-sdk'
import fs from 'fs'
import co_fs from 'co-fs'
import shelljs from 'shelljs'
const path = require('path')
import 'ctx-core/s3/env'
import {log,error,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/s3/lib'
export function *getObject$memoize__s3(...s3$ctx$$) {
  log(`${logPrefix}|getObject$memoize__s3`)
  const s3$ctx = clone(...s3$ctx$$)
      , {cache_path} = s3$ctx
  let s3$object
  if (yield co_fs.exists(cache_path)) {
    log(`${logPrefix}|getObject$memoize__s3|cache_path|+exists`)
    s3$object = (yield co_fs.readFile(cache_path)).toString()
  } else {
    log(`${logPrefix}|getObject$memoize__s3|cache_path|-exists`)
    s3$object = yield getObject$promise__s3(s3$ctx)
  }
  return s3$object
}
function getObject$promise__s3(ctx) {
  log(`${logPrefix}|getObject$promise__s3`)
  const s3 = new AWS.S3()
      , {cache_path} = ctx
  return new Promise(
    (resolve, reject) => {
      log(`${logPrefix}|getObject$promise__s3|Promise`)
      let csv = ''
      s3.getObject({
        Bucket: ctx.Bucket,
        Key: ctx.Key
      }, (err, request) => {
        log(`${logPrefix}|getObject$promise__s3|Promise|request`)
        if (err) {
          error(`${logPrefix}|getObject$promise__s3|Promise|request|err`, err)
          reject(err)
        } else {
          log(`${logPrefix}|getObject$promise__s3|Promise|request|success`)
          shelljs.exec(`mkdir -p ${path.dirname(cache_path)}`)
          csv = request.Body
          fs.writeFile(cache_path, csv, {flag: 'w'}, err => {
            if (err) {
              reject(err)
            } else {
              resolve(csv)
            }
          })
        }
      })
    })
}