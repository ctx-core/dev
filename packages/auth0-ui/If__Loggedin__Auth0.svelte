<script>
import {
	__is__loggedin__auth0,
	__is__loggedout__auth0,
} from '@ctx-core/auth0/store'
import Auth0 from './Auth0.svelte'
</script>

{#if $__is__loggedin__auth0}
	<slot name="loggedin"><slot></slot></slot>
{:else if $__is__loggedout__auth0}
	<slot name="loggedout"></slot>
{/if}
