import {assign} from 'ctx-core/object/lib'
import env from 'ctx-core/fetch/env'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/fetch/polyfill.html'
export function polyfill__fetch(ctx) {
  log(`${logPrefix}|polyfill__fetch`)
  const ctx$ =
          assign({
            js: [],
            indentation: '',
            FETCH_URL: env.FETCH_URL
          }, ...arguments)
  return `
  <script type="text/javascript">
    (function () {
      if(typeof window.fetch === 'undefined') {
        var polyfill = document.createElement('script')
        polyfill.src = ${JSON.stringify(ctx$.FETCH_URL)}
        document.head.appendChild(polyfill)
      }
    })()
  </script>
  `.replace(/^  /g, ctx$.indentation).trim()
}