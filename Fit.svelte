<script>
// Adapted from https://github.com/adactio/FitText.js
import { onMount } from 'svelte'
let root
export let compressor = 1
export let minFontSize = -Infinity
export let maxFontSize = Infinity
let visible
function resizer() {
	root.style.fontSize =
		Math.max(
			Math.min(
				root.clientWidth / (compressor * 10),
				parseFloat(maxFontSize)
			),
			parseFloat(minFontSize)
		) + 'px'
	visible = true
}
onMount(resizer)
</script>

<svelte:window on:resize={resizer} on:orientationchange={resizer}></svelte:window>

<div bind:this={root} class:visible><slot></slot></div>

<style type="text/scss">
div {
	visibility: hidden;
	&.visible {
		visibility: visible;
	}
}
</style>
