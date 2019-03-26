<script>
	import { _style } from '@ctx-core/html'
	export let id__call = 0
	export let color__ripple
	let style__ripple_effect
	function __click__ripple_effect(event) {
		const {
			currentTarget,
			clientX,
			clientY
		} = event
		id__call++
		const {
			left: left__currentTarget,
			top: top__currentTarget
		} = currentTarget.getBoundingClientRect()
		const { offsetHeight, offsetWidth } = currentTarget
		const length = Math.min(offsetHeight, offsetWidth)
		style__ripple_effect = {
			height: `${length}px`,
			width: `${length}px`
		}
		style__ripple_effect.top = `${(clientY - top__currentTarget) + (length / 2)}px`
		style__ripple_effect.left = `${(clientX - left__currentTarget) - (length / 2)}px`
		if (color__ripple) {
			style__ripple_effect.background = color__ripple
		}
		const id__call__current = id__call
		setTimeout(() => {
			style__ripple_effect = null
			setTimeout(() => {
				style__ripple_effect = _style(style__ripple_effect)
				window.setTimeout(
					() => {
						if (id__call__current == id__call) {
							style__ripple_effect = null
						}
					},
					2000)
			})
		}, 0)
	}
</script>

<div
	class="RippleEffect ripple"
	on:click={__click__ripple_effect}
>
	<slot></slot>
	{#if style__ripple_effect}
		<div
			class="ripple-effect"
			style={style__ripple_effect}
		></div>
	{/if}
</div>

<style type="text/scss">
	.RippleEffect {
		display: inline-block;
		position: relative;
	}
	.ripple {
		overflow: hidden;
	}
	.ripple-effect {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		background: white;
		opacity: 0;
		animation: ripple-animation 2s;
	}
	@keyframes ripple-animation {
		from {
			transform: scale(1);
			opacity: 0.4;
		}
		to {
			transform: scale(100);
			opacity: 0;
		}
	}
</style>
