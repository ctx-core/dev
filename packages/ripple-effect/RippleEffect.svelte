<script context="module">
import { __click__ripple_effect } from './lib'
export { __click__ripple_effect }
</script>

<script>
// See https://codepen.io/Craigtut/pen/dIfzv
</script>

<style type="text/css">
:global(.ripple) {
	overflow: hidden;
}
:global(.ripple-effect) {
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	background: white;
	opacity: 0.4;
	transform: scale(1);
	transition: all 2s;
}
:global(.ripple-effect.ripple-effect-start) {
	opacity: 0;
	transform: scale(100);
}
</style>
