import resolve from 'resolve'
import fs from 'fs'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/npm/lib'
export function $version(path) {
  log(`${logPrefix}|$version`)
  const resolve__path = resolve.sync(path, { basedir: __dirname })
      , search = `/${path}/`
      , index__directory =
          resolve__path.lastIndexOf(search) + search.length
      , directory = resolve__path.slice(0, index__directory)
      , package$json = fs.readFileSync(`${directory}/package.json`)
      , package$o = JSON.parse(package$json)
  return package$o.version
}
export const $version__npm = $version