<script>
		export let selected = false
	export let href = ''
	export let alt = ''
	export let title = ''
	$: class__ = $$props.class || ''
</script>

<div
	class="Item__Nav {$$props.class||''}"
	class:selected
>
	<slot name="in"><a class="default_a" {href} {alt} {title} on:click><slot></slot></a></slot>
</div>

<style type="text/scss">
	:global(.Item__Nav a) {
		text-decoration: none;
		&:focus {
			outline: 0;
		}
	}
</style>
