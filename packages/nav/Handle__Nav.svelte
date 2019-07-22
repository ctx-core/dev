<script>
	import { toggle__nav } from './store'
	import FA_bars_solid from '@ctx-core/fontawesome/ui/FA-bars-solid.svelte'
</script>

<a
	href="."
	class="nav-handle Handle__Nav {$$props.class||''}"
	on:click|preventDefault="{toggle__nav}"
>
	<slot>
		<FA_bars_solid></FA_bars_solid>
	</slot>
</a>
