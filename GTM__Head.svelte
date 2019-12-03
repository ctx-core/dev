<script>
import { onMount } from 'svelte'
import { init__dataLayer } from './dom'
onMount(init__dataLayer)
</script>

<slot></slot>
