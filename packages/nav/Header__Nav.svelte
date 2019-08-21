<script>
import { close__nav } from './store'
</script>

<div class="header__nav header">
	<slot name="close">
		<a href="." class="close" on:click|preventDefault="{close__nav}">
			<slot name="in__close">×</slot>
		</a>
	</slot>
	<slot></slot>
</div>

<style>
	.header__nav a {
		text-decoration: none;
	}
</style>
