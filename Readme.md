# @ctx-core/highlight.js

## Install

`npm i @ctx-core/highlight.js`

## Usage in Sapper

```html
<script>
	import { stores } from '@sapper/app.mjs'
	import { refresh__initHighlighting } from '@ctx-core/highlight.js'
	import hljs from 'highlight.js'
	const { page } = stores()
	$: {
		$page, refresh__initHighlighting(hljs)
	}
</script>
```
