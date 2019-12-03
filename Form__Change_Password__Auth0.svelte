<script>
import { createEventDispatcher } from 'svelte'
import Close__Dialog__Auth0 from './Close__Dialog__Auth0.svelte'
import {
	__AUTH0_DOMAIN,
	__error__token__auth0,
} from '@ctx-core/auth0/store'
import { __submit__change_password } from './Auth0.svelte.js'
const dispatch = createEventDispatcher()
export let class__error = ''
export let class__input = ''
export let class__button = ''
export let class__label = ''
let root
let email__forgot_password
let password__change_password
let password_confirmation__change_password
//region error__password
let error__password
$: error__password =
	$__error__token__auth0
	&& $__error__token__auth0.password
//endregion
//region error__password_confirmation
let error__password_confirmation
$: error__password_confirmation =
	$__error__token__auth0
	&& $__error__token__auth0.password_confirmation
//endregion
async function __submit__change_password__() {
	dispatch('submit__start')
	try {
		await __submit__change_password({
			password__change_password,
			password_confirmation__change_password,
		})
		dispatch('success')
	} catch (error) {
		dispatch('error', { error })
		throw error
	} finally {
		dispatch('submit__end')
	}
}
</script>

<div bind:this="{root}" class="form change_password Form__Change_Password__Auth0">
	<Close__Dialog__Auth0></Close__Dialog__Auth0>
	<h1>Change Password</h1>
	<form
		action="https://{$__AUTH0_DOMAIN}/dbconnections/change_password"
		accept-charset="UTF-8"
		method="post"
		on:submit|preventDefault="{__submit__change_password__}"
	>
		{#if $__error__token__auth0}
			<ul>
				{#if error__password}
					<li class="error {class__error}">
						{error__password}
					</li>
				{/if}
				{#if error__password_confirmation}
					<li class="error {class__error}">
						{error__password_confirmation}
					</li>
				{/if}
			</ul>
		{/if}
		<fieldset>
		<label class="field">
			<div class="{class__label}">Password</div>
			<input
				bind:this={password__change_password}
				placeholder="**********"
				required="required"
				class="{class__input}"
				class:invalid="{error__password}"
				id="password-change_password"
				type="password"
				name="password"/>
		</label>
		<label class="field">
			<div class="{class__label}">Confirm Password</div>
			<input
				bind:this={password_confirmation__change_password}
				type="password"
				id="password_confirmation-change_password"
				name="password_confirmation"
				class="{class__input}"
				class:invalid="{error__password_confirmation}"
				required="required"
				placeholder="**********"
			/>
		</label>
		</fieldset>
		<footer>
			<input type="submit" value="Change Password" class="button {class__button}"/>
		</footer>
	</form>
</div>
