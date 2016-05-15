import "./env";
import {assign,keys} from "ctx-core/object/lib";
import layoutHtml from "ctx-core/layout/layout.html";
import {indentation,indentation$regexp} from "ctx-core/string/indendation";
import {error$throw} from "ctx-core/error/lib";
import {http$api,html$ctx} from "ctx-core/http/lib";
import {js$html} from "ctx-core/html/lib";
import koa$route from "koa-route";
import "../quovo/cmd";
import {log,info,debug} from "ctx-core/logger/lib"
const logPrefix = "quovo_demo/http";
export function app$use__quovo_demo() {
  log(`${logPrefix}|app$use__quovo_demo`);
  const ctx = assign(...arguments)
      , app = ctx.app;
  app.use(koa$route.get("/test.quovo", function *() {
    this.redirects("/quovo_demo");
  }));
  app.use(koa$route.get("/quovo-demo", http$get$quovo_demo));
  app.use(koa$route.get("/quovo_demo", redirects$quovo$demo));
  app.use(koa$route.get("/quovo_test", redirects$quovo$demo));
  function *redirects$quovo$demo() {
    this.redirects("/quovo-demo");
  }
}
//GET /quovo_demo
export function *http$get$quovo_demo() {
  info(`${logPrefix}|http$get$quovo_demo`);
  return yield http$api(this, {
    fn: function *(ctx) {
      log(`${logPrefix}|http$get$quovo_demo|fn`);
      this.body = layoutHtml(ctx, {
        title: "quovo demo",
        body$html: quovo_demo$body$html(ctx),
        cssUrls: ["/layout"]
      });
    }
  });
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
      ${js$html(ctx, {indentation: indentation(6), indentFirstLine: false})}
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