<script>
import {
	_is__visible__,
	_is__active__
} from './lib'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/scroll/Sticky__Scroll.svelte'
let getBoundingClientRect = getBoundingClientRect__default
let terminal = null
let root = null
let active
let visible
onMount(() => {
	reset({})
	if (terminal) {
		if (terminal.addEventListener) {
			terminal.addEventListener('scroll', reset)
		} else if (terminal.on) {
			terminal.on('scroll', reset)
		}
	}
})
onDestroy(() => {
	log(`${logPrefix}|onDestroy`)
	if (terminal) {
		if (terminal.removeEventListener) {
			terminal.removeEventListener('scroll', reset)
		} else if (terminal.off) {
			terminal.off('scroll', reset)
		}
	}
	if (contains__visible()) {
		remove__visible()
	}
	if (contains__active()) {
		remove__active()
	}
})
function reset(event) {
	const { top, bottom } = getBoundingClientRect(root)
	const { innerHeight } = window
	const active__ = _is__active__(top, bottom)
	const visible__ = _is__visible__(top, bottom, innerHeight)
	if (visible__) {
		if (!visible) {
			add__visible()
		}
	} else {
		if (visible) {
			remove__visible()
		}
	}
	if (active__) {
		if (!active) {
			add__active()
		}
	} else {
		if (active) {
			remove__active()
		}
	}
}
function add__active() {
	active = true
	dispatch('add__active', _event())
}
function remove__active() {
	active = false
	dispatch('remove__active', _event())
}
function add__visible() {
	visible = true
	dispatch('add__visible', _event())
}
function remove__visible() {
	visible = false
	dispatch('remove__visible', _event())
}
function getBoundingClientRect__default() {
	return root.getBoundingClientRect()
}
function contains__visible() {
	return root.classList.contains('visible')
}
function contains__active() {
	return root.classList.contains('active')
}
function _event() {
	return {
		root,
		target: root,
		currentTarget: root,
	}
}
</script>

<svelte:window
	on:scroll="{reset}"
	on:resize="{reset}"
/>

<div
	bind:this="{root}"
	class="Sticky__Scroll {$$props.class||''}"
	class:active="{active}"
>
	<slot></slot>
</div>
