<script>
	import { setContext } from 'svelte'
	export let CONTEXT_KEY
	export let Layout
	export let Error
	export let stores
	export let error
	export let status
	export let component
	setContext(CONTEXT_KEY, stores)
</script>

<Layout amp={true} {$$props}>
	{#if error}
		<Error {error} {status}/>
	{:else}
		<svelte:component this="{component}"></svelte:component>
	{/if}
</Layout>
