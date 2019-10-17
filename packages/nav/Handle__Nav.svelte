<script>
import { get } from 'svelte/store'
import { toggle__nav, __opened__nav } from './store'
import FA_bars_solid from '@ctx-core/fontawesome/ui/FA-bars-solid.svelte'
function __click__window(event) {
	__opened__nav.update(opened__nav => false)
}
</script>

<svelte:window on:click="{__click__window}"></svelte:window>

<a
	href="."
	class="nav-handle Handle__Nav {$$props.class||''}"
	on:click|preventDefault|stopPropagation="{toggle__nav}"
>
	<slot>
		<FA_bars_solid></FA_bars_solid>
	</slot>
</a>
