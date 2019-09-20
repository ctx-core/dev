<script>
import { close__nav } from './store'
</script>

<div class="Header__Nav header">
	<slot name="close">
		<a href="." class="close" on:click|preventDefault="{close__nav}">
			<slot name="in__close">×</slot>
		</a>
	</slot>
	<slot></slot>
</div>

<style>
	.Header__Nav a {
		text-decoration: none;
	}
</style>
