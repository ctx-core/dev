import {clone} from 'ctx-core/object/lib'
import {$indentation,$indentation$regexp} from 'ctx-core/string/indendation'
import {$attrs,$html__links} from 'ctx-core/html/lib'
import {web_components_lite$html} from 'ctx-core/html/web-components-lite.html'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/layout/html'
/**
 * Returns the html layout & content
 * @returns {string} html layout & content
 */
export default function $html__layout() {
  log(`${logPrefix}|$html__layout`)
  const ctx = clone(...arguments)
      , { attrs__html
        , title} = ctx
      , $prefix__$head =
          ctx.$prefix__$head
          || (() => {})
      , $meta__$head =
          ctx.$meta__$head
          || (() => {})
      , $suffix__$head =
          ctx.$suffix__$head
          || (() => {})
      , $head =
          ctx.$head
          || $head$
      , body =
          ctx.body
          || ctx.$body && ctx.$body(ctx)
          || ''
  return `
    <html ${$attrs(attrs__html)}>
      ${$head(ctx)}
      ${body}
    </html>`.replace($indentation$regexp(4), '')
  function $head$() {
    log(`${logPrefix}|$head$`)
    return `
      <head>
        ${$prefix__$head(ctx) || ''}
        <title>${ctx.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        ${$meta__$head(ctx) || ''}
        ${$html__links(ctx, {indentation: $indentation(4), indentFirstLine: false})}
        ${web_components_lite$html(ctx)}
        ${$suffix__$head(ctx) || ''}
      </head>`.trim().replace($indentation$regexp(4), '')
  }
}
/**
 *
 * @type {$html__layout}
 * @deprecated
 */
export const html_layout = $html__layout