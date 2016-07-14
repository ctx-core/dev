import {assign} from "ctx-core/object/lib";
import env from "ctx-core/env";
import {log,debug} from "ctx-core/logger/lib";
const logPrefix = "ctx-core/html/web-components-lite.html";
export function web_components_lite$html() {
  log(`${logPrefix}|web_components_lite$html`);
  const ctx = assign({js: [], indentation: ""}, ...arguments)
      , src = env.WEB_COMPONENTS_LITE_URL || "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.22/webcomponents-lite.js";
  return `
  <script>
    (function () {
      var wc = document.registerElement &&
        window.HTMLTemplateElement &&
        window.WeakMap &&
        window.MutationObserver &&
        ("import" in document.createElement("link"));
      if(!wc) {
        var polyfill = document.createElement("script");
        polyfill.src = ${JSON.stringify(src)};
        document.head.appendChild(polyfill);
      }
    })();
  </script>
  `.replace(/^  /g, ctx.indentation).trim();
}