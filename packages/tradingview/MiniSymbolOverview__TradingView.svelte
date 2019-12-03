<script>
// See https://www.tradingview.com/widget/symbol-overview/
import { _hostname } from '@ctx-core/dom'
export let locale = 'en'
export let symbol = null
export let width = '100%'
export let height = '100%'
export let dateRange = '1y'
export let colorTheme = 'light'
export let trendLineColor = '#37a6ef'
export let underLineColor = '#e3f2fd'
export let isTransparent = true
export let autosize = true
export let largeChartUrl = ''
export let utm_source = _hostname() || ''
export let utm_medium = 'widget_new'
export let utm_campaign = 'mini-symbol-overview'
$: str__query = locale ? `?locale=${locale}` : ''
$: params = (
	{
		symbol,
		width,
		height,
		dateRange,
		colorTheme,
		trendLineColor,
		underLineColor,
		isTransparent,
		autosize,
		largeChartUrl,
		utm_source,
		utm_medium,
		utm_campaign,
	}
)
$: json__params = params && JSON.stringify(params)
$: str__hash = json__params && encodeURIComponent(json__params)
</script>

{#if symbol}
	<iframe
		class="MiniSymbolOverview__TradingView {$$props.class||''}"
		title="{symbol}"
		src="https://tradingview.com/embed-widget/mini-symbol-overview/{str__query}#{str__hash}"
		{width}
		{height}
		frameborder="0"
	></iframe>
	<slot></slot>
{/if}
