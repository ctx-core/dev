<script>
export let selected = false
export let href = ''
export let alt = ''
export let title = ''
export let class__a = ''
</script>

<div
	class="Item__Nav {$$props.class||''}"
	class:selected
>
	<slot name="in"><a class="default_a {class__a}" {href} {alt} {title} on:click><slot></slot></a></slot>
</div>

<style type="text/scss">
:global(.Item__Nav a) {
	text-decoration: none;
	&:focus {
		outline: 0;
	}
}
</style>
