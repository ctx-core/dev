# @ctx-core/markdown

## install

`npm i @ctx-core/markdown`

## Svelte Markdown markup preprocessor

```javascript
// rollup.config.js
import svelte from 'rollup-plugin-svelte'
import { markup } from '@ctx-core/markdown/svelte'
module.exports = {
	client: {
		// ...
		plugins: [
			// ...
			svelte({
				// ...
				extensions: ['.svelte', '.html', '.md'],
				preprocess: {
					markup,
				}
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
				preprocess: {
					markup,
				}
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