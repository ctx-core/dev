<script>
import Close__Dialog__Auth0 from './Close__Dialog__Auth0.svelte'
import {
	__AUTH0_DOMAIN,
	__error__token__auth0,
	open__login__auth0,
	open__forgot_password__auth0,
} from '@ctx-core/auth0/store'
import { __submit__signup } from './Auth0.svelte.js'
export let class__error = ''
export let class__input = ''
export let class__button = ''
export let class__label = ''
let root
let email__signup
let password__signup
let password_confirmation__signup
//region error__email
let error__email
$: error__email = $__error__token__auth0 && $__error__token__auth0.email
//endregion
//region error__password
let error__password
$: error__password = $__error__token__auth0 && $__error__token__auth0.password
//endregion
//region error__password_confirmation
let error__password_confirmation
$: error__password_confirmation = $__error__token__auth0 && error__password_confirmation
//endregion
</script>

<div bind:this="{root}" class="form signup">
	<Close__Dialog__Auth0></Close__Dialog__Auth0>
	<h1><slot name="signup_text">Sign Up</slot></h1>
	<form
		action="https://{$__AUTH0_DOMAIN}/dbconnections/signup"
		accept-charset="UTF-8"
		method="post"
		on:submit="{event =>
			__submit__signup(event, {
				root,
				email__signup,
				password__signup,
				password_confirmation__signup
			})
		}"
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
					bind:this="{email__signup}"
					placeholder="your@email.com"
					required="required"
					autocomplete="email"
					class="form-control {class__input}"
					class:invalid="{error__email}"
					type="email"
					id="email-signup"
					name="email"/>
			</label>
			<label class="field">
				<div class="{class__label}">Password</div>
				<input
					bind:this="{password__signup}"
					placeholder="**********"
					required="required"
					class="{class__input}"
					class:invalid="{error__password}"
					id="password-signup"
					type="password"
					name="password"/>
			</label>
			<label class="field">
				<div class="{class__label}">Confirm Password</div>
				<input
					bind:this="{password_confirmation__signup}"
					placeholder="**********"
					required="required"
					class="{class__input}"
					class:invalid="{error__password_confirmation}"
					type="password"
					name="password_confirmation"
					id="password_confirmation-signup"/>
			</label>
			<slot name="tos__signup">
				<p>
					By clicking ‘Sign up’ you agree to the terms of this Website <br>
					<a href="." target="_blank">Terms of Service</a>
					and
					<a href="." target="_blank">Privacy Policy</a>
				</p>
			</slot>
		</fieldset>
		<footer>
			<input
				type="submit"
				value="Sign up"
				class="button {class__button}"
			/>
			<label
				class="navigation__auth {class__label}"
				on:click="{open__login__auth0}"
			>Have an account? Log in&hellip;</label>
			<label
				class="navigation__auth {class__label}"
				on:click="{open__forgot_password__auth0}"
			>Forgot Password?</label>
		</footer>
	</form>
</div>
