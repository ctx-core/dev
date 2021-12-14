<script lang="ts">
import { each } from '@ctx-core/array'
import { keys, unpick } from '@ctx-core/object'
export let viewBox:string|null = null, preserveAspectRatio:string|null = null, height:string|number|null = null,
	width:string|number|null = null, x:string|number|null = null, y:string|number|null = null, style = '',
	node:SVGElement|null = null
let props
$: props = unpick($$props, 'class')
// TODO: Use spread {...props} on node on fix - https://github.com/sveltejs/svelte/issues/2732
$: {
	props
	if (node) {
		each(
			keys(props),
			prop=>node!.setAttribute(prop, props[prop]))
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

<style>
:global(.Icon) {
	height: 100%;
	width: 100%;
}
</style>
