<script>
export let expanded = false
</script>

<a
	href="."
	class="Knob__Tree__Checkbox"
	on:click
>
	{#if expanded}
		&#x25BC;
	{:else}
		&#x25B6;
	{/if}
</a>
