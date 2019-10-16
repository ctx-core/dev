<script>
import { onMount, onDestroy } from 'svelte'
import { assign } from '@ctx-core/object'
import { _has__dom } from '@ctx-core/dom'
import { _style } from '@ctx-core/html'
export let loading = true
export let index = 0
export let period__interval = 10000
export let transition_duration = 500
export let translateX = 0
export let is__touchstart = false
export let clientX__mousedown = null
export let clientX__mousemove = null
export let updating = null
let node__Carousel, interval__background_image, node__items
//region width__node__Carousel
let width__node__Carousel
$: width__node__Carousel =
	node__Carousel && parseFloat(getComputedStyle(node__Carousel).width)
//endregion
//region height__node__items
let height__node__items
$: height__node__items = node__items && parseFloat(getComputedStyle(node__items).height)
//endregion
$: width__node__Carousel && height__node__items && resize__items()
//region style__items
let style__items
$: style__items =
	_style({
		width: `${width__node__Carousel * _length__items()}px`,
		transition: updating ? `${transition_duration}ms ease-out` : 0,
		transform: translateX ? `translate(${translateX}px)` : '',
	})
//endregion
if (_has__dom()) {
	onMount(() => {
		loading = true
		setTimeout(() => {
			setInterval__background_image()
			resize__items()
			loading = false
		})
	})
	onDestroy(clearInterval__background_image)
}
/*
	Using reactive blocks results in a glitch
		when transitioning from first to _last & _last to first slides.
	Factory Functions fix the overflow glitch.
*/
function _length__items() {
	return node__items && node__items.children.length
}
function _index__last() {
	return _length__items() - 1
}
function _index__previous() {
	return index ? index - 1 : _index__last()
}
function _idx__next() {
	return (index < _index__last()) ? index + 1 : 0
}
function resize__items() {
	for (let i = 0; i < _length__items(); i++) {
		const px__left = _px__left(i)
		const item = node__items.children[i]
		const style = {
			position: 'absolute',
			top: 0,
			left: `${px__left}px`,
			height: `${height__node__items}px`,
			width: `${width__node__Carousel}px`,
			'z-index': 1,
		}
		assign(item.style, style)
	}
}
function next() {
	setTimeout(() => {
		const index__transition = (index + 1) % _length__items()
		set__index(index__transition)
	})
}
function prev() {
	setTimeout(() => {
		const length__items = _length__items()
		const index__transition = (length__items + index - 1) % length__items
		set__index(index__transition)
	})
}
function clearInterval__background_image() {
	if (interval__background_image) {
		clearInterval(interval__background_image)
	}
	interval__background_image = null
}
function setInterval__background_image() {
	clearInterval__background_image()
	interval__background_image = setInterval(
		() => {
			next(node__items)
		},
		period__interval)
}
function set__index(index__transition) {
	clearInterval__background_image()
	updating = true
	setTimeout(() => {
		translateX = -1 * _px__left(index__transition)
		setTimeout(() => {
			if (!updating) {
				return
			}
			updating = false
			setTimeout(() => {
				index = index__transition
				resize__items()
				translateX = 0
				setInterval__background_image()
			}, 0)
		}, transition_duration)
	}, 100)
}
function __resize__window(event) {
	node__Carousel = node__Carousel
	node__items = node__items
}
function __mousedown__window(event) {
	const { top, left, width } = node__Carousel.getBoundingClientRect()
	const { clientX, clientY } = event
	const active = clientY >= top && clientY <= (top + height__node__items) && clientX >= left && clientX <= (left + width)
	if (active) {
		is__touchstart = true
		clientX__mousedown = clientX - translateX
		updating = false
	}
}
function __mousemove__window(event) {
	if (!is__touchstart) return
	const { clientX } = event
	translateX = clientX - clientX__mousedown
	clientX__mousemove = clientX
}
function __touchstart__window(event) {
	__mousedown__window(event.changedTouches[0])
}
function __touchmove__window(event) {
	__mousemove__window(event.changedTouches[0])
}
function __touchend__window(event) {
	__mouseup__window(event.changedTouches[0], node__items)
}
function __touchleave__window(event) {
	__mouseup__window(event.changedTouches[0], node__items)
}
function __touchcancel__window(event) {
	__mouseup__window(event.changedTouches[0], node__items)
}
function __mouseup__window(event) {
	if (!is__touchstart) return
	const { clientX } = event
	const clientX__diff = clientX - clientX__mousedown
	is__touchstart = false
	clientX__mousedown = null
	clientX__mousemove = null
	if (clientX__diff > 0) {
		translateX = clientX__diff
		prev()
	} else if (clientX__diff < 0) {
		translateX = clientX__diff
		next()
	} else {
		translateX = 0
	}
}
function _px__left(i) {
	return (
		i == index
		? 0
		: i == _index__previous()
			? -width__node__Carousel
			: i == _idx__next()
				? width__node__Carousel
				: width__node__Carousel * (i - index)
	)
}
</script>

<svelte:window
	on:resize={__resize__window}
	on:touchstart={__touchstart__window}
	on:touchmove={__touchmove__window}
	on:touchend={__touchend__window}
	on:touchleave={__touchleave__window}
	on:touchcancel={__touchcancel__window}
	on:mousedown={__mousedown__window}
	on:mousemove={__mousemove__window}
	on:mouseup={__mouseup__window}
></svelte:window>

<div
	bind:this={node__Carousel}
	class="Carousel {$$props.class||''}"
	class:loading="{loading}"
	class:updating="{updating}"
	class:is__touchstart="{is__touchstart}"
>
	<div class="prev button" on:click={prev}>
		<slot name="prev"></slot>
	</div>
	<div class="next button" on:click={next}>
		<slot name="next"></slot>
	</div>
	<div bind:this={node__items} class="items" style="{style__items}">
		<slot></slot>
	</div>
</div>

<style>
.Carousel {
	width: 100%;
	height: 100%;
	position: absolute;
}
.Carousel.loading > .items {
	visibility: hidden;
}
.Carousel.is__touchstart .button {
	cursor: auto;
}
.Carousel.is__touchstart > .items {
	cursor: grabbing;
}
.Carousel > .items {
	width: 100%;
	height: 100%;
	overflow: visible;
	display: flex;
	flex-direction: row;
}
:global(.Carousel .button) {
	display: block;
	position: absolute;
	top: calc(50% - 2.5rem);
	width: 5rem;
	height: 5rem;
	opacity: 0.4;
}
@media (max-width: 768px) {
	:global(.Carousel .button) {
		height: 3rem;
		width: 3rem;
	}
}
:global(.Carousel .button:hover) {
	opacity: 0.8;
}
:global(.Carousel .button.prev) {
	left: 0;
	z-index: 2;
}
:global(.Carousel .button.next) {
	right: 0;
	z-index: 2;
}
:global(.Carousel svg) {
	width: 100%;
	height: 100%;
}
</style>
