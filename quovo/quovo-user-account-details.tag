<quovo-user-account-details class="{loading: !ctx.account__user__quovo}">
	<x-brokerage-name>
		<label>Brokerage Name</label>
		<x-value>{$ctx('account__user__quovo.brokerage_name')}</x-value>
	</x-brokerage-name>
	<quovo-account-value>
		<label>value</label>
		<x-value>{
			format__currency($ctx('account__user__quovo.value'))
			}</x-value>
	</quovo-account-value>
	<quovo-account-nickname>
		<label>nickname</label>
		<x-value>{$ctx('account__user__quovo.brokerage_name')}</x-value>
	</quovo-account-nickname>
	<quovo-account-opened>
		<label>opened</label>
		<x-value>{$ctx('account__user__quovo.opened')}</x-value>
	</quovo-account-opened>
	<script>
		import {init} from 'ctx-core/quovo/quovo-user-account-details.mjs'
		init(this)
	</script>
</quovo-user-account-details>