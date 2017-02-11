import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/webcomponents-lite/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/webcomponents-lite/polyfill.html'
export function polyfill__webcomponents_lite(ctx) {
  log(`${logPrefix}|polyfill__webcomponents_lite`)
  const ctx$ =
          assign({
            js: [],
            indentation: '',
            WEB_COMPONENTS_LITE_URL: env.WEB_COMPONENTS_LITE_URL
          }, ...arguments)
  return `
  <script type="text/javascript">
    (function () {
      var wc =
        document.registerElement
        && window.HTMLTemplateElement
        && window.WeakMap
        && window.MutationObserver
        && ('import' in document.createElement('link'))
      if(!wc) {
        var polyfill = document.createElement('script')
        polyfill.src = ${JSON.stringify(ctx$.WEB_COMPONENTS_LITE_URL)}
        document.head.appendChild(polyfill)
      }
    })()
  </script>
  `.replace(/^  /g, ctx$.indentation).trim()
}