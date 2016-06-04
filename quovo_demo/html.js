import "./env";
import {assign,keys} from "ctx-core/object/lib";
import layoutHtml from "ctx-core/layout/layout.html";
import {fn$indentation,indentation$regexp} from "ctx-core/string/indendation";
import {html$ctx} from "ctx-core/http/lib";
import {js$html} from "ctx-core/html/lib";
import {log,info,debug} from "ctx-core/logger/lib"
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
      , riot$mount$ctx = {
          ctx: html$ctx(ctx)};
  log(`${logPrefix}|quovo_demo$body$html`, ctx.quovo$user$id, keys(ctx));
  return `
    <body>
      <layout>
        <quovo-demo ctx="{opts.ctx}"></quovo-demo>
      </layout>
      ${js$html(ctx, {indentation: fn$indentation(6), indentFirstLine: false})}
      <script>
        (function() {
          var riot$mount$ctx = ${JSON.stringify(riot$mount$ctx)}
            , dom$layout = document.querySelector("layout");
          window.ctx = riot$mount$ctx.ctx;
          console.info(riot.mount, dom$layout, riot$mount$ctx);
          riot.mount(dom$layout, riot$mount$ctx);
          riot.route.start();
        })();
      </script>
    </body>`.trim().replace(indentation$regexp(4), "");
}