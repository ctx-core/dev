<script lang="ts">
import { date_append_local_tz_ } from '@ctx-core/date'
import { Date } from '../Date/index.js'
export let date:Date
</script>

<Date date="{date_append_local_tz_(date)}"></Date>
