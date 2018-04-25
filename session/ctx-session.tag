<ctx-session>
	<a
		class="login-link {
			present:
				ctx.__click__login
				&& !ctx[$ctx('agent__authentication.scope', 0)]
		}"
		onclick="{ctx.__click__login}">login</a>
	<a
		class="signup-link {
			present:
				ctx.__click__signup
				&& !ctx[$ctx('agent__authentication.scope', 0)]
		}"
		onclick="{ctx.__click__signup}">signup</a>
	<a
		class="logout-link {
			present:
				ctx.__click__logout
				&& !ctx[$ctx('agent__authentication.scope', 0)]
		}"
		onclick="{ctx.__click__logout}">logout</a>
	<style type="text/css">
		ctx-session > * {
			display: none;
			cursor: pointer;
		}
		ctx-session > .present {
			display: block;
		}
	</style>
	<script>
		import {init} from 'ctx-core/session/ctx-session.mjs'
		init(this)
	</script>
</ctx-session>