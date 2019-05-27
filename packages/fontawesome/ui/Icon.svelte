<script>
	import Icon from '@ctx-core/svg/Icon.svelte'
	import { unpick } from '@ctx-core/object'
	let props
	$: props = unpick($$props, 'class')
</script>

<Icon class="fa-icon {$$props.class || ''}" {...props}><slot></slot></Icon>
