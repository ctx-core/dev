<script lang="ts">
import { onMount, onDestroy, createEventDispatcher } from 'svelte'
import { out_is_active_, out_is_visible_ } from '@ctx-core/scroll'
const dispatch = createEventDispatcher()
export let terminal:HTMLElement|null = null
let getBoundingClientRect = default_getBoundingClientRect, root:HTMLDivElement|null = null,
	active:boolean, visible:boolean
onMount(()=>{
	reset()
	if (terminal) {
		terminal.addEventListener('scroll', reset)
	}
})
onDestroy(()=>{
	if (terminal) {
		terminal.removeEventListener('scroll', reset)
	}
	if (contains_visible()) {
		remove_visible()
	}
	if (contains_active()) {
		remove_active()
	}
})
function reset() {
	const { top, bottom } = getBoundingClientRect()
	const { innerHeight } = window
	const out_is_active = out_is_active_(top, bottom)
	const out_is_visible = out_is_visible_(top, bottom, innerHeight)
	if (out_is_visible) {
		if (!visible) {
			add_visible()
		}
	} else {
		if (visible) {
			remove_visible()
		}
	}
	if (out_is_active) {
		if (!active) {
			add_active()
		}
	} else {
		if (active) {
			remove_active()
		}
	}
}
function add_active() {
	active = true
	dispatch('add_active', event_())
}
function remove_active() {
	active = false
	dispatch('remove_active', event_())
}
function add_visible() {
	visible = true
	dispatch('add_visible', event_())
}
function remove_visible() {
	visible = false
	dispatch('remove_visible', event_())
}
function default_getBoundingClientRect():DOMRect {
	return root!.getBoundingClientRect()
}
function contains_visible() {
	return root!.classList.contains('visible')
}
function contains_active() {
	return root!.classList.contains('active')
}
function event_() {
	return {
		root,
		target: root,
		currentTarget: root,
	}
}
</script>

<svelte:window
	on:scroll={reset}
	on:resize={reset}
/>

<div bind:this={root} class="Sticky_Scroll {$$props.class||''}" class:active>
	<slot></slot>
</div>
