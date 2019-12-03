<script>
export let polarity = 0
</script>

<span class="Icon_Polarity {$$props.class||''}">
	{#if polarity > 0}
		<span class="positive">&uarr;</span>
	{:else if polarity < 0}
		<span class="negative">&darr;</span>
	{:else}
		<span class="neutral">&larr;</span>
	{/if}
</span>

<style type="text/css">
.positive {
	color: #33A532;
}
.neutral {
	color: #999999;
}
.negative {
	color: #CC0605;
}
</style>
