import {fn$indentation,indentation$regexp} from "ctx-core/string/indendation";
import {css$html} from "ctx-core/html/lib";
import {clone} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/layout.html";
export default function layoutHtml() {
  log(`${logPrefix}|layoutHtml`);
  const ctx = clone(...arguments);
  return `
    <html>
      <head>
        <title>${ctx.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${css$html(ctx, {indentation: fn$indentation(4), indentFirstLine: false})}
      </head>
      ${ctx.body$html}
    </html>`.replace(indentation$regexp(4), "");
}