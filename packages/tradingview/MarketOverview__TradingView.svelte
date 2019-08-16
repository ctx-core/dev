<script>
export let locale = 'en'
export let width = '100%'
export let height = '100%'
export let showChart = true
export let largeChartUrl = ''
export let plotLineColorGrowing = 'rgba(60, 188, 152, 1)'
export let plotLineColorFalling = 'rgba(255, 74, 104, 1)'
export let gridLineColor = 'rgba(233, 233, 234, 1)'
export let scaleFontColor = 'rgba(214, 216, 224, 1)'
export let belowLineFillColorGrowing = 'rgba(60, 188, 152, 0.05)'
export let belowLineFillColorFalling = 'rgba(255, 74, 104, 0.05)'
export let symbolActiveColor = 'rgba(242, 250, 254, 1)'
export let isTransparent = true
export let tabs = []
export let utm_source =
	typeof window === 'object' ? window.location.hostname : ''
export let utm_medium = 'widget_new'
export let utm_campaign = 'market-overview'
let str__query
$: str__query = ({ locale }) => locale ? `?locale=${locale}` : ''
$: params = (
	{
		width,
		height,
		showChart,
		largeChartUrl,
		plotLineColorGrowing,
		plotLineColorFalling,
		gridLineColor,
		scaleFontColor,
		belowLineFillColorGrowing,
		belowLineFillColorFalling,
		symbolActiveColor,
		isTransparent,
		tabs,
		utm_source,
		utm_medium,
		utm_campaign,
	}
)
$: json__params = params && JSON.stringify(params)
$: str__hash = json__params && encodeURIComponent(json__params)
function _tab__default() {
	return [
		{
			title: 'Securities',
			symbols: [{ s: 'NASDAQ:AAPL', d: 'Apple' }],
			originalTitle: 'Securities'
		}
	]
}
</script>

{#if symbol && _present__a1(tabs)}
	<iframe
		class="MarketOverview__TradingView {$$props.class||''}"
		title="{symbol}"
		src="https://tradingview.com/embed-widget/market-overview/{str__query}#{str__hash}"
		{width}
		{height}
		frameborder="0"
	></iframe>
	<slot></slot>
{/if}
