<script lang="ts">
export let selected = false
export let href = ''
export let alt = ''
export let title = ''
export let a_class = ''
</script>

<div class="Nav_Item {$$props.class||''}" class:selected>
	<slot name="in"><a class="default_a {a_class}" {href} {alt} {title} on:click><slot></slot></a></slot>
</div>

<style>
:global(.Nav_Item a) {
	text-decoration: none;
}
:global(.Nav_Item a):focus {
	outline: 0;
}
</style>
