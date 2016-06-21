import "ctx-core/quovo_demo/env";
import {assign,keys} from "ctx-core/object/lib";
import layoutHtml from "ctx-core/layout/layout.html";
import {fn$indentation,indentation$regexp} from "ctx-core/string/indendation";
import {fn$html$ctx as core__fn$html$ctx} from "ctx-core/http/lib";
import {js$html} from "ctx-core/html/lib";
import {log,debug} from "ctx-core/logger/lib"
const logPrefix = "quovo_demo/html";
export function quovo_demo$html(ctx, ...ctx$rest$$) {
  return layoutHtml(ctx, {
    title: "quovo demo",
    body$html: quovo_demo$body$html(ctx),
    cssUrls: ["/layout"]
  }, ...ctx$rest$$);
}
export function quovo_demo$body$html() {
  const ctx = assign({jsUrls: ["/dist/censible-quovo"]}, ...arguments)
      , fn$html$ctx = ctx.fn$html$ctx || core__fn$html$ctx
      , html$ctx = fn$html$ctx(ctx);
  log(`${logPrefix}|quovo_demo$body$html`, ctx.quovo$user$id, keys(ctx));
  return `
    <body>
      <quovo-demo ctx="{opts.ctx}"></quovo-demo>
      ${js$html(ctx, {indentation: fn$indentation(6), indentFirstLine: false})}
      <script>
        (function() {
          ctx$.mount({
            ctx: ${JSON.stringify(html$ctx)},
            mount$tag$$: [document.querySelector("quovo-demo")]
          });
        })();
      </script>
    </body>`.trim().replace(indentation$regexp(4), "");
}