<script>
	import Icon from '@ctx-core/svg/Icon.svelte'
	import { unpick } from '@ctx-core/object'
	export let node = null
	let props
	$: props = unpick($$props, 'class')
</script>

<Icon bind:this={node} class="socicon {$$props.class || ''}" {...props}><slot></slot></Icon>

<style type="text/css">
	:global(.socicon) {
		transform: rotate(180deg) scaleX(-1);
	}
</style>
