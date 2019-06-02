<script>
	export let tabindex = '0'
</script>

<a
	href="."
	class="close Close__Dialog {$$props.class||''}"
	tabindex="{tabindex || '0'}"
	on:click|preventDefault
>&#10006;</a>

<style type="text/scss">
	:global(.Close__Dialog) {
		text-decoration: none;
	}
</style>
