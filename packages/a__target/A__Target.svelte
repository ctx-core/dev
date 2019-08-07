<script>
export let href
export let target = null
export let alt = ''
export let title = ''
let target__
$: target__ = target || href.split(':').length > 1 ? '_blank' : '_self'
</script>

<a
	{href}
	class="A__Target {$$props.class||''}"
	target={target__}
	{...$$props}
><slot></slot></a>
