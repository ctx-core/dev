<script>
	import { close__nav } from './store'
</script>

<div class="Header__Nav header">
	<a href="." class="close" on:click|preventDefault="{close__nav}">
		<slot name="a__close__header">×</slot>
	</a>
	<slot name="close__header"></slot>
</div>
