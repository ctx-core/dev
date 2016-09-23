import {assign} from 'ctx-core/object/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/html/web-components-lite.html'
export function web_components_lite$html(ctx) {
  log(`${logPrefix}|web_components_lite$html`)
  const ctx$clone = assign({js: [], indentation: ''}, ...arguments)
  return `
  <script type="text/javascript">
    (function () {
      var wc = document.registerElement &&
        window.HTMLTemplateElement &&
        window.WeakMap &&
        window.MutationObserver &&
        ('import' in document.createElement('link'))
      if(!wc) {
        var polyfill = document.createElement('script')
        polyfill.src = ${JSON.stringify(ctx$clone.WEB_COMPONENTS_LITE_URL)}
        document.head.appendChild(polyfill)
      }
    })()
  </script>
  `.replace(/^  /g, ctx$clone.indentation).trim()
}