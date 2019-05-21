<script>
	import { onMount } from 'svelte'
	import Close__Dialog__Auth0 from './Close__Dialog__Auth0.svelte'
	import {
		__AUTH0_DOMAIN,
		__error__token__auth0,
		open__login__auth0,
		open__signup__auth0,
	} from '@ctx-core/auth0/store'
	import { __submit__change_password } from './Auth0.svelte.js'
	export let class__button = ''
	let root
	let email__forgot_password
	let password__change_password
	let password_confirmation__change_password
	let error__password
	let error__password_confirmation
	$: error__password = $__error__token__auth0 && $__error__token__auth0.password
	$: error__password_confirmation = $__error__token__auth0 && error__password_confirmation
</script>

<div bind:this="{root}" class="form change_password">
	<Close__Dialog__Auth0></Close__Dialog__Auth0>
	<h1>Change Password</h1>
	<form
		action="https://{$__AUTH0_DOMAIN}/dbconnections/change_password"
		accept-charset="UTF-8"
		method="post"
		on:submit="{
			event =>
				__submit__change_password(event, {
					password__change_password,
					password_confirmation__change_password,
				})
		}"
	>
		{#if $__error__token__auth0}
			<ul>
				<li class="error">
					{$__error__token__auth0.error}: {$__error__token__auth0.error_description}
				</li>
			</ul>
		{/if}
	<fieldset>
		<label class="field">
			<div>Password</div>
			<input
				bind:this={password__change_password}
				placeholder="**********"
				required="required"
				class:invalid="{error__password}"
				id="password-change_password"
				type="password"
				name="password"/>
		</label>
		<label class="field">
			<div>Confirm Password</div>
			<input
				bind:this={password_confirmation__change_password}
				placeholder="**********"
				required="required"
				class:invalid="{error__password_confirmation}"
				type="password"
				name="password_confirmation"
				id="password_confirmation-change_password"/>
		</label>
		</fieldset>
		<footer>
			<input type="submit" value="Change Password" class="button {class__button}"/>
		</footer>
	</form>
</div>
