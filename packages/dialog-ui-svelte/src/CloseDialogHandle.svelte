<script lang="ts">
export let tabindex = '0'
</script>

<a
	href="."
	class="close CloseDialogHandle {$$props.class||''}"
	tabindex="{tabindex || '0'}"
	on:click|preventDefault
><slot>&#10006;</slot></a>

<style lang="scss">
:global(.CloseDialogHandle) {
	text-decoration: none;
}
</style>
