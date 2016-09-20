import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/env'
import resolve from 'resolve'
import fs from 'fs'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/babel/lib'
export function assign__url__babel__polyfill() {
  log(`${logPrefix}|assign__url__babel__polyfill`)
  debug(`${logPrefix}|assign__url__babel__polyfill|1`)
  assign(env, {
    BABEL__POLYFILL__URL:
      `https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/${version__babel_polyfill()}/polyfill.js`
  })
}
export function version__babel_polyfill() {
  log(`${logPrefix}|version__babel_polyfill`)
  const name = 'babel-polyfill'
      , path = resolve.sync(name, { basedir: __dirname })
      , search = `/${name}/`
      , index__directory =
          path.lastIndexOf(search) + search.length
      , directory = path.slice(0, index__directory)
      , package$json = fs.readFileSync(`${directory}/package.json`)
      , package$o = JSON.parse(package$json)
  return package$o.version
}