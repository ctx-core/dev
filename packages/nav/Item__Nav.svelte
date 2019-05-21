<script>
	export let selected = false
	export let href = ''
	export let alt = ''
	export let title = ''
	let class__
	$: class__ = $$props.class || ''
</script>

<div
	class="Item__Nav {class__}"
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