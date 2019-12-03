/**
 * @module @ctx-core/google/html
 * @see {@link https://developers.google.com/tag-manager}
 */
import { clone } from '@ctx-core/object'
import { throw__missing_argument } from '@ctx-core/error'
import { log } from '@ctx-core/logger'
const logPrefix = '@ctx-core/google/html.js'
type Opts__html__webfont__fout = {
	WebFontConfig?:any
	families?:string[]
}
/**
 * Html to guard agaist flash of unfocused text with Google Fonts.
 * @param opts
 * @param opts.WebFontConfig
 * @param opts.families
 * @returns {string}
 * @example `_html__webfont__fout({ families: ['Open Sans'] })`
 * @example `_html__webfont__fout({ WebFontConfig: { custom: { families: ['My Font', 'My Other Font:n4,i4,n7'], urls: ['/fonts.css'] }} })`
 */
export function _html__webfont__fout(opts:Opts__html__webfont__fout = {}) {
	const WebFontConfig =
		opts.WebFontConfig
		|| {
			google: { families: opts.families || [] }
		}
	return `
<script>
WebFontConfig = ${JSON.stringify(WebFontConfig)};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();
</script>
	`.trim()
}
type Opts__html__gtag = {
	GOOGLE_TRACKING_ID?:string
}
/**
 * Html to add gtag.js to the site
 * @param opts
 * @param opts.GOOGLE_TRACKING_ID
 * @returns {string}
 */
export function _html__gtag(opts:Opts__html__gtag = {}) {
	const GOOGLE_TRACKING_ID = opts.GOOGLE_TRACKING_ID || process.env.GOOGLE_TRACKING_ID || ''
	if (!GOOGLE_TRACKING_ID) throw__missing_argument(opts, { key: 'process.env.GOOGLE_TRACKING_ID' })
	return `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TRACKING_ID}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TRACKING_ID}');
</script>
	`.trim()
}
/**
 * Html to add ga.js to the site
 * @param opts
 * @param opts.GOOGLE_TRACKING_ID || opts.GA_ID
 * @returns {string} html
 */
export function _script__google__analytics(...a1__opts) {
	log(`${logPrefix}|_script__google__analytics`)
	const opts = clone(...a1__opts)
	const GOOGLE_TRACKING_ID = opts.GOOGLE_TRACKING_ID || opts.GA_ID || process.env.GA_GOOGLE_TRACKING_ID
	if (!GOOGLE_TRACKING_ID) throw__missing_argument({ key: 'process.env.GOOGLE_TRACKING_ID' })
	return `
<!-- Google Analytics -->
<script data-cfasync="false">
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');	
ga('create', '${GOOGLE_TRACKING_ID}', 'auto');
ga('send', 'pageview');
</script>
<!-- End Google Analytics -->
	`.trim()
}
/**
 * Html to add gtm.js to the page
 * @param opts
 * @param opts.GTM_ID
 * @returns {string}
 */
export function _html__script__gtm(opts = {}) {
	log(`${logPrefix}|_script__gtm`)
	return `
${_html__script__head__gtm(opts)}
${_html__script__body__gtm(opts)}
	`.trim()
}
export const _script__gtm = _html__script__gtm
type Opts__html__script__head__gtm = {
	GTM_ID?:string
	dataLayer?:[]
}
/**
 * Google Tag Manager script html to place at the top of `<head>`
 * @param opts
 * @param opts.GTM_ID
 * @returns {string} html
 */
export function _html__script__head__gtm(opts:Opts__html__script__head__gtm = {}) {
	log(`${logPrefix}|_html__script__head__gtm`)
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
type Opts__html__script__body__gtm = {
	GTM_ID?:string
}
/**
 * Google Tag Manager script html to place at the top of `<body>`
 * @param opts
 * @param opts.GTM_ID
 * @returns {string} html
 */
export function _html__script__body__gtm(opts:Opts__html__script__body__gtm = {}) {
	log(`${logPrefix}|_html__script__body__gtm`)
	const GTM_ID = opts.GTM_ID || process.env.GTM_ID
	if (!GTM_ID) throw__missing_argument(opts, { key: 'process.env.GTM_ID' })
	return `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
	`.trim()
}
