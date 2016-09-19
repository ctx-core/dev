import {new__indentation,new__indentation$regexp} from 'ctx-core/string/indendation'
import {web_components_lite$html} from 'ctx-core/html/web-components-lite.html'
import {html_css} from 'ctx-core/html/lib'
import {clone} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/layout.html'
/**
 * Returns the html layout & content
 * @returns {string} html layout & content
 */
export default function layout__html() {
  log(`${logPrefix}|layout__html`)
  const ctx = clone(...arguments)
      , new__head$html =
          ctx.new__head$html
          || (() => '')
  return `
    <html>
      <head>
        <title>${ctx.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${html_css(ctx, {indentation: new__indentation(4), indentFirstLine: false})}
        ${web_components_lite$html(ctx)}
        ${new__head$html()}
      </head>
      ${ctx.html_body}
    </html>`.replace(new__indentation$regexp(4), '')
}
/**
 *
 * @type {layout__html}
 * @deprecated
 */
export const html_layout = layout__html