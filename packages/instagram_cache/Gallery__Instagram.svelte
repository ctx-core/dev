<script>
	import {
		__pathname__medium,
		prev__pathname__medium, next__pathname__medium,
	} from './store'
	import FA_chevron_left_solid from '@ctx-core/fontawesome/ui/FA-chevron-left-solid.svelte'
	import FA_chevron_right_solid from '@ctx-core/fontawesome/ui/FA-chevron-right-solid.svelte'
	let src__img
	$: src__img = `https://instagram.com${$__pathname__medium}media/?size=l`
</script>

<div class="Gallery__Instagram">
	<div class="prev button" on:click={prev__pathname__medium}>
		<FA_chevron_left_solid></FA_chevron_left_solid>
	</div>
	<div class="media">
		<img src="{src__img}" alt="">
	</div>
	<div class="next button" on:click={next__pathname__medium}>
		<FA_chevron_right_solid></FA_chevron_right_solid>
	</div>
</div>
