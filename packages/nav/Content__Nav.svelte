<script>
	import { __opened__nav, open__nav, close__nav } from './store'
	let nav
	function __click__nav(event) {
		const { target } = event
		if (target !== nav) {
			close__nav()
		}
	}
</script>

<nav
	bind:this={nav}
	class="Content__Nav {$$props.class||''}"
	class:opened__nav="{$__opened__nav}"
	on:click="{__click__nav}"
>
	<div class="dialog">
		<slot name="header">
			<div class="header">
				<a href="." class="close" on:click|preventDefault="{close__nav}">
					<slot name="in__close__header">×</slot>
				</a>
				<slot name="close__header"></slot>
			</div>
		</slot>
		<div class="container">
			<slot></slot>
		</div>
	</div>
</nav>
