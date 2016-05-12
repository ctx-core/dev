import "./env";
import {assign,keys} from "ctx-core/object/lib";
import layoutHtml from "ctx-core/layout/layout.html";
import {indentation,indentation$regexp} from "ctx-core/string/indendation";
import {error$throw} from "ctx-core/error/lib";
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
  let ctx = {};
  try {
    this.body = layoutHtml(ctx, {
      title: "quovo demo",
      body$html: quovo_demo$body$html(ctx, {headers: {
        authorization: this.request.headers.authorization
      }}),
      cssUrls: ["/layout"]
    });
  } catch (error$ctx) {
    error$throw(ctx, error$ctx);
  }
}
export function quovo_demo$body$html() {
  const ctx = assign({jsUrls: ["/dist/censible-quovo"]}, ...arguments)
      , riot$mount$ctx = {
          ctx: {
            headers: ctx.headers
          }
        };
  log(`${logPrefix}|quovo_demo$body$html`, ctx.quovo$user$id, keys(ctx));
  return `
    <body>
      <ctx>
        <ctx-size ctx="{opts.ctx}">
          <quovo-demo ctx="{opts.ctx}"></quovo-demo>
        </ctx-size>
      </ctx>
      ${js$html(ctx, {indentation: indentation(6), indentFirstLine: false})}
      <script>
        (function() {
          var riot$mount$ctx = ${JSON.stringify(riot$mount$ctx)};
          window.ctx = riot$mount$ctx.ctx;
          riot.mount(document.querySelector("ctx"), riot$mount$ctx);
          riot.route.start();
        })();
      </script>
    </body>`.trim().replace(indentation$regexp(4), "");
}