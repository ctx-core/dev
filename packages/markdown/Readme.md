# @ctx-core/markdown

## Install

`npm i @ctx-core/markdown`

## Svelte Markdown markup preprocessor

```javascript
// rollup.config.js
require = require('esm')(module)
import svelte from 'rollup-plugin-svelte'
import { _preprocess } from '@ctx-core/svelte/preprocess'
import { _preprocess__markdown } from '@ctx-core/markdown/svelte'
const preprocess__markdown = _preprocess__markdown()
const preprocess = _preprocess([
	preprocess__markdown,
	// ...
])
module.exports = {
	client: {
		// ...
		plugins: [
			// ...
			svelte({
				// ...
				extensions: ['.svelte', '.html', '.md'],
				preprocess,
			})
		]
	},
	server: {
		// ...
		plugins: [
			// ...
			svelte({
				// ...
				extensions: ['.svelte', '.html', '.md'],
				preprocess,
			})
		]
	},
	// ...
}
```

Now you can import *.md files as svelte components.

```markdown
<script>
	let name = 'world';
</script>

# Hello {name}!
```
