<script>
	import { createEventDispatcher } from 'svelte'
	import { each } from '@ctx-core/array'
	import { clone } from '@ctx-core/object'
	import Knob__Tree__Checkbox from './Knob__Tree__Checkbox.svelte'
	import Input__Tree__Checkbox from './Input__Tree__Checkbox.svelte'
	import { log, debug } from '@ctx-core/logger'
	const logPrefix = '@ctx-core/tree__checkbox/Node__Tree__Checkbox.svelte'
	const dispatch = createEventDispatcher()
	export let id = ''
	export let title = ''
	export let checked = null
	export let children = null
	export let expanded = null
	export let indeterminate = null
	export let a1__key__child = null
	$: {
		if (children) {
			log(`${logPrefix}|onstate|children`)
			let has__true
			let has__false
			let checked
			let indeterminate
			each(a1__key__child, key__child => {
				const child = children[key__child]
				has__true = has__true || !!child
				has__false = has__false || !child
			})
			checked = has__true && !has__false
			indeterminate = has__true && has__false
		}
	}
	function __click__knob(event) {
		log(`${logPrefix}|__click__knob`)
		event.preventDefault()
		expanded = !expanded
	}
	function __change__input(event) {
		log(`${logPrefix}|__change__input`)
		const { target } = event
		const { checked } = target
		const children__ = clone(children)
		if (checked) {
			expanded = true
		}
		if (children__ && a1__key__child) {
			each(
				a1__key__child,
				key__child =>
					children__[key__child] = checked)
			indeterminate = false
		}
		dispatch('change', event)
	}
</script>

{#if children}
	<Knob__Tree__Checkbox
		{expanded}
		on:click="{__click__knob}"
	></Knob__Tree__Checkbox>
{/if}
<Input__Tree__Checkbox
	{id}
	{title}
	bind:indeterminate
	bind:checked
	on:change={__change__input}
></Input__Tree__Checkbox>
{#if expanded}
	<slot></slot>
{/if}
