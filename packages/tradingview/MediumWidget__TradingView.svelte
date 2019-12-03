<script>
/**
 * To get the full graph, set:
 * min-width: 300px
 */
// https://www.tradingview.com/mediumwidgetembed/?symbols=Apple&Apple=AAPL%20&locale=en&trendLineColor=%234bafe9&underLineColor=%23dbeffb&fontColor=%2383888D&gridLineColor=%23e9e9ea&chartOnly=1&width=200px&height=calc(120px%20-%2032px)&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=symbol-overview
// See https://www.tradingview.com/widget/symbol-overview/
import { assign } from '@ctx-core/object'
import { each, map__andand, _present__a1 } from '@ctx-core/array'
import { _str__query } from '@ctx-core/uri'
import { _hostname } from '@ctx-core/dom'
export let title = ''
export let locale = 'en'
export let a2__name__symbol = []
export let trendLineColor = '#4bafe9'
export let underLineColor = '#dbeffb'
export let fontColor = '#83888D'
export let gridLineColor = '#e9e9ea'
export let chartOnly = ''
export let width = '100%'
export let height = '100%'
export let utm_source = _hostname() || ''
export let utm_medium = 'widget_new'
export let utm_campaign = 'mini-symbol-overview'
$: symbols = map__andand(a2__name__symbol, '0')
$: symbol__by__name = _symbol__by__name(a2__name__symbol)
$: query =
	assign({
		locale,
		symbols,
		trendLineColor,
		underLineColor,
		fontColor,
		gridLineColor,
		chartOnly,
		width,
		height,
		utm_source,
		utm_medium,
		utm_campaign,
	}, symbol__by__name)
let str__query
$: str__query = _str__query(query)
function _symbol__by__name(a2__name__symbol) {
	const symbol__by__name = {}
	each(
		a2__name__symbol,
		a1__name__symbol =>
			symbol__by__name[a1__name__symbol[0]] = a1__name__symbol[1])
	return symbol__by__name
}
</script>

{#if _present__a1(a2__name__symbol)}
	<iframe
		{title}
		class="MediumWidget__TradingView {$$props.class||''}"
		src="https://tradingview.com/mediumwidgetembed/{str__query}"
		{width}
		{height}
		frameborder="0"
	></iframe>
	<slot></slot>
{/if}
