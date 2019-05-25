<script>
	import Close__Dialog__Auth0 from './Close__Dialog__Auth0.svelte'
	import {
		__AUTH0_DOMAIN,
		__error__token__auth0,
		open__signup__auth0,
		open__forgot_password__auth0,
	} from '@ctx-core/auth0/store'
	import { __submit__login } from './Auth0.svelte.js'
	export let class__button = ''
	let root
	let username__login
	let password__login
	let error__username
	let error__password
	$: error__username = $__error__token__auth0 && $__error__token__auth0.username
	$: error__password = $__error__token__auth0 && $__error__token__auth0.password
</script>

<div bind:this="{root}" class="form {$$props.class||''}">
	<Close__Dialog__Auth0></Close__Dialog__Auth0>
	<h1><slot name="login_text">Welcome</slot></h1>
	<form
		action="https://{$__AUTH0_DOMAIN}/oauth/token"
		accept-charset="UTF-8"
		method="post"
		on:submit="{event =>
			__submit__login(event, {
				root,
				username__login,
				password__login
			})}"
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
				<div>Email</div>
				<input
					bind:this="{username__login}"
					placeholder="your@email.com"
					required="required"
					class="form-control"
					class:invalid="{error__username}"
					type="text"
					id="username-login"
					name="username"/>
			</label>
			<label class="field">
				<div>Password</div>
				<input
					bind:this="{password__login}"
					placeholder="**********"
					required="required"
					class:invalid="{error__password}"
					id="password-login"
					type="password"
					name="password"/>
			</label>
		</fieldset>
		<footer>
			<input type="submit" value="Login" class="button {class__button}"/>
			<label
				class="navigation__auth"
				on:click="{open__signup__auth0}"
			>Don't have an account? Signup&hellip;</label>
			<label
				class="navigation__auth"
				on:click="{open__forgot_password__auth0}"
			>Forgot Password?</label>
		</footer>
	</form>
</div>
