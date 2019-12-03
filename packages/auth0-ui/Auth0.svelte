<script>
import {
	__class__opened__auth0,
	__opened__auth0,
	__opened__signup,
	__opened__login,
	__opened__forgot_password,
	__opened__check_email__forgot_password,
	__opened__change_password,
} from '@ctx-core/auth0/store'
import Close__Dialog__Auth0 from './Close__Dialog__Auth0.svelte'
import Form__Login__Auth0 from './Form__Login__Auth0.svelte'
import Form__Signup__Auth0 from './Form__Signup__Auth0.svelte'
import Form__Forgot_Password__Auth0 from './Form__Forgot_Password__Auth0.svelte'
import Form__Check_Email__Forgot_Password__Auth0 from './Form__Check_Email__Forgot_Password__Auth0.svelte'
import Form__Change_Password__Auth0 from './Form__Change_Password__Auth0.svelte'
export let dialog = false
</script>

<div
	class="Auth0 {$__class__opened__auth0} {$$props.class || ''}"
	class:dialog="{dialog}"
	class:visible={!!$__class__opened__auth0}
>
	<Close__Dialog__Auth0></Close__Dialog__Auth0>
	{#if $__opened__login}
		<Form__Login__Auth0 {...$$props}></Form__Login__Auth0>
	{:else if $__opened__signup}
		<Form__Signup__Auth0 {...$$props}>
			<div slot="tos__signup">
				<slot name="tos__signup" slot="tos__signup"></slot>
			</div>
		</Form__Signup__Auth0>
	{:else if $__opened__forgot_password}
		<Form__Forgot_Password__Auth0 {...$$props}></Form__Forgot_Password__Auth0>
	{:else if $__opened__check_email__forgot_password}
		<Form__Check_Email__Forgot_Password__Auth0></Form__Check_Email__Forgot_Password__Auth0>
	{:else if $__opened__change_password}
		<Form__Change_Password__Auth0 {...$$props}></Form__Change_Password__Auth0>
	{/if}
	<slot></slot>
</div>

<style type="text/scss">
:global(.Auth0) {
	display: block;
	overflow: hidden;
	height: 500px;
	padding-top: 1rem;
	&.dialog {
		:global(div) {
			:global(.close) {
				display: block;
			}
		}
	}
	:global(h1) {
		font-size: 2rem;
		text-align: center;
	}
	[name=navigation__auth] {
		display: none;
		~ .form {
			display: none;
		}
		&.navigation__auth-signup:checked {
			~ .signup {
				display: block;
			}
		}
		&.navigation__auth-login:checked {
			~ .login {
				display: block;
			}
		}
		&.navigation__auth-forgot_password:checked {
			~ .forgot_password {
				display: block;
			}
		}
		&.navigation__auth-check_email__forgot_password:checked {
			~ .check_email__forgot_password {
				display: block;
			}
		}
		&.navigation__auth-change_password:checked {
			~ .change_password {
				display: block;
			}
		}
	}
	:global(label.navigation__auth) {
		color: #3EBBC0;
		font-weight: bold;
		&:hover {
			text-decoration: underline;
		}
	}
	> :global(div) {
		position: relative;
		height: 100%;
		> :global(.close) {
			display: none;
			position: absolute;
			right: 0;
		}
	}
	:global(form) {
		:global(input) {
			line-height: 1.8rem;
			border-color: transparent;
			border-bottom: 2px solid lightgrey;
			&.invalid {
				border-color: red;
			}
		}
		:global(label) {
			display: block;
		}
		:global(fieldset) {
			clear: both;
			border: none;
			:global(.field) {
				width: 20em;
				margin: 0 auto;
				display: block;
				clear: both;
				text-align: left;
				:global(input) {
					display: block;
					width: 100%;
					padding: 0.2em;
					color: black;
				}
			}
			:global(p) {
				margin-bottom: 0;
				-webkit-margin-after: 0;
			}
		}
		:global(footer) {
			margin-top: 1rem;
			text-align: center;
			:global(.button) {
				float: none;
				width: 10em;
				padding: 0.4rem;
				color: white;
				background-color: #3EBBC0;
				border-radius: 5px;
				border: none;
				&:hover {
					background-color: #5CC6CA;
				}
			}
			:global(label) {
				margin-top: 1em;
			}
		}
	}
	:global(.error) {
		color: red;
	}
}
</style>
