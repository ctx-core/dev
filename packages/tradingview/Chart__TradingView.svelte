<script>
// See https://www.tradingview.com/widget/advanced-chart/
import { _uuid } from '@ctx-core/uuid'
import { _hostname } from '@ctx-core/dom'
import { _str__query } from '@ctx-core/uri'
export let id = `Chart__TradingView__${_uuid()}`
export let symbol = null
export let width = '100%'
export let height = '100%'
export let interval = 'D'
export let news = ''
export let hidetoptoolbar = ''
export let hidelegend = ''
export let hidesidetoolbar = ''
export let symboledit = ''
export let saveimage = ''
export let toolbarbg = 'f1f3f6'
export let studies = ''
export let theme = 'Light'
export let style = 1
export let timezone = 'UTC'
export let studies_overrides = ''
export let overrides = ''
export let enabled_features = ''
export let disabled_features = ''
export let locale = 'en'
export let utm_source = _hostname() || ''
export let utm_medium = 'widget_new'
export let utm_campaign = 'chart'
let query
$: query = ({
	frameElementId: id,
	symbol,
	interval,
	news,
	hidetoptoolbar,
	hidelegend,
	hidesidetoolbar,
	symboledit,
	saveimage,
	toolbarbg,
	studies,
	theme,
	style,
	timezone,
	studies_overrides,
	overrides,
	enabled_features,
	disabled_features,
	locale,
	utm_source,
	utm_medium,
	utm_campaign,
})
export let str__query = ''
$: str__query = _str__query(query)
//	https://www.tradingview.com/widgetembed/?frameElementId=tradingview_8a157&symbol=TSX%3ABB&interval=D&hidetoptoolbar=1&hidelegend=1&hidesidetoolbar=1&symboledit=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=Light&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=TSX%3ABB
</script>

{#if symbol}
	<iframe
		{id}
		title="{symbol}"
		class="Chart__TradingView {$$props.class||''}"
		src="https://tradingview.com/widgetembed/{str__query}"
		{width}
		{height}
		frameborder="0"
	></iframe>
	<slot></slot>
{/if}
