import {new__indentation,indentation$regexp} from "ctx-core/string/indendation";
import {css$html} from "ctx-core/html/lib";
import {clone} from "ctx-core/object/lib";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "ctx-core/layout.html";
export default function layoutHtml() {
  log(`${logPrefix}|layoutHtml`);
  const ctx = clone(...arguments)
      , new__head$html = (ctx.new__head$html || function() {return "";});
  return `
    <html>
      <head>
        <title>${ctx.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${css$html(ctx, {indentation: new__indentation(4), indentFirstLine: false})}
        ${new__head$html()}
      </head>
      ${ctx.body$html}
    </html>`.replace(indentation$regexp(4), "");
}