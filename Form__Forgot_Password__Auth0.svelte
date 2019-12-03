<script>
import Close__Dialog__Auth0 from './Close__Dialog__Auth0.svelte'
import {
	__AUTH0_DOMAIN,
	__error__token__auth0,
	open__login__auth0,
	open__signup__auth0,
} from '@ctx-core/auth0/store'
import { __submit__forgot_password } from './Auth0.svelte.js'
export let class__error = ''
export let class__input = ''
export let class__button = ''
export let class__label = ''
let root
let email__forgot_password
let password__signup
let password_confirmation__signup
let error__email
$: error__email = $__error__token__auth0 && $__error__token__auth0.email
</script>

<div bind:this={root} class="form forgot_password">
	<Close__Dialog__Auth0></Close__Dialog__Auth0>
	<h1>Forgot Password</h1>
	<form
		action="https://{$__AUTH0_DOMAIN}/passwordless/start"
		accept-charset="UTF-8"
		method="post"
		on:submit="{event => __submit__forgot_password(event, { email__forgot_password })}"
	>
		{#if $__error__token__auth0}
			<ul>
				<li class="error {class__error}">
					{$__error__token__auth0.error}: {$__error__token__auth0.error_description}
				</li>
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class="{class__label}">Email</div>
				<input
					bind:this={email__forgot_password}
					placeholder="your@email.com"
					required="required"
					class="form-control {class__input}"
					class:invalid="{error__email}"
					type="email"
					id="email-forgot_password"
					name="email"/>
			</label>
		</fieldset>
		<footer>
			<input
				type="submit"
				value="Reset Password"
				class="button {class__button}"
			/>
			<label
				class="navigation__auth {class__label}"
				on:click="{open__login__auth0}"
			>Have an account? Log in&hellip;</label>
			<label
				class="navigation__auth {class__label}"
				on:click="{open__signup__auth0}"
			>Don't have an account? Signup&hellip;</label>
		</footer>
	</form>
</div>
