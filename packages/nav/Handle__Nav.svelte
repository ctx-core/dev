<script>
	import { __opened__nav, open__nav, close__nav } from './store'
	import FA_bars_solid from '@ctx-core/font-awesome/ui/FA-bars-solid.svelte'
</script>

<a
	href="."
	class="nav-handle Handle__Nav {$$props.class || ''}"
	on:click|preventDefault="{open__nav}"
>
	<slot>
		<FA_bars_solid></FA_bars_solid>
	</slot>
</a>
