/**
 * @module ctx-core/google/html
 * @see {@link https://developers.google.com/tag-manager}
 */
import env from 'ctx-core/env'
import {$indentation$regexp} from 'ctx-core/string/indendation'
import {throw__missing_argument} from 'ctx-core/error/lib'
import {log,debug} from 'ctx-core/logger/lib'
const logPrefix = 'ctx-core/google/html'
/**
 * Google Analytics script html
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string} html
 */
export function $script__google__analytics(ctx) {
  log(`${logPrefix}|$script__google__analytics`)
  const {GTM_ID} = env
  if (!GTM_ID) throw__missing_argument(ctx, {key: 'env.GTM_ID'})
  return `
    <!-- Google Analytics -->
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
    ga('create', '${GTM_ID}', 'auto');  // Replace with your property ID.
    ga('send', 'pageview');
    
    </script>
    <!-- End Google Analytics -->`
}
/**
 * Google Tag Manager script html to place at the top of <head>
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string} html
 */
export function $script__head__gtm(ctx, ...opts$$) {
  log(`${logPrefix}|$script__head__gtm`)
  const {GTM_ID} = env
      , opts = clone(...opts$$)
      , {dataLayer=[]} = opts
  if (!GTM_ID) throw__missing_argument(ctx, {key: 'env.GTM_ID'})
  return `
    <script>window.dataLayer = ${JSON.stringify(dataLayer)};</script>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');</script>
    <!-- End Google Tag Manager -->
  `.trim().replace($indentation$regexp(0), '')
}
/**
 * Google Tag Manager script html to place at the top of <body>
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string} html
 */
export function $script__body__gtm(ctx) {
  log(`${logPrefix}|$script__body__gtm`)
  const {GTM_ID} = env
  if (!GTM_ID) throw__missing_argument(ctx, {key: 'env.GTM_ID'})
  return `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-${GTM_ID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
  `.trim().replace($indentation$regexp(0), '')
}