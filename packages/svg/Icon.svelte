<script>
	import { keys, unpick } from '@ctx-core/object'
	import { each } from '@ctx-core/array'
	export let viewBox = null
	export let preserveAspectRatio = null
	export let height = null
	export let width = null
	export let x = null
	export let y = null
	export let style = ''
	let dom__svg
	let props
	$: props = unpick($$props, 'class')
	// TODO: Use spread {...props} on svg on fix - https://github.com/sveltejs/svelte/issues/2732
	$: {
		props
		if (dom__svg) {
			each(
				keys(props),
				prop => dom__svg.setAttribute(prop, props[prop]))
		}
	}
</script>

<svelte:options namespace="svg"></svelte:options>

<svg
	bind:this="{dom__svg}"
	xmlns:svg="http://www.w3.org/2000/svg"
	xmlns="http://www.w3.org/2000/svg"
	version="1.2"
	class="Icon {$$props.class||''}"
	{style}
	{viewBox}
	{preserveAspectRatio}
	{height}
	{width}
	{x}
	{y}
>
  <slot></slot>
</svg>

<style type="text/css">
	:global(.Icon) {
		height: 100%;
		width: 100%;
	}
</style>
