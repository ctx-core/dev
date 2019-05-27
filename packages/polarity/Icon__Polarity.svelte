<script>
	export let class__ = $$props.class || ''
	export let polarity = 0
</script>

<span class="Icon_Polarity {class__}">
	{#if polarity > 0}
		<span class="positive">&uarr;</span>
	{:else if polarity < 0}
		<span class="negative">&darr;</span>
	{:else}
		<span class="neutral">&larr;</span>
	{/if}
</span>

<style type="text/scss">
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