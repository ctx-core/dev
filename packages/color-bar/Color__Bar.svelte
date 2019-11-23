<script>
import { createEventDispatcher } from 'svelte'
import { andand } from '@ctx-core/function'
import { _present__a1 } from '@ctx-core/array'
import { _style } from '@ctx-core/html'
import Fit from '@ctx-core/dom/Fit.svelte'
import { log, debug } from '@ctx-core/logger'
const logPrefix = '@ctx-core/color-bar/Color__Bar.svelte'
const dispatch = createEventDispatcher()
export let a1__label
export let a1__representation
export let a1__title
export let a1__value
export let a1__weight
export let a1__class
export let a1__compressor = []
function _style__li(weight) {
	return _style({
		'-webkit-box-flex': weight,
		flex: weight
	})
}
function __click(event, idx) {
	dispatch('click', {
		event,
		idx,
		label: a1__label && a1__label[idx],
		representation: a1__representation && a1__representation[idx],
		title: a1__title && a1__title[idx],
		value: a1__value && a1__value[idx],
		weight: a1__weight && a1__weight[idx],
	})
}
</script>

<div class="Color__Bar {$$props.class||''}">
	<ul class="data">
		{#each a1__title||[] as title,idx}
			<li
				class="{a1__class[andand(a1__value, idx) || 0]}"
				title="{title || ''}"
				style="{_style__li(andand(a1__weight, idx))}"
				on:click="{event => __click(event, idx)}"
			>
				{andand(a1__representation, idx)}
			</li>
		{/each}
	</ul>
	<ul
		class="labels"
		class:present="{_present__a1(a1__label)}"
	>
		{#each a1__title||[] as title,idx}
			<li
				class="label"
				title="{title || ''}"
				style="{_style__li(andand(a1__weight, idx))}"
				on:click="{event => __click(event, idx)}"
			>
				<Fit compressor={a1__compressor[idx] || 1}>{andand(a1__label, idx)}</Fit>
			</li>
		{/each}
	</ul>
</div>

<style type="text/scss">
:global(.Color__Bar) {
	box-sizing: border-box;
	display: block;
	:global(*) {
		box-sizing: border-box;
	}
	:global(ul) {
		display: -webkit-box;
		display: flex;
		height: 1rem;
		width: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
		-webkit-box-align: center;
		-webkit-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		text-align: center;
		list-style: none;
		&.data {
			:global(li) {
				align-items: center;
				justify-content: center;
			}
		}
		&.labels {
			display: none;
			&.present {
				display: -webkit-box;
				display: flex;
			}
		}
		:global(li) {
			-webkit-box-flex: 1;
			flex: 1;
			height: 1rem;
			font-size: 1rem;
			line-height: 1rem;
			padding-top: 0.05em;
			width: auto;
			color: white;
			border-left: 2px solid #FFF;
			&.label {
				position: relative;
				color: #000000;
				font-weight: normal;
				> :global(div) {
					position: absolute;
					display: -webkit-box;
					display: flex;
					-webkit-box-align: center;
					-webkit-flex-align: center;
					align-items: center;
					-webkit-box-pack: center;
					-webkit-flex-pack: center;
					justify-content: center;
					width: 100%;
					text-align: center;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
}
</style>
