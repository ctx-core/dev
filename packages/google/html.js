/**
 * @module @ctx-core/google/html
 * @see {@link https://developers.google.com/tag-manager}
 */
import { clone } from '@ctx-core/object/lib.js'
import { throw__missing_argument } from '@ctx-core/error/lib.js'
import { log, debug } from '@ctx-core/logger/lib.js'
const logPrefix = '@ctx-core/google/html.js'
/**
 * Google Analytics script html
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string} html
 */
export function _script__google__analytics(ctx, ...ARR__opts) {
	log(`${logPrefix}|_script__google__analytics`)
	const opts = clone(...ARR__opts)
	const GA_ID = opts.GA_ID || process.env.GA_ID
	if (!GA_ID) throw__missing_argument(ctx, { key: 'process.env.GA_ID' })
	return `
<!-- Google Analytics -->
<script data-cfasync="false">
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');	
ga('create', '${GA_ID}', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
	`.trim()
}
export function _script__gtm(ctx, ...ARR__opts) {
	log(`${logPrefix}|_script__gtm`)
	const opts = clone(...ARR__opts)
	return `
${_html__script__head__gtm(opts)}
${_html__script__body__gtm(opts)}
	`.trim()
}
/**
 * Google Tag Manager script html to place at the top of `<head>`
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string} html
 */
export function _html__script__head__gtm(...ARR__opts) {
	log(`${logPrefix}|_html__script__head__gtm`)
	const opts = clone(...ARR__opts)
	const GTM_ID = opts.GTM_ID || process.env.GTM_ID
	const { dataLayer = [] } = opts
	if (!GTM_ID) throw__missing_argument(opts, { key: 'process.env.GTM_ID' })
	return `
<script data-cfasync="false">window.dataLayer = ${JSON.stringify(dataLayer)};</script>
<!-- Google Tag Manager -->
<script data-cfasync="false">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->
	`.trim()
}
/**
 * Google Tag Manager script html to place at the top of `<body>`
 * @param {module:ctx-core/object/lib~ctx}
 * @returns {string} html
 */
export function _html__script__body__gtm(...ARR__opts) {
	log(`${logPrefix}|_html__script__body__gtm`)
	const opts = clone(...ARR__opts)
	const GTM_ID = opts.GTM_ID || process.env.GTM_ID
	if (!GTM_ID) throw__missing_argument(opts, { key: 'process.env.GTM_ID' })
	return `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
	`.trim()
}