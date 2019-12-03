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
export let node = null
let props
$: props = unpick($$props, 'class')
// TODO: Use spread {...props} on node on fix - https://github.com/sveltejs/svelte/issues/2732
$: {
	props
	if (node) {
		each(
			keys(props),
			prop => node.setAttribute(prop, props[prop]))
	}
}
</script>

<svelte:options namespace="svg"></svelte:options>

<svg
	bind:this={node}
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
