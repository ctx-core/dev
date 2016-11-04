import env from 'ctx-core/env'
import {$indentation$regexp} from 'ctx-core/string/indendation'
import {throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/google/html'
export function $script__google__tags(ctx) {
  log(`${logPrefix}|$script__google__tags`)
  const {GTM_ID} = env
  if (!GTM_ID) throw__missing_argument(ctx, {key: 'env.GTM_ID'})
  return `
    <script>data__gtm = [];</script>
    <!-- Google Tag Manager -->
    <noscript><iframe src="//www.googletagmanager.com/ns.html?id=${GTM_ID}"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='data__gtm'?'&l='+l:'';j.async=true;j.src=
            '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','data__gtm','${GTM_ID}');</script>
    <!-- End Google Tag Manager -->
  `.trim().replace($indentation$regexp(0), '')
}