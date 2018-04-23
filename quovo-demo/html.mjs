import env from 'ctx-core/quovo/env.mjs'
import {assign,keys} from 'ctx-core/object/lib.mjs'
import $html__layout from 'ctx-core/layout/html.mjs'
import {$indentation,$regexp__indentation} from 'ctx-core/string/indendation.mjs'
import {$html__js} from 'ctx-core/html/lib.mjs'
import {$versioned
      , $versioned__js
      , $ctx__html__core} from 'ctx-core/html/node.mjs'
import {log,debug} from 'ctx-core/logger/lib.mjs'
const logPrefix = 'ctx-core/quovo-demo/html.mjs'
export function quovo_demo__html(ctx, ...ctx$rest$$) {
  return $html__layout(ctx, {
    title: 'quovo demo',
    body: $body__quovo_demo(ctx),
    css: [$versioned('/dist/quovo-demo.css')]
  }, ...ctx$rest$$)
}
export function $body__quovo_demo(ctx) {
  const ctx$ = assign({
          js: $js__html__files(ctx)
        }, ...arguments)
      , $ctx__html = ctx$.$ctx__html || $ctx__html__core
      , ctx__html = $ctx__html(ctx$, {
          CENSIBLE_API_URL: env.CENSIBLE_API_URL
        })
  log(`${logPrefix}|$body__quovo_demo`, ctx$.user_id__quovo, keys(ctx$))
  return `
    <body>
      <quovo-demo-page ctx="{opts.ctx}"></quovo-demo-page>
      ${$html__js(ctx$, {indentation: $indentation(6), indentFirstLine: false})}
      <script>
        (function() {
          $ctx.mount({
            ctx: ${JSON.stringify(ctx__html)},
            mount: [document.querySelector('quovo-demo-page')]
          })
        })()
      </script>
    </body>`.trim().replace($regexp__indentation(4), '')
}
export function $js__html__files(opts) {
  const rest = opts.rest || []
  return [
    env.URL__SHIM__CORE_JS,
    env.RIOT_URL,
    $versioned__js('/dist/quovo-demo', opts)
  ].concat(...rest)
}