import env from 'ctx-core/quovo/env'
import {assign,keys} from 'ctx-core/object/lib'
import $html__layout from 'ctx-core/layout/html'
import {$indentation,$indentation$regexp} from 'ctx-core/string/indendation'
import {$html$ctx__core} from 'ctx-core/html/lib'
import {$versioned
      , $html__js
      , $versioned__js} from 'ctx-core/html/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/quovo-demo/html'
export function quovo_demo$html(ctx, ...ctx$rest$$) {
  return $html__layout(ctx, {
    title: 'quovo demo',
    body: $body__quovo_demo(ctx),
    css: [$versioned('/dist/quovo-demo.css')]
  }, ...ctx$rest$$)
}
export function $body__quovo_demo() {
  const ctx = assign({
          js: [
            env.BABEL__POLYFILL__URL,
            env.RIOT_URL,
            $versioned__js('/dist/quovo-demo')
          ]}, ...arguments)
      , $html$ctx = ctx.$html$ctx || $html$ctx__core
      , html$ctx = $html$ctx(ctx, {
          CENSIBLE_API_URL: env.CENSIBLE_API_URL
        })
  log(`${logPrefix}|$body__quovo_demo`, ctx.quovo__user_id, keys(ctx))
  return `
    <body>
      <quovo-demo-page ctx="{opts.ctx}"></quovo-demo-page>
      ${$html__js(ctx, {indentation: $indentation(6), indentFirstLine: false})}
      <script>
        (function() {
          $ctx.mount({
            ctx: ${JSON.stringify(html$ctx)},
            mount: [document.querySelector('quovo-demo-page')]
          })
        })()
      </script>
    </body>`.trim().replace($indentation$regexp(4), '')
}