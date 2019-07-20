<script>
	import Icon from '@ctx-core/svg/Icon.svelte'
	import { unpick } from '@ctx-core/object'
	export let node = null
	let props
	$: props = unpick($$props, 'class')
</script>

<Icon bind:this={node} class="fa-icon {$$props.class||''}" {...props}><slot></slot></Icon>
