<script lang="ts">
import { onMount } from 'svelte'
import { init_dataLayer } from '@ctx-core/google'
onMount(init_dataLayer)
</script>

<slot></slot>
