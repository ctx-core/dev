<script>
import { writable } from 'svelte/store'
import { __click__ripple_effect } from '@ctx-core/ripple-effect'
import { __click__anchor__scroll } from '@ctx-core/dom'
import { each } from '@ctx-core/array'
import FA_arrow_up_solid from '@ctx-core/fontawesome/ui/FA-arrow-up-solid.svelte'
import FA_arrow_down_solid from '@ctx-core/fontawesome/ui/FA-arrow-down-solid.svelte'
export let prev__section = null
export let next__section = null
export let a1__section = []
export let color__ripple = null
const __loaded__prev__section = writable(null)
const __loaded__next__section = writable(null)
let link__prev__section, link__next__section
$: a1__section, update__navigation__section()
update__navigation__section()
function update__navigation__section() {
	unset__loaded()
	each(a1__section, (section, i) => {
		const BoundingClientRect = section.getBoundingClientRect()
		const { top } = BoundingClientRect
		const bottom = BoundingClientRect.bottom - 10
		if (bottom >= 0) {
			prev__section =
				top < 0
				? section
				: a1__section[i - 1]
			next__section = a1__section[i + 1]
			set__loaded()
			return
		}
	})
	prev__section = null
	next__section = null
}
function __click__navigation(event) {
	__click__anchor__scroll(event)
	if (a1__section) {
		if (color__ripple) __click__ripple_effect(event)
		update__navigation__section()
	}
}
function unset__loaded() {
	__loaded__prev__section.set(false)
	__loaded__next__section.set(false)
}
function set__loaded() {
	if (link__prev__section) {
		__loaded__prev__section.set(true)
	}
	if (link__next__section) {
		__loaded__next__section.set(true)
	}
}
</script>

<svelte:window on:scroll="{update__navigation__section}"></svelte:window>

<div class="Pagination__Scroll {$$props.class||''}">
	<div class="outer-container">
		{#if prev__section}
			<a
				bind:this={link__prev__section}
				class="prev__section"
				class:loaded={$__loaded__prev__section}
				href="#{prev__section.id}"
				{color__ripple}
				on:click={__click__navigation}
			>
				<div class="prev__section__icon section__icon">
					<slot name="icon-up">
						<FA_arrow_up_solid></FA_arrow_up_solid>
					</slot>
				</div>
				<div class="content">
					<div class="label">Previous</div>
					<div class="title">{prev__section.title}</div>
				</div>
			</a>
		{/if}
		{#if next__section}
			<a
				bind:this={link__next__section}
				class="next__section"
				class:loaded={$__loaded__next__section}
				href="#{next__section.id}"
				{color__ripple}
				on:click={__click__navigation}
			>
				<div class="next__section__icon section__icon">
					<slot name="icon-down">
						<FA_arrow_down_solid></FA_arrow_down_solid>
					</slot>
				</div>
				<div class="content">
					<div class="label">Next</div>
					<div class="title">{next__section.title}</div>
				</div>
			</a>
		{/if}
	</div>
</div>

<style type="text/scss">
:global(.Pagination__Scroll) {
	position: fixed;
	bottom: 0;
	right: 0;
	height: 3.6em;
	width: 100%;
	font-size: 1rem;
	overflow: hidden;
	&.lower-left {
		bottom: 0;
		left: 0;
		right: auto;
	}
	.outer-container {
		display: flex;
		flex-direction: row;
		height: 100%;
		margin: auto;
		> a {
			position: relative;
			display: flex;
			flex-direction: row;
			flex: 1;
			width: 50%;
			height: 100%;
			box-sizing: border-box;
			padding-top: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			text-decoration: none;
			white-space: nowrap;
			user-select: none;
			&.prev__section {
				text-align: left;
				padding-right: 12px;
				.section__icon {
					float: left;
					margin: 9px 8px 0 3px;
				}
			}
			&.next__section {
				flex-direction: row-reverse;
				text-align: right;
				padding-left: 12px;
				.section__icon {
					float: right;
					margin: 9px 3px 0 8px;
				}
			}
			&.loaded {
				div {
					opacity: 1;
					transition: opacity .25s ease-out;
				}
			}
			.section__icon {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: flex-start;
				flex: 0;
				min-width: 20px;
				max-width: 20px;
				padding-bottom: 1rem;
				background-size: contain;
			}
			.content {
				flex: 1;
				.label {
					font-size: .75em;
					line-height: 1em;
					margin-bottom: 1px;
					vertical-align: top;
				}
				.title {
					line-height: 1.25em;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			div {
				opacity: 0;
			}
		}
	}
}
</style>
