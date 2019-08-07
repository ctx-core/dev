<script>
import { _date__append__local_tz } from './lib'
import Date from './Date.svelte'
export let date
</script>

<Date date="{_date__append__local_tz(date)}"></Date>
