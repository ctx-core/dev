import {assign} from 'ctx-core/object/lib'
import {array$concat} from 'ctx-core/array/lib'
import env from 'ctx-core/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/html/lib'
let new__html$ctx__store = []
export function assign__new__html$ctx() {
  log(`${logPrefix}|assign__new__html$ctx`)
  new__html$ctx__store.push(...arguments)
}
export function new__html$ctx(ctx, ...html$ctx$$) {
  log(`${logPrefix}|new__html$ctx`)
  let html$ctx = {}
  new__html$ctx__store.forEach(
    new__html$ctx => assign(html$ctx, new__html$ctx(ctx, html$ctx)))
  assign(html$ctx, ...html$ctx$$)
  return html$ctx
}
export function html_css() {
  log(`${logPrefix}|html_css`)
  const ctx = assign({
            css: [],
            indentation: '',
            indentFirstLine: true
          }, ...arguments)
      , {css, indentation, indentFirstLine} = ctx
  return css.map((cssFile, i) => {
    return `${(i || indentFirstLine) ? indentation : ''}<link rel="stylesheet" type="text/css" href="${cssFile}">`
  }).join('\n')
}
export function css$versioned(script$src) {
  log(`${logPrefix}|js$versioned`)
  const extName = '.css'
  return versioned(`${script$src}${extName}`)
}
export function html_js() {
  log(`${logPrefix}|html_js`)
  const ctx = assign({js: [], indentation: '', indentFirstLine: true}, ...arguments)
      , {js, indentation, indentFirstLine} = ctx
  return array$concat([],
    `${indentFirstLine ? indentation : ''}<script type="text/javascript">`,
    js.map(
      jsFile =>
        `${indentation}  document.write('<scr'+'ipt type="text/javascript" src="${js$script$src(jsFile)}"></scr'+'ipt>')`
    ),
    `${indentation}</script>`
  ).join('\n')
}
export function js$script$src(script$src) {
  log(`${logPrefix}|js$script$src`)
  return script$src
}
export function js$versioned(script$src) {
  log(`${logPrefix}|js$versioned`)
  const extName = env.minify ? '.min.js' : '.js'
  return versioned(`${script$src}${extName}`)
}
export function versioned(script$src) {
  log(`${logPrefix}|versioned`)
  return `${script$src}?${version$query()}`
}
export function version$query() {
  return `v=${encodeURIComponent(env.CACHE_VERSION)}`
}